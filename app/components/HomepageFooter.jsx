import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function HomepageFooter() {
  return (
    <Container fluid className="py-4 px-50 bg-gradient border-top border-gray-150 border-2">
      <Row className='gy-4'>
        <Col xs='12' md='auto' className='d-flex align-items-center'>
          <p className='fs-5'>Copyright © 2024 SpanishDex &nbsp;•&nbsp;  <span className='fw-medium text-nowrap'>Created by Jakin Stahl</span></p>
        </Col>
        <Col className='col-auto ms-md-auto'>
          <nav>
            <a href="mailto:jakinstahl@gmail.com" className='me-20 blue-link'><Image height={30} src={'/icons/mail.svg'} alt='Mail icon'></Image></a>
            <a href="https://www.linkedin.com/in/jakinstahl" className='blue-link' target='_blank'><Image height={30} src={'/icons/linkedin.svg'} alt='LinkedIn icon'></Image></a>
          </nav>
        </Col>
      </Row>
    </Container>      
  );
}

export default HomepageFooter;