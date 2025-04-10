"use server"

import { auth, signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { compare, hash } from "bcrypt";
import { MongoClient, ObjectId } from "mongodb";
import sanitize from 'mongo-sanitize';
import sgMail from '@sendgrid/mail';
import { isEmailValid, isPasswordValid, isUsernameValid, randomColorPair } from "@/lib/utils";
import { contactFormMessage, resetPasswordMessage } from "./messageTemplates";
import crypto from "crypto";
import { del, put } from "@vercel/blob";


// This function handles the logic for creating an account for a user
export const createAccount = async (username, email, password1, password2) => {

  // Define the client variable, holding a new MongoClient instance  
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    // Sanitize the input data as a safety measure
    const cleanUsername = sanitize(username);
    const cleanEmail = sanitize(email);  

    // Connect to the database
    await client.connect();

    const database = client.db('spanishdex');
    const collection = database.collection('users');

    // VALIDATE the input data
    const usernameResult = isUsernameValid(username)
    if (!usernameResult.valid) {
      await client.close()
      return {success: false, errorType: 'USERNAME_FORMAT', message: 'Sign up failed. ' + usernameResult.message, error: ''}
    }

    const emailResult = isEmailValid(email)
    if (!emailResult.valid) {
      await client.close()
      return {success: false, errorType: 'EMAIL_FORMAT', message: 'Sign up failed. ' + emailResult.message, error: ''}
    }

    const passwordResult = isPasswordValid(password1);
    if (!passwordResult.valid) {
      await client.close()
      return {success: false, errorType: 'PASSWORD_FORMAT', message: 'Sign up failed. ' + passwordResult.message, error: ''}
    }

    if (password1 !== password2) {
      await client.close()
      return {success: false, errorType: 'PASSWORD_MATCH', message: 'Sign up failed. Passwords do not match. Please enter the same password in both fields', error: ''}
    }

    
    // Check whether the username already exists in the database
    const usernameFindResult = await collection.findOne({username: { $regex: `^${username}$`, $options: 'i' }})
    if (usernameFindResult != null) {
      await client.close()
      return {success: false, errorType: 'USERNAME_DUPLICATE', message: 'Sign up failed. This username is already used by another account.', error: ''}
    }
    
    // Check whether the email already exists in the database
    if (email !== '') {
      const emailFindResult = await collection.findOne({email: email.toLowerCase()})
      if (emailFindResult != null) {
        await client.close()
        return {success: false, errorType: 'EMAIL_DUPLICATE', message: 'Sign up failed. This email address is already used by another account.', error: ''}
      }  
    } 


    // Convert the email to lower case
    const lowercaseEmail = cleanEmail.toLowerCase();
    
    // Hash the password
    const hashedPassword = await hash(password1, 10);

    // Insert the user into the database
    const result = await collection.insertOne({
      username: cleanUsername, 
      email: lowercaseEmail, 
      password: hashedPassword, 
      date_created: new Date(), 
      profile_picture: null, 
      profile_colors: randomColorPair()
    })

    await client.close();
    return {success: true, data: {userid: result.insertedId.toJSON()}, message: "Sign up successful.", error: ''}

  } catch (error) {
    await client.close();
    return {success: false, errorType: 'UNEXPECTED', message: 'Sign up failed. Please try again. If problem persists, try again later.', error}
  }
}

// This function handles the logic for deleting an account for a user
export const deleteAccount = async (userId, password) => {
  // Check for the user being logged in.
  const session = await auth();
  if (!session?.user) return {success: false, message: "You are not logged in. Please log in to delete your account.", error: ''}

  // Check to make sure the user is authorized to perform the account deletion.
  if (session.user.id !== userId) return {success: false, message: "You cannot delete this user's account. You are logged in with a different account.", error: ''}

  const cleanPassword = sanitize(password);

  // Define the client variable, holding a new MongoClient instance
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    // Connect to the database
    await client.connect();
    const database = client.db('spanishdex');
    const collection = database.collection('users');

    const user = await collection.findOne({ _id: new ObjectId(userId) })

    // if there is no record, then the user doesn't exist.
    if (!user) {
      await client.close();
      return {success: false, message: 'Unable to delete account. User could not be found in database.', error: ''}
    }

    const passwordCorrect = await compare(cleanPassword, user.password);

    if (!passwordCorrect) {
      await client.close();
      return {success: false, message: 'You entered your password incorrectly. Please try again.', error: ''}
    }

    // Delete the user with the userId that was passed in.
    const deleteResult = await deleteAllUserInfo(client, userId)

    // if no updated record:
    if (!deleteResult.success) {
      await client.close();
      return {success: false, message: deleteResult.message, error: deleteResult.error}
    }

    await client.close();
    await signOut({redirectTo: '/'})
    return {success: true, message: "Account deleted successfully", error: ''}

  } catch (error) {
    if (error.toString().includes('NEXT_REDIRECT')) {
      throw(error)
    } 

    await client.close();
    return {success: false, message: 'Account deletion failed. Unexpected error occurred. Please try again later', error}
  }
}

// This helper function handles the logic for deleting all user information from the database
const deleteAllUserInfo = async (client, userId) => {
  const transactionOptions = { 
    readPreference: 'primary',
    readConcern: { level: 'local' },
    writeConcern: { w: 'majority' }
  }

  const session = client.startSession();

  try {

    session.startTransaction(transactionOptions)
    
    // Delete the decks with the user of the userId that was passed in.
    const deckCollection = client.db('spanishdex').collection('decks');
    const deleteDecks = await deckCollection.deleteMany({ user: new ObjectId(userId) }, { session })

    // if no deleted record:
    if (!deleteDecks) {
      await session.abortTransaction();
      await session.endSession();
      return {success: false, message: 'Unable to delete user account. Unexpected failure deleting decks.', error: "Error deleting the user's decks."}
    }

    // Now delete all cards associated with this user account.
    const cardsCollection = client.db('spanishdex').collection('cards');
    const deleteCards = await cardsCollection.deleteMany({ user: new ObjectId(userId) }, { session })

    if (!deleteCards) { // Ensure the deletion was successful
      await session.abortTransaction();
      await session.endSession();
      return {success: false, message: 'Unable to delete user account. Unexpected failure deleting decks.', error: "Error deleting the user's cards"}
    }

    // Finally, delete the user account info itself.
    const usersCollection = client.db('spanishdex').collection('users');
    const deleteUser = await usersCollection.deleteOne({ _id: new ObjectId(userId) })

    // if no updated record:
    if (deleteUser.deletedCount < 1) {
      await session.abortTransaction();
      await session.endSession();
      return {success: false, message: 'Unable to delete account. Unexpected failure deleting account information.', error: 'No account deleted. Account could not be found.'}
    }

    // End the transaction
    await session.commitTransaction();
    await session.endSession();

    return {success: true, message: 'User account deletion successful.', error: ''}


  } catch (error) {
    
    await session.abortTransaction();
    await session.endSession();

    return {success: false, message: 'User account deletion failed. Unexpected error occurred. Please try again.', error: error.toString()}

  }
}

// This function handles the logic for deleting a deck for a user
export const deleteDeck = async (deckId) => {

  // Helper function for deleting the deck and the cards associated with it.
  const deleteInfo = async (client, deckId) => {
    const transactionOptions = { 
      readPreference: 'primary',
      readConcern: { level: 'local' },
      writeConcern: { w: 'majority' }
    }

    const session = client.startSession();

    try {

      session.startTransaction(transactionOptions)
      
      // Delete the deck with the deckId that was passed in.
      const deckCollection = client.db('spanishdex').collection('decks');
      const deleteResult = await deckCollection.deleteOne({ _id: new ObjectId(deckId) }, { session })

      // if no deleted record:
      if (deleteResult.deletedCount < 1) {
        await session.abortTransaction();
        await session.endSession();
        return {success: false, message: 'Unable to delete deck. Deck could not be found.', error: 'No deck deleted. Deck could not be found.'}
      }

      // Now delete all cards associated with this deck.
      const cardsCollection = client.db('spanishdex').collection('cards');
      const deleteCards = await cardsCollection.deleteMany({ parent_deck: new ObjectId(deckId) }, { session })

      if (!deleteCards) { // Ensure the deletion was successful
        await session.abortTransaction();
        await session.endSession();
        return {success: false, message: 'Unable to delete deck. Unexpected failure.', error: 'Error deleting the cards of the deck'}
      }

      // End the transaction
      await session.commitTransaction();
      await session.endSession();

      return {success: true, message: 'Deck deletion successful.', error: ''}


    } catch (error) {
      
      await session.abortTransaction();
      await session.endSession();

      return {success: false, message: 'Deck deletion failed. Unexpected error occurred. Please try again.', error: error.toString()}

    }
  }

  // Check for the user being logged in.
  const session = await auth();
  if (!session?.user) return {success: false, message: "You are not logged in. Please log in to delete the deck.", error: ''}

  // Define the client variable, holding a new MongoClient instance
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    // Connect to the database
    await client.connect();
    const database = client.db('spanishdex');
    const deckCollection = database.collection('decks');

    const findDeck = await deckCollection.findOne({ _id: new ObjectId(deckId) })

    // if no record, then the deck doesn't exist or is inaccessible
    if (!findDeck) {
      await client.close();
      return {success: false, message: 'Unable to delete deck. Deck could not be found.', error: ''}
    }
    // if the deck doesn't belong to the logged in user, then they cannot delete it.
    if (findDeck.user.toString() !== session.user.id) {
      await client.close();
      return {success: false, message: "You cannot delete this user's deck. You are logged in with a different account.", error: ''}
    }

    // Run helper function to delete the deck and the associated cards.
    const deletionResult = await deleteInfo(client, deckId)

    // If there was an error with the deletion of the deck, return that error.
    if (!deletionResult.success) {
      await client.close();
      return {success: false, message: deletionResult.message, error: deletionResult.error}
    }

    // Return that the deck was successfully deleted.
    await client.close();
    return {success: true, message: "Deck deleted successfully", error: ''}

  } catch (error) {
    await client.close();
    return {success: false, message: 'Deck deletion failed. Unexpected error occurred. Please try again later', error}
  }
}

// This function updates the email of a user in the database.
export const editEmail = async (userId, email) => {
  // Check for the user being logged in.
  const session = await auth();
  if (!session?.user) return {success: false, message: "You are not logged in. Please log in to edit your email.", error: ''}

  // Check to make sure the user is authorized to perform the email edit.
  if (session.user.id !== userId) return {success: false, message: "You cannot edit this user's account. You are logged in with a different account.", error: ''}

  // Sanitize the email first
  const cleanEmail = sanitize(email);

  // Verify that the email is valid
  const emailValidity = isEmailValid(cleanEmail);
  if (!emailValidity.valid) return {success: false, message: emailValidity.message, error: ''}

  // If the email is the same, then just return true.
  if (cleanEmail.toLowerCase() === session.user.email.toLowerCase()) return {success: true, message: "Email updated successfully", error: ''}

  // Define the client variable, holding a new MongoClient instance
  const client = new MongoClient(process.env.MONGODB_URI);
  
  try {
    // Connect to the database
    await client.connect();
    const database = client.db('spanishdex');
    const collection = database.collection('users');

    // Check whether the email already exists in the database
    const emailFindResult = await collection.findOne({email: { $regex: `^${cleanEmail}$`, $options: 'i' }})

    if (emailFindResult != null && cleanEmail !== '' && cleanEmail.toLowerCase() !== session.user.email.toLowerCase()) {
      await client.close()
      return {success: false, message: 'This email address is already used by another account.', error: ''}
    }

    // Update the username of the user with the userId that was passed in.
    const updateResult = await collection.updateOne(
      { _id: new ObjectId(userId) },
      { $set: {email: cleanEmail.toLowerCase()} }
    )

    // if no updated record:
    if (updateResult.modifiedCount < 1) {
      await client.close();
      return {success: false, message: 'Unable to update email. User could not be found in database.', error: ''}
    }

    await client.close();
    return {success: true, message: "Email updated successfully", error: ''}

  } catch (error) {
    await client.close();
    return {success: false, message: 'Email update failed. Unexpected error occurred. Please try again later', error}
  }
}

// This function updates the password of a user in the database.
export const editPassword = async (userId, currentPassword, password1, password2) => {
  // Check for the user being logged in.
  const session = await auth();
  if (!session?.user) return {success: false, message: "You are not logged in. Please log in to edit your password.", error: ''}

  // Check to make sure the user is authorized to perform the password edit.
  if (session.user.id !== userId) return {success: false, message: "You cannot edit this user's account. You are logged in with a different account.", error: ''}

  const cleanCurrentPassword = sanitize(currentPassword);
  const cleanPassword1 = sanitize(password1);
  const cleanPassword2 = sanitize(password2);

  // Check the password for format problems
  const passwordValidity = isPasswordValid(cleanPassword1);
  if (!passwordValidity.valid) {
    return {success: false, message: passwordValidity.message, error: ''}
  }

  // Check whether the two passwords match
  if (cleanPassword1 !== cleanPassword2) {
    return {success: false, message: "Passwords do not match. Please enter the same password in both fields.", error: ''}
  }

  // Define the client variable, holding a new MongoClient instance
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    // Connect to the database
    await client.connect();
    const database = client.db('spanishdex');
    const collection = database.collection('users');

    const user = await collection.findOne({ _id: new ObjectId(userId) })

    // if no updated record:
    if (!user) {
      await client.close();
      return {success: false, message: 'Unable to update password. User could not be found in database.', error: ''}
    }

    const passwordCorrect = await compare(cleanCurrentPassword, user.password);

    if (!passwordCorrect) {
      await client.close();
      return {success: false, message: 'You entered your current password incorrectly. Please try again.', error: ''}
    }

    // Hash the password
    const hashedPassword = await hash(cleanPassword1, 10);

    // Update the password of the user with the userId that was passed in.
    const updateResult = await collection.updateOne(
      { _id: new ObjectId(userId) },
      { $set: {password: hashedPassword} }
    )

    await client.close();
    return {success: true, message: "Password updated successfully", error: ''}

  } catch (error) {
    await client.close();
    return {success: false, message: 'Password change failed. Unexpected error occurred. Please try again later', error}
  }
}

// This function updates the username of a user in the database.
export const editUsername = async (userId, username) => {
  // Check for the user being logged in.
  const session = await auth();
  if (!session?.user) return {success: false, message: "You are not logged in. Please log in to edit your username.", error: ''}

  // Check to make sure the user is authorized to perform the username edit.
  if (session.user.id !== userId) return {success: false, message: "You cannot edit this user's account. You are logged in with a different account.", error: ''}

  // Sanitize the username first
  const cleanUsername = sanitize(username);

  // Verify that the username is valid
  const usernameValidity = isUsernameValid(cleanUsername);
  if (!usernameValidity.valid) return {success: false, message: usernameValidity.message, error: ''}

  // Define the client variable, holding a new MongoClient instance
  const client = new MongoClient(process.env.MONGODB_URI);
  try {
    // Connect to the database
    await client.connect();
    const database = client.db('spanishdex');
    const collection = database.collection('users');

    // Check whether the username already exists in the database
    const usernameFindResult = await collection.findOne({username: { $regex: `^${cleanUsername}$`, $options: 'i' }})
    if (usernameFindResult != null && cleanUsername.toLowerCase() !== session.user.username.toLowerCase()) {
      await client.close()
      return {success: false, message: 'This username is already used by another account.', error: ''}
    }

    // Update the username of the user with the userId that was passed in.
    const updateResult = await collection.updateOne(
      { _id: new ObjectId(userId) },
      { $set: {username: cleanUsername} }
    )

    // if no updated record:
    if (updateResult.modifiedCount < 1) {
      await client.close();
      return {success: false, message: 'Unable to update username. User could not be found in database.', error: ''}
    }

    await client.close();
    return {success: true, message: "Username updated successfully", error: ''}

  } catch (error) {
    await client.close();
    return {success: false, message: 'Username update failed. Unexpected error occurred. Please try again later', error}
  }
}

//
export const getDashboardDeckInfo = async () => {
  let finalData = {decks: [], total_decks: 0, total_cards: 0, total_weakCards: 0}; // This object will hold the final data to be returned
  
  // Check for the user being logged in.
  const session = await auth();
  if (!session?.user) return {success: false, message: "You are not logged in. Please log in to view the dashboard.", error: ''};

  // Define the client variable, holding a new MongoClient instance  
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    // Connect to the database
    await client.connect();
    const database = client.db('spanishdex');
    const deckCollection = database.collection('decks');

    // Fancy aggregation pipeline for retrieving exactly the right information 
    const pipeline = [
      {
        '$match': {
          'user': new ObjectId(session.user.id)
        }
      }, {
        '$lookup': {
          'from': 'cards', 
          'localField': '_id', 
          'foreignField': 'parent_deck', 
          'as': 'cards'
        }
      }, {
        '$addFields': {
          'last_practiced': {
            '$ifNull': [
              {
                '$max': '$cards.last_practiced'
              }, '$date_created'
            ]
          }, 
          'weak_cards': {
            '$size': {
              '$filter': {
                'input': '$cards', 
                'as': 'card', 
                'cond': {
                  '$lte': [
                    '$$card.next_practice_date', new Date()
                  ]
                }
              }
            }
          }
        }
      }, {
        '$project': {
          'title': 1, 
          'date_created': 1, 
          'last_practiced': 1, 
          'cards': {
            '$size': '$cards'
          }, 
          'weak_cards': 1
        }
      }, {
        '$sort': {
          'last_practiced': -1
        }
      }
    ]

    // Run the aggregation pipeline and store the results in the finalData object.
    const decksCursor = await deckCollection.aggregate(pipeline);
    finalData.decks = await decksCursor.toArray();

    finalData.total_decks = finalData.decks.length; // Calculate total deck number

    // Calculate the number of cards and weak cards.
    // Also, convert the _id to a string (instead of its default object type)
    finalData.decks.forEach((deck) => {
      finalData.total_cards += deck.cards;
      finalData.total_weakCards += deck.weak_cards;

      deck._id = deck._id.toString();
    })

    await client.close();
    return {success: true, message: "Successfully retrieved dashboard deck information.", data: finalData, error: ''};

  } catch (error) {
    await client.close();
    return {success: false, message: "Unexpected error occurred while loading the dashboard. Please try again.", error};
  }
}

// This function retrieves deck information (and deck cards) based on the passed in deckId.  
export const getDeck = async (deckId) => {
  
  // Check for the user being logged in.
  const session = await auth();
  if (!session?.user) return {success: false, message: "You are not logged in. Please log in to view this deck page.", error: ''};

  // Define the client variable, holding a new MongoClient instance  
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    // Connect to the database
    await client.connect();
    const database = client.db('spanishdex');
    const deckCollection = database.collection('decks');

    const findDeck = await deckCollection.findOne({ _id: new ObjectId(deckId) })

    // If no record, then indicate that the deck doesn't exist.
    if (!findDeck) {
      await client.close();
      return {success: false, message: "Unable to load page. Deck could not be found.", deck: null, error: ''};
    }

    // Make sure the logged in user is the owner of the deck before continuing.
    if (findDeck.user.toString() !== session.user.id) {
      await client.close();
      return {success: false, message: "Unauthorized. You are not logged in with the right account to view this deck page.", error: ''};
    }

    // Fancy aggregation pipeline for retrieving the deck information with a list of cards 
    const pipeline = [
      {
        '$match': {
          '_id': new ObjectId(deckId)
        }
      }, {
        '$lookup': {
          'from': 'cards', 
          'localField': '_id', 
          'foreignField': 'parent_deck', 
          'as': 'cards'
        }
      }, {
        '$addFields': {
          'last_practiced': {
            '$ifNull': [
              {
                '$max': '$cards.last_practiced'
              }, '$date_created'
            ]
          }, 
          'weak_cards': {
            '$size': {
              '$filter': {
                'input': '$cards', 
                'as': 'card', 
                'cond': {
                  '$lte': [
                    '$$card.next_practice_date', new Date()
                  ]
                }
              }
            }
          }
        }
      }, {
        '$project': {
          'title': 1, 
          'date_created': 1, 
          'last_practiced': 1, 
          'description': 1,
          'cards': {
            'english': 1, 
            'spanish': 1, 
            'next_practice_date': 1
          }, 
          'weak_cards': 1
        }
      }
    ]

    // Run the aggregation pipeline and store the results in the finalData object.
    const decksCursor = await deckCollection.aggregate(pipeline);
    const deckResult = (await decksCursor.toArray())[0]

    await client.close();
    return {success: true, message: "Successfully retrieved deck.", deck: deckResult, error: ''};

  } catch (error) {
    await client.close();
    return {success: false, message: "Unexpected error occurred while retrieving deck information. Please try again.", error};
  }
}

// This function handles the logging in process using the credentials provider
export const logInWithCredentials = async (username, password, otherOptions = {redirect: false}) => {
  try {
    const res = await signIn("credentials", { 
      username,
      password,
      ...otherOptions
    })

    return {success: true, message: "Log in successful"};
    
  } catch (error) {
    if (error.toString().includes('NEXT_REDIRECT')) {
      throw(error)
    } 
    else if (error instanceof AuthError && error.type === 'CredentialsSignin') {
      return {success: false, message: "Incorrect username or password. Please try again.", error}
    }
    return {success: false, message: "Unexpected log in error. Please try again later.", error}
  }
}

// This function handles the logging in process using the google provider
export const logInWithGoogle = async (options = {redirect: true, redirectTo: "/dashboard"}) => {
  const res = await signIn("google", options);
}

// This function handles the logic for loggin out
export const logOut = async (redirectURL = '/') => {
  await signOut({redirectTo: redirectURL})
}

// Resets the user's password. (must have a valid reset password token)
export const resetPassword = async (username, password, token) => {
  // Define the client variable, holding a new MongoClient instance  
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    const cleanUsername = sanitize(username);  

    // Connect to the database
    await client.connect();
    const database = client.db('spanishdex');
    const collection = database.collection('users');

    // double check that the reset token is still valid
    const hashedToken = crypto.createHash("sha256").update(token).digest('hex');
    const user = await collection.findOne({username: { $regex: `^${cleanUsername}$`, $options: 'i' }, reset_token: hashedToken, reset_token_expiry: {$gt: Date.now()}})
    if (!user) {
      await client.close();
      return {success: false, message: 'Your reset password link is invalid or it has expired.'}
    }


    // Check the password for format problems
    const passwordValidity = isPasswordValid(password);
    if (!passwordValidity.valid) {
      await client.close()
      return {success: false, message: passwordValidity.message}
    }

    // Hash the password
    const hashedPassword = await hash(password, 10);

    // Update the password of the user with the username that was passed in.
    const updateResult = await collection.updateOne(
      { username: { $regex: `^${cleanUsername}$`, $options: 'i' } }, 
      { $set: {password: hashedPassword, reset_token: undefined, reset_token_expiry: undefined} }
    )

    // if no updated record:
    if (updateResult.modifiedCount < 1) {
      await client.close();
      return {success: false, message: 'Unable to update password. User could not be found in database.'}
    }
    
    await client.close();
    return { success: true, message: "Password reset successfully" }

  } catch (error) {
    await client.close();
    return { success: false, message: 'Password reset failed. Unexpected error occurred. Please try again later', error: error.toString() }
  }
}

// Sends a message with information from the contact form
export const sendContactFormMessage = async (name, email, comment) => {
  try {
    const cleanName = sanitize(name);
    const cleanEmail = sanitize(email);
    const cleanMessage = sanitize(comment);

    const emailOptions = {
      to: process.env.CONTACT_EMAIL,
      from: 'SpanishDex <spanishdex@gmail.com>',
      subject: 'New Message From ' + cleanName,
      html: contactFormMessage(cleanName, cleanEmail, cleanMessage)
    }

    sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');
    
    try {
      // Send the email using the transport with the options.
      const sendResponse = await sgMail.send(emailOptions)     

    } catch(error) {
      return {success: false, message: "Error occurred sending the message. Please try again.", error: error.toString()}
    }
    
    return {success: true, message: "Email sent successfully"}

  } catch (error) {
    return {success: false, message: "Unexpected error occurred. Please try again.", error: error.toString()}
  }
}

// Sends a message to the user's email with a reset password link
export const sendResetPasswordMessage = async (prevState, fieldValues) => {
  const email = fieldValues.get("email")

  // Define the client variable, holding a new MongoClient instance  
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    const cleanEmail = sanitize(email);  

    // Connect to the database
    await client.connect();

    const database = client.db('spanishdex');
    const collection = database.collection('users');
    
    // Convert the email to lower case
    const lowercaseEmail = cleanEmail.toLowerCase();

    // Check for a user that has that email
    let searchResult = await collection.findOne({email: lowercaseEmail});

    // Return early if no user exists with that email.
    // Return success so that the user doesn't know if the email exists in the database.
    if (!searchResult) {
      // Delay the response a little.
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve()
        }, 500);
      })

      await client.close();
      return { status: "SUCCESS", error: '', hiddenError: '' }
    }

    // Create the reset token and the expiration date
    const resetToken = crypto.randomBytes(20).toString('hex');
    const databaseResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    const tokenExpirationDate = Date.now() + 3600000; // Token will expire in an hour.

    // Add the reset token and expiration date information to the database
    const updateResult = await collection.updateOne({email: lowercaseEmail}, { $set: {reset_token: databaseResetToken, reset_token_expiry: tokenExpirationDate}})

    // create a URL for the user to use to reset their password
    const resetURL = `${process.env.APP_URL || process.env.VERCEL_URL}/reset-password/${resetToken}`

    const emailOptions = {
      to: lowercaseEmail,
      from: 'SpanishDex <spanishdex@gmail.com>',
      subject: 'Reset your SpanishDex password',
      html: resetPasswordMessage(resetURL)
    }

    sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');
    
    try {
      // Send the email using the transport with the options.
      const sendResponse = await sgMail.send(emailOptions)

    } catch(error) {
      // Remove the reset token and expiry if the email fails to send
      const removeResult = await collection.updateOne({email: lowercaseEmail}, { $set: {reset_token: undefined, reset_token_expiry: undefined}})

      await client.close();
      return {status: "ERROR", error: "Email failed to send. Please try again", hiddenError: error.toString()}
    }
    
    await client.close();
    return { status: "SUCCESS", error: '', hiddenError: '' }

  } catch (error) {
    await client.close();
    return {status: "ERROR", error: "Unexpected error occurred. Please try again", hiddenError: error.toString() }
  }
}

// THis function takes care of the logic of uploading an image to vercel's blob store.
export const uploadImage = async (userId, image, oldImage) => {
  // ensure the user is logged in first
  const session = await auth();
  if (!session?.user) return {success: false, message: "You are not logged in. Please log in to edit your profile picture.", error: ''}

  // ensure the user is logged in as an authorized user
  if (session.user.id !== userId) return {success: false, message: "You cannot edit this user's profile picture. You are logged in with a different account.", error: ''}

  // Define the client variable, holding a new MongoClient instance  
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    // Connect to the database
    await client.connect();
    const database = client.db('spanishdex');
    const collection = database.collection('users');

    let newPicValue = null; // The value that will be put into the database and returned from this function.

    if (image.value !== null) {
      // Convert the image value (which is in data URL format) to a blob
      const blobResult = await ( await fetch(image.value) ).blob();

      // Upload the blob to Vercel's blob storage
      const blob = await put(image.name, blobResult, { access: 'public' });

      // Set the newPicValue to the url returned from the put action
      newPicValue = blob.url;
    }

    // Update the profile picture information of the user in the database
    const updateResult = await collection.updateOne(
      { _id: new ObjectId(userId) },
      { $set: {profile_picture: newPicValue} }
    )

    // Send an error if there wasn't any account updated (thus, the account doesn't exist)
    if (updateResult.modifiedCount < 1) {
      await client.close();
      return {success: false, message: 'Unable to update profile picture. User could not be found in database.', error: ''}
    }

    // Delete the user's old image if necessary
    if (oldImage !== null) {
      await del(oldImage);
    }

    await client.close();    
    return {success: true, message: "Image uploaded successfully", data: newPicValue, error: ''}

    
  } catch (error) {
    await client.close();
    return {success: false, message: "Unexpected error occurred updating your profile picture information. Please try again.", error}
  }

}