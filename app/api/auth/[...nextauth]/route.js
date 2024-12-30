import NextAuth from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcrypt';
import sanitize from 'mongo-sanitize';
import { MongoClient } from "mongodb";

const handler = NextAuth({
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      credentials: {
        username: {},
        password: {}
      },
      async authorize(credentials, req) {
        console.log({ credentials })

        // Define the client variable, holding a new MongoClient instance  
        const client = new MongoClient(process.env.MONGODB_URI);

        // Clean the username before search for it in the database
        const cleanUsername = sanitize(credentials.username);

        // Connect to the database
        await client.connect();
        const database = client.db('spanishdex');
        const collection = database.collection('users');

        const userSearchResult = await collection.findOne({username: { $regex: `^${cleanUsername}$`, $options: 'i' }})
        const userSearchResult2 = await collection.findOne({email: { $regex: `^${cleanUsername}$`, $options: 'i' }})

        if (!userSearchResult && !userSearchResult2) {
          await client.close();
          return null
        }

        const passwordCorrect = await compare(credentials.password, userSearchResult.password);

        if (passwordCorrect) {
          await client.close();
          return { id: userSearchResult._id, username: userSearchResult.username }
        }

        await client.close();
        return null
      }
    })
  ]
})

export { handler as GET, handler as POST }