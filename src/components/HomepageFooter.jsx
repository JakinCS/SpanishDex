import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
// Icons
import mail from '../assets/icons/mail.svg';
import linkedin from '../assets/icons/linkedin.svg'

function HomepageFooter() {
  return (
    <Container fluid className="py-4 px-50 bg-gradient border-top border-gray-150 border-2">
      <Row className='gy-4'>
        <Col xs='12' md='auto' className='d-flex align-items-center'>
          <p className='fs-5'>Copyright © 2024 SpanishDex &nbsp;•&nbsp;  <span className='fw-medium text-nowrap'>Created by Jakin Stahl</span></p>
        </Col>
        <Col className='col-auto ms-md-auto'>
          <Nav className="ms-auto column-gap-20">
            <Nav.Link href="mailto:jakinstahl@gmail.com" className='rounded-1'><Image height={30} src={mail} alt='Mail icon'></Image></Nav.Link>
            <Nav.Link href="https://www.linkedin.com/in/jakinstahl" target='_blank' className='rounded-1'><Image height={30} src={linkedin} alt='LinkedIn icon'></Image></Nav.Link>
          </Nav>
        </Col>
      </Row>
    </Container>      
  );
}

export default HomepageFooter;