import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import spanishdex from "@/public/logo.svg";
import Image from "next/image";
import Link from "next/link";
import linkedin from "@/public/icons/linkedin.svg";
import mail from "@/public/icons/mail.svg";

function HomepageFooter() {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <Container fluid className="py-4 px-50 bg-gradient border-top border-gray-150 border-2">
      <Row className='gy-4 mb-4'>
        <Col xs='12' sm='auto' className='d-flex align-items-center justify-content-center py-4 py-sm-0'>
          <Link href="/" className='blue-link'>
            <Image
              alt="SpanishDex Logo"
              src={spanishdex}
              placeholder="blur"
              blurDataURL={'/logo.svg'}
              style={{ height: "3.125rem", width: "auto" }}
            />
          </Link>
        </Col>
        <Col xs='12' sm='auto' className='d-flex align-items-center justify-content-center ms-sm-auto'>
          <nav>
            <a href="mailto:jakinstahl@gmail.com" className='me-3 px-2 py-3 blue-link'>
              <Image width={30} height={30} src={mail} alt='Mail icon'></Image>
              </a>
            <a href="https://www.linkedin.com/in/jakinstahl" className='ps-2 py-3 blue-link' target='_blank'>
              <Image width={30} height={30} src={linkedin} alt='LinkedIn icon'></Image>
            </a>
          </nav>
        </Col>
      </Row>
      <Row className='justify-content-center'>
        <Col xs='auto' className='py-4 py-sm-0'>
          <p className='fs-5 text-center'>Copyright © {year} SpanishDex &nbsp;•&nbsp;  <span className='fw-medium text-nowrap'>Created by Jakin Stahl</span></p>
        </Col>
      </Row>
    </Container>      
  );
}

export default HomepageFooter;