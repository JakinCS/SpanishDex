"use server"

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { hash } from "bcrypt";
import { MongoClient } from "mongodb";
import sanitize from 'mongo-sanitize';
import { isEmailValid, isPasswordValid, isUsernameValid, randomColorPair } from "@/lib/utils";


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
      return {success: false, errorType: 'USERNAME_FORMAT', message: 'Sign up failed. ' + usernameResult.message}
    }

    const emailResult = isEmailValid(email)
    if (!emailResult.valid) {
      await client.close()
      return {success: false, errorType: 'EMAIL_FORMAT', message: 'Sign up failed. ' + emailResult.message}
    }

    const passwordResult = isPasswordValid(password1);
    if (!passwordResult.valid) {
      await client.close()
      return {success: false, errorType: 'PASSWORD_FORMAT', message: 'Sign up failed. ' + passwordResult.message}
    }

    if (password1 !== password2) {
      await client.close()
      return {success: false, errorType: 'PASSWORD_MATCH', message: 'Sign up failed. Passwords do not match. Please enter the same password in both fields'}
    }

    
    // Check whether the username already exists in the database
    const usernameFindResult = await collection.findOne({username: { $regex: `^${username}$`, $options: 'i' }})
    if (usernameFindResult != null) {
      await client.close()
      return {success: false, errorType: 'USERNAME_DUPLICATE', message: 'Sign up failed. This username is already used by another account.'}
    }
    
    // Check whether the email already exists in the database
    if (email !== '') {
      const emailFindResult = await collection.findOne({email: email.toLowerCase()})
      if (emailFindResult != null) {
        await client.close()
        return {success: false, errorType: 'EMAIL_DUPLICATE', message: 'Sign up failed. This email address is already used by another account.'}
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
    return {success: true, data: {userid: result.insertedId.toJSON()}, message: "Sign up successful."}

  } catch (error) {
    console.log("Sign up error: ", error)
    await client.close();
    return {success: false, errorType: 'UNEXPECTED' , message: 'Sign up failed. Please try again. If problem persists, try again later.'}
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
    console.log("log in error", error)
    if (error.toString().includes('NEXT_REDIRECT')) {
      throw(error)
    } 
    else if (error instanceof AuthError && error.type === 'CredentialsSignin') {
      return {success: false, message: "Incorrect username or password. Please try again."}
    }
    return {success: false, message: "Unexpected log in error. Please try again later."}
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