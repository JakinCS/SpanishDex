import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { hash } from "bcrypt";
import crypto from "crypto";
import sanitize from 'mongo-sanitize';


export async function POST(request) {

  // Define the client variable, holding a new MongoClient instance  
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    const { username, password, token } = await request.json();

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
      return NextResponse.json({error: 'Your reset password link is invalid or it has expired.'}, { status: 400 })
    }


    // Check the password for format problems
    if (password.length < 6 || password.length > 1024) {
      let message = '';
      if (password.length < 6) message = "Password doesn't meet length requirements. Password is too short";
      else message = "Password doesn't meet length requirements. Password is too long";

      await client.close();
      return NextResponse.json({error: message}, { status: 400 })
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
      return NextResponse.json({error: 'Unable to update password. User could not be found in database.'}, { status: 400 })
    }
    
    await client.close();
    return NextResponse.json({ success: true }, { status: 200 })

  } catch (error) {
    await client.close();
    return NextResponse.json({ error: error }, { status: 500 })
  }
}