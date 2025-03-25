import Footer from './Footer';
import Link from 'next/link';

function DashboardFooter() {
  return (
    <Footer>
      <Link href="mailto:jakinstahl@gmail.com" className='me-4 px-2 py-3'>
        About
      </Link>
      <Link href="https://www.linkedin.com/in/jakinstahl" className='px-2 py-3' style={{marginRight: '-5px'}} target='_blank'>
        Contact
      </Link>
    </Footer>     
  );
}

export default DashboardFooter;