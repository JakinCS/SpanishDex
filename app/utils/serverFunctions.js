"use server";

import { MongoClient } from "mongodb";
import sanitize from 'mongo-sanitize';
import { contrastedColor, randomColor } from "@/app/utils/colorTools";
import { generate } from "generate-password";
import { compare, hash } from 'bcryptjs';


export const connectToDB = async (credentials) => {
  
  // Define the client variable, holding a new MongoClient instance  
  const client = new MongoClient(process.env.MONGODB_URI);

  // Clean the username/email before search for it in the database
  const cleanUsername = sanitize(credentials.username);

  // Connect to the database
  await client.connect();
  const database = client.db('spanishdex');
  const collection = database.collection('users');

  const userSearchResult = await collection.findOne({ $or: [{username: { $regex: `^${cleanUsername}$`, $options: 'i' }}, {email: { $regex: `^${cleanUsername}$`, $options: 'i' }}] } )

  if (!userSearchResult) {
    await client.close();
    return null
  }

  const passwordCorrect = await compare(credentials?.password || "", userSearchResult.password);

  if (passwordCorrect) {
    await client.close();
    return userSearchResult;
  }

  await client.close();
  return null
}