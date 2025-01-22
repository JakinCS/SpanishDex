// import { handlers } from "@/auth";
// export const { GET, POST } = handlers;


import NextAuth from "next-auth"
import { options } from "./options"

const handler = NextAuth(options)

export { handler as GET, handler as POST }


// import NextAuth from "next-auth"
// import Credentials from 'next-auth/providers/credentials';
// import GoogleProvider from "next-auth/providers/google"
// import { compare } from 'bcrypt';
// import sanitize from 'mongo-sanitize';
// import { MongoClient } from "mongodb";

// const handler = NextAuth({
//   session: {
//     strategy: 'jwt',
//   },
//   providers: [
//     GoogleProvider({
//       clientId: process.env.AUTH_GOOGLE_ID,
//       clientSecret: process.env.AUTH_GOOGLE_SECRET
//     }),
//     Credentials({
//       credentials: {
//         username: {},
//         password: {}
//       },
//       async authorize(credentials, req) {
//         // Define the client variable, holding a new MongoClient instance  
//         const client = new MongoClient(process.env.MONGODB_URI);

//         // Clean the username before search for it in the database
//         const cleanUsername = sanitize(credentials.username);

//         // Connect to the database
//         await client.connect();
//         const database = client.db('spanishdex');
//         const collection = database.collection('users');

//         const userSearchResult = await collection.findOne({ $or: [{username: { $regex: `^${cleanUsername}$`, $options: 'i' }}, {email: { $regex: `^${cleanUsername}$`, $options: 'i' }}] } )

//         if (!userSearchResult) {
//           await client.close();
//           return null
//         }
        
//         const passwordCorrect = await compare(credentials?.password || "", userSearchResult.password);

//         if (passwordCorrect) {
//           await client.close();
//           return { name: userSearchResult.username }
//         }

//         await client.close();
//         return null
//       }
//     })
//   ]
// })

// export { handler as GET, handler as POST }


// import NextAuth from "next-auth"
// import CredentialsProvider from 'next-auth/providers/credentials';
// import Google from "next-auth/providers/google"
// import { compare } from 'bcrypt';
// import sanitize from 'mongo-sanitize';
// import { MongoClient } from "mongodb";

// const handler = NextAuth({
//   session: {
//     strategy: 'jwt',
//   },
//   providers: [
//     Google,
//     CredentialsProvider({
//       credentials: {
//         username: {},
//         password: {}
//       },
//       async authorize(credentials, req) {
//         // Define the client variable, holding a new MongoClient instance  
//         const client = new MongoClient(process.env.MONGODB_URI);

//         // Clean the username before search for it in the database
//         const cleanUsername = sanitize(credentials.username);

//         // Connect to the database
//         await client.connect();
//         const database = client.db('spanishdex');
//         const collection = database.collection('users');

//         const userSearchResult = await collection.findOne({ $or: [{username: { $regex: `^${cleanUsername}$`, $options: 'i' }}, {email: { $regex: `^${cleanUsername}$`, $options: 'i' }}] } )

//         if (!userSearchResult) {
//           await client.close();
//           return null
//         }
        
//         const passwordCorrect = await compare(credentials?.password || "", userSearchResult.password);

//         if (passwordCorrect) {
//           await client.close();
//           return { name: userSearchResult.username }
//         }

//         await client.close();
//         return null
//       }
//     })
//   ]
// })

// export { handler as GET, handler as POST }