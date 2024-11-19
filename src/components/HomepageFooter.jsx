import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
// Icons
import mail from '../assets/icons/mail.svg';
import linkedin from '../assets/icons/linkedin.svg'

function HomepageFooter() {
  return (
    <Navbar expand="lg" className="bg-gradient border-top border-gray-150 border-2">
        <p className='fs-5'>Copyright © 2024 SpanishDex &nbsp;•&nbsp;  <span className='fw-medium'>Created by Jakin Stahl</span></p>
        <Nav className="ms-auto column-gap-20">
            <Nav.Link href="mailto:jakinstahl@gmail.com"><Image height={30} src={mail} alt='Mail icon'></Image></Nav.Link>
            <Nav.Link href="https://www.linkedin.com/in/jakinstahl" target='_blank'><Image height={30} src={linkedin} alt='LinkedIn icon'></Image></Nav.Link>
        </Nav>
    </Navbar>
  );
}

export default HomepageFooter;