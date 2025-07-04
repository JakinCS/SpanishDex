import HomepageHeader from '@/components/headers/homepage/HomepageHeader';
import HomepageFooter from '@/components/footers/HomepageFooter';
import AuthProvider from '../context/AuthProvider';

export default function homepageLayout({ children }) {

  const containerStyles = {
    height: 'calc(100vh - 5rem - 2px)',
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'space-between'
  }

  return (
    <>
      <AuthProvider>
        <HomepageHeader />   
        <div style={containerStyles}>
          <main>
            {children}
          </main>            
          <HomepageFooter />
        </div>
      </AuthProvider>  
    </>
  );
}
