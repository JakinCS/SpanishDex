import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import Google from "next-auth/providers/google"
import { MongoClient } from "mongodb";
import sanitize from 'mongo-sanitize';
import { compare, hash } from 'bcrypt';
import { generate } from "generate-password";
import { generateRandomNumbers, randomColorPair } from './lib/utils';

export const { auth, handlers, signIn, signOut, update } = NextAuth({
  ...authConfig,
  providers: [
    Google,
    Credentials({
      credentials: {
        username: {},
        password: {}
      },
      async authorize(credentials) {

        // Define the client variable, holding a new MongoClient instance  
        const client = new MongoClient(process.env.MONGODB_URI);

        // Clean the username/email before search for it in the database
        const cleanUsername = sanitize(credentials.username);

        // Connect to the database
        await client.connect();
        const database = client.db('spanishdex');
        const collection = database.collection('users');

        const userSearchResult = await collection.findOne({ $or: [{username: cleanUsername}, {email: cleanUsername}] }, {collation: {locale: 'en_US', strength: 2}} )
        
        if (!userSearchResult) {
          await client.close();
          return null
        }
        
        const passwordCorrect = await compare(credentials?.password || "", userSearchResult.password);

        if (!passwordCorrect) {
          await client.close();
          return null
        }

        await client.close();
        return userSearchResult;
      }

    })
  ],
  callbacks: {
    ...authConfig.callbacks,

    async jwt({ token, account, user, trigger, session }) {
      if (trigger === 'update' && session) {
        token = {...token, ...session}
      }
      if (account) {
        // Update the token with information from the user object.
        if (account.provider === 'credentials') {
          token = {...token, id: user._id, username: user.username, image: user.profile_picture, colors: user.profile_colors, date_created: user.date_created}
        } else if (account.provider === 'google') {

          // Go find some more information about this google user from the database

          const client = new MongoClient(process.env.MONGODB_URI);

          let findResult;
          try {
            const database = client.db('spanishdex');
            const collection = database.collection('users');
            findResult = await collection.findOne({email: user.email}, {projection: {email: 1, username: 1, profile_picture: 1, profile_colors: 1, date_created: 1}, collation: {locale: 'en_US', strength: 2}});
            
          } catch (error) {
            findResult.profile_picture = null;
            findResult.username = user.email; // Put the email in as a replacement username
            findResult.profile_colors = [ "#CF7000", "#000000" ]; // Give some generic profile picture color information

          } finally {
            await client.close();
          }

          token = {...token, id: findResult._id, username: findResult.username, image: findResult.profile_picture, colors: findResult.profile_colors, date_created: findResult.date_created}

        }
      }
      return token
    },

    async session({ token, session }) {
      // Update the session with information from the token. (avoids an extra call to the database to retrieve this information later)
      if (session.user) {
        session.user = {...session.user, id: token.id, username: token.username, profile_picture: token.image, profile_colors: token.colors, date_created: token.date_created}
        
      }
      return session;
    },

    // Use the signIn callback to check whether someone is signing in with Google for the first time
    // Then, create a record in the database for the person
    async signIn({ user, account }) { 
      if (account.provider === 'google') {
        
        // Define the client variable, holding a new MongoClient instance  
        const client = new MongoClient(process.env.MONGODB_URI);

        try {
          // Connect to the database
          await client.connect();
          const database = client.db('spanishdex');
          const collection = database.collection('users');

          const findResult = await collection.findOne({ email: user.email }, {projection: {email: 1}, collation: {locale: 'en_US', strength: 2}});

          // If the user can't be found in the database, create a new user in the database
          if (!findResult) {
            const username = user.name.replaceAll(' ', '') + generateRandomNumbers(3); // generate a username for them.

            const password = generate({ length: 16, numbers: true }); // generate a random password for them
            const hashedPassword = await hash(password, 10);

            // Add the user to the database.
            const addUser = await collection.insertOne({ 
              username: username, 
              email: user.email, 
              password: hashedPassword, 
              date_created: new Date(),
              profile_picture: null, 
              profile_colors: randomColorPair()
            })

            await client.close()

          }
        } catch (error) {
          // If something fails, return false, which will reject their log in attempt.
          // This forces them to try again. (As it is important to have a user record in the database)
          await client.close();
          return false
        }        
      }

      return true;
    }

  }

})

