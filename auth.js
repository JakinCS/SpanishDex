import NextAuth from "next-auth"
import Credentials from 'next-auth/providers/credentials';
import Google from "next-auth/providers/google"
import { compare } from 'bcrypt';
import sanitize from 'mongo-sanitize';
import { MongoClient } from "mongodb";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: 'jwt',
  },
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {}
      },
      authorize: async (credentials, req) => {
        // Define the client variable, holding a new MongoClient instance  
        const client = new MongoClient(process.env.MONGODB_URI);

        // Clean the username before search for it in the database
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
          return { name: userSearchResult.username }
        }

        await client.close();
        return null
      }
    })
  ]
})