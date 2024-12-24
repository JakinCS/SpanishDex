import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { MongoClient } from "mongodb";
import sanitize from 'mongo-sanitize';


// Variable for holding the error message
let errorMessage = 'Sign up failed. Please try again. If problem persists, try again later.'

// Function for validating the input data
const validateInputs = async ({username, email, password, password2}, db_collection) => {
  // Validate the username for format problems
  if (username.length < 2 || username.length > 25 || !/^\w+$/.test(username)) return {valid: false, status: 400, message: 'The username is invalid. Please enter a valid username'};

  // Validate the email for format problems
  let regexExpression = /^([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@([0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?(\.[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?)*|\[((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|IPv6:((((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){6}|::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){5}|[0-9A-Fa-f]{0,4}::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){4}|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):)?(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){3}|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,2}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){2}|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,3}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,4}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::)((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3})|(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3})|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,5}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3})|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,6}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::)|(?!IPv6:)[0-9A-Za-z-]*[0-9A-Za-z]:[!-Z^-~]+)])$/
  if (email.length != 0 && !regexExpression.test(email)) return {valid: false, status: 400, message: 'The email is invalid. Please enter a valid email address'};

  // Validate the password(s) for format problems
  if (password.length < 6 || password.length > 1024) return {valid: false, status: 400, message: "Password doesn't meet length requirements. Password is either too long or too short"};

  // Validate that the passwords are equal
  if (password !== password2) return {valid: false, status: 400, message: 'The two passwords do not match. Please enter the same password in both fields'};

  // Check whether the username already exists in the database
  const usernameFindResult = await db_collection.findOne({username: { $regex: `^${username}$`, $options: 'i' }})
  if (usernameFindResult != null) {
    return {valid: false, status: 409, message: 'An account already exists with that username. Please choose a different username'}
  }
  
  // Check whether the email already exists in the database
  const emailFindResult = await db_collection.findOne({email: email.toLowerCase()})
  if (emailFindResult != null) {
    return {valid: false, status: 409, message: 'An account already exists with that email address. Please choose a different email address'}
  }    

  // All is good at this point in the code. Return that the input data is valid.
  return {valid: true, message: 'All clear'}

}

export async function POST(request) {
  // Define the client variable, holding a new MongoClient instance  
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    const {username, email, password, password2} = await request.json();
    console.log({username, email, password, password2})

    // Sanitize the input data as a safety measure
    const cleanUsername = sanitize(username);
    const cleanEmail = sanitize(email);  

    // Connect to the database
    await client.connect();

    const database = client.db('spanishdex');
    const collection = database.collection('users');

    // Validate the input data
    let validationResult = await validateInputs({username: cleanUsername + '#', email: cleanEmail, password, password2}, collection);
    if (!validationResult.valid) {
      errorMessage = 'Sign up failed. ' + validationResult.message;
      await client.close();
      return NextResponse.json({ error: errorMessage }, { status: validationResult.status });
    }
    
    // Convert the email to lower case
    const lowercaseEmail = cleanEmail.toLowerCase();
    
    // Hash the password
    const hashedPassword = await hash(password, 10);

    // Insert the user into the database
    const result = await collection.insertOne({username: cleanUsername, email: lowercaseEmail, password: hashedPassword, date_created: new Date()})

    console.log(result)

    await client.close();
    return NextResponse.json({ userid: result.insertedId, message: 'Sign up successful' }, {status: 201})

  } catch (error) {
    console.log(error)
    await client.close();
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
  
}