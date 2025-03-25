import HomepageFooter from '@/components/footers/HomepageFooter';
import AuthProvider from '../context/AuthProvider';
import DashboardHeader from '@/components/headers/dashboard/DashboardHeader';
import Container from 'react-bootstrap/Container';
import DashboardFooter from '@/components/footers/DashboardFooter';

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
          <Container className="topLevelContainer" fluid>
            <div style={{maxWidth: '87.5rem', marginLeft: 'auto', marginRight: 'auto',}}>
              {children} 
            </div>     
          </Container>  
          <DashboardFooter />
        </div>
      </AuthProvider>  
    </>
  );
}