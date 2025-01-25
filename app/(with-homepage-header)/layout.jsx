import HomepageHeader from '../components/headers/homepage/HomepageHeader';
import HomepageFooter from '../components/HomepageFooter';

export default async function homepageLayout({ children }) {

  const containerStyles = {
    height: 'calc(100vh - 82px)',
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'space-between'
  }

  return (
    <>
      <HomepageHeader />
      <div style={containerStyles}>
        <div>
          {children}
        </div>      
        <HomepageFooter />
      </div>
    </>
  );
}
