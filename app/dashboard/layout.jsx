import HomepageHeader from '@/components/headers/homepage/HomepageHeader';
import HomepageFooter from '@/components/HomepageFooter';
import AuthProvider from '../context/AuthProvider';
import DashboardHeader from '@/components/headers/DashboardHeader';

export default function dashboardLayout({ children }) {

  const containerStyles = {
    height: 'calc(100vh - 5rem - 2px)',
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'space-between'
  }

  return (
    <>
      <AuthProvider>
        <DashboardHeader />   
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