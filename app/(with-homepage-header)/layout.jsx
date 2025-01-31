import HomepageHeader from '../components/headers/homepage/HomepageHeader';
import HomepageFooter from '../components/HomepageFooter';
import { getServerSession } from 'next-auth';

export default async function homepageLayout({ children }) {
  // Get session information
  const session = await getServerSession();

  const containerStyles = {
    height: 'calc(100vh - 82px)',
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'space-between'
  }

  return (
    <>
      <HomepageHeader isLoggedIn={!!session}/>
      <div style={containerStyles}>
        <div>
          {children}
        </div>      
        <HomepageFooter />
      </div>
    </>
  );
}
