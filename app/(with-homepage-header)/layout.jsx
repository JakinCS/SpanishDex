import HomepageHeader from '@/components/headers/homepage/HomepageHeader';
import HomepageFooter from '@/components/HomepageFooter';
import AuthProvider from '../context/AuthProvider';

export default function homepageLayout({ children }) {

  const containerStyles = {
    height: 'calc(100vh - 82px)',
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'space-between'
  }

  return (
    <>
      <AuthProvider>
        <HomepageHeader />   
        <div style={containerStyles}>
          <div>
            {children}
          </div>            
          <HomepageFooter />
        </div>
      </AuthProvider>  
    </>
  );
}
