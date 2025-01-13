import { getServerSession } from 'next-auth';
import { MongoClient } from 'mongodb';
import HomepageHeader from '../components/headers/homepage/HomepageHeader';
import HomepageFooter from '../components/HomepageFooter';

export default async function homepageLayout({ children }) {

  // Get session information
  const session = await getServerSession();

  let findResult;

  if (!!session) {
    const client = new MongoClient(process.env.MONGODB_URI);
    const database = client.db('spanishdex');
    const collection = database.collection('users');
    findResult = await collection.findOne({username: session.user.name}, {projection: {_id: 0, username: 1, profile_picture: 1, profile_colors: 1}});
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
