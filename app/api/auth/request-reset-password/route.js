import { NextResponse } from "next/server";
import crypto from "crypto";
import sanitize from 'mongo-sanitize';
import { MongoClient } from "mongodb";
import sgMail from '@sendgrid/mail';
import email_template from './emailtemplate';


export async function POST(request) {

  // Define the client variable, holding a new MongoClient instance  
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    const { email } = await request.json();

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
      await client.close();
      return NextResponse.json({ success: true }, { status: 200 })
    }

    // Create the reset token and the expiration date
    const resetToken = crypto.randomBytes(20).toString('hex');
    const databaseResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    const tokenExpirationDate = Date.now() + 3600000; // Expire the token in 1 hour.

    // Add the reset token and expiration date information to the database
    const updateResult = await collection.updateOne({email: lowercaseEmail}, { $set: {reset_token: databaseResetToken, reset_token_expiry: tokenExpirationDate}})

    // create a URL for the user to use to reset their password
    const resetURL = `${process.env.APP_URL}/reset-password/${resetToken}`

    const emailOptions = {
      to: lowercaseEmail,
      from: 'SpanishDex <spanishdex@gmail.com>',
      subject: 'Reset your SpanishDex password',
      html: email_template(resetURL)
    }

    sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');
    
    try {
      // Send the email using the transport with the options.
      const sendResponse = await sgMail.send(emailOptions)

    } catch(error) {
      // Remove the reset token and expiry if the email fails to send
      const removeResult = await collection.updateOne({email: lowercaseEmail}, { $set: {reset_token: null, reset_token_expiry: null}})
    }
    
    await client.close();
    return NextResponse.json({ success: true }, { status: 200 })

  } catch (error) {
    await client.close();
    return NextResponse.json({ error: error }, { status: 500 })
  }
}