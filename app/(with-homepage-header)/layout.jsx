import { getServerSession } from 'next-auth/next';
import { MongoClient } from 'mongodb';
import HomepageHeader from '../components/headers/homepage/HomepageHeader';
import HomepageFooter from '../components/HomepageFooter';
import { options } from '../api/auth/[...nextauth]/options';

export default async function homepageLayout({ children }) {

  // Get session information
  const session = await getServerSession(options);

  let findResult;

  if (!!session) {
    if (session.user.username && session.user.profile_colors) { // Means that the session information already contains the necessary information 
      findResult = session.user
    } else { // The user probably used oAuth. Query the database for more information.
      const client = new MongoClient(process.env.MONGODB_URI);
      try {
        const database = client.db('spanishdex');
        const collection = database.collection('users');
        findResult = await collection.findOne({email: session.user.email}, {projection: {_id: 0, email: 1, username: 1, profile_picture: 1, profile_colors: 1}});
        
      } catch (error) {
        findResult = session.user;
        findResult.username = session.user.email; // Put the email in as a replacement username
        findResult.profile_colors = [ "#CF7000", "#000000" ]; // Give some generic profile picture color information

      } finally {
        await client.close();
      }
      
    }    
  } else {
    findResult = false;
  }

  const containerStyles = {
    height: 'calc(100vh - 82px)',
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'space-between'
  }

  return (
    <>
      <HomepageHeader user={findResult}/>
      <div style={containerStyles}>
        <div>
          {children}
        </div>      
        <HomepageFooter />
      </div>
    </>
  );
}
