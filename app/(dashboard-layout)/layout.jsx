import AuthProvider from '../context/AuthProvider';
import DashboardHeader from '@/components/headers/dashboard/DashboardHeader';
import Container from 'react-bootstrap/Container';
import DashboardFooter from '@/components/footers/DashboardFooter';
import BackToTopButton from '@/components/miscellaneous/BackToTopButton';

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
            <Container className="topLevelContainer" fluid as="main">
              <div style={{maxWidth: '80rem', marginLeft: 'auto', marginRight: 'auto',}}>
                {children} 
              </div>     
            </Container> 
            <BackToTopButton />
          </div> 
          <DashboardFooter />
        </div>
      </AuthProvider>  
    </>
  );
}