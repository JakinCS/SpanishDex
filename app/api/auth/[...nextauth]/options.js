import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from 'next-auth/providers/credentials'
import { MongoClient } from "mongodb";
import { compare, hash } from 'bcrypt';
import sanitize from 'mongo-sanitize';
import { contrastedColor, randomColor } from "@/app/utils/colorTools";
import { generate } from "generate-password";


// Random 3 number generator
const generate3RandomNumbers = () => {
  let rand1 = Math.floor(Math.random() * 10);
  let rand2 = Math.floor(Math.random() * 10);
  let rand3 = Math.floor(Math.random() * 10);
  
  return `${rand1}${rand2}${rand3}`;
}

export const options = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username:",
          type: "text",
          placeholder: "your username"
        },
        password: {
          label: "Password:",
          type: "password",
          placeholder: "your password"
        }
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
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, trigger, account, user, session }) {
      if (account) {
        // Update the token with information from the user object.
        if (account.provider === 'credentials') {
          token = {...token, username: user.username, image: user.profile_picture, colors: user.profile_colors}
        } else if (account.provider === 'google') {

          // Go find some more information about this google user from the database

          const client = new MongoClient(process.env.MONGODB_URI);

          let findResult;
          try {
            const database = client.db('spanishdex');
            const collection = database.collection('users');
            findResult = await collection.findOne({email: user.email}, {projection: {_id: 0, email: 1, username: 1, profile_picture: 1, profile_colors: 1}});
            
          } catch (error) {
            findResult.profile_picture = null;
            findResult.username = user.email; // Put the email in as a replacement username
            findResult.profile_colors = [ "#CF7000", "#000000" ]; // Give some generic profile picture color information

          } finally {
            await client.close();
          }

          token = {...token, username: findResult.username, image: findResult.profile_picture, colors: findResult.profile_colors}

        }
      }
      return token
    },

    async session({ token, session }) {
      // Update the session with information from the token. (avoids an extra call to the database to retrieve this information later)
      if (session.user) {
        session.user = {...session.user, username: token.username, profile_picture: token.image, profile_colors: token.colors}
        
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

          const findResult = await collection.findOne({ email: user.email });

          // If the user can't be found in the database, create a new user in the database
          if (!findResult) {
            const username = user.name.replaceAll(' ', '') + generate3RandomNumbers(); // generate a username for them.

            const password = generate({ length: 16, numbers: true }); // generate a random password for them
            const hashedPassword = await hash(password, 10);

            const userColor = randomColor();

            // Add the user to the database.
            const addUser = await collection.insertOne({ 
              username: username, 
              email: user.email, 
              password: hashedPassword, 
              date_created: new Date(),
              profile_picture: null, 
              profile_colors: [userColor, contrastedColor(userColor)]
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
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout'
  }
}