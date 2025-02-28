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
    const deleteResult = await collection.deleteOne({ _id: new ObjectId(userId) })

    // if no updated record:
    if (deleteResult.deletedCount < 1) {
      await client.close();
      return {success: false, message: 'Unable to delete account. Unexpected failure', error: ''}
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