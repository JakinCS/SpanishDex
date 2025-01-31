import { NextResponse } from "next/server";
import sanitize from 'mongo-sanitize';
import sgMail from '@sendgrid/mail';
import message_template from './messagetemplate';


export async function POST(request) {

  try {
    const { name, email, comment } = await request.json();  // Retrieve post data

    const cleanName = sanitize(name);
    const cleanEmail = sanitize(email);
    const cleanMessage = sanitize(comment);

    const emailOptions = {
      to: process.env.CONTACT_EMAIL,
      from: 'SpanishDex <spanishdex@gmail.com>',
      subject: 'New Message From ' + cleanName,
      html: message_template(cleanName, cleanEmail, cleanMessage)
    }

    sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');
    
    try {
      // Send the email using the transport with the options.
      const sendResponse = await sgMail.send(emailOptions)     

    } catch(error) {
      return NextResponse.json({ error: "Error occurred sending the message. Please try again.", serverError: error }, { status: 500 })
    }
    
    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 })

  } catch (error) {
    return NextResponse.json({ error: "Unexpected error occurred. Please try again.", serverError: error }, { status: 500 })
  }
}