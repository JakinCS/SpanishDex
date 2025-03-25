import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import spanishdex from "@/public/logo.svg";
import Image from "next/image";
import Link from "next/link";

function Footer({ children }) {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <Container fluid className="py-4 px-50 bg-gradient border-top border-gray-150 border-2">
      <Row className='gy-4 mb-4 mb-lg-0 align-items-center mx-auto' style={{maxWidth: '87.5rem'}}>
        <Col xs='12' sm='auto' lg='4' xl='3' className='d-flex align-items-center justify-content-center justify-content-lg-start px-0 py-4 py-sm-0'>
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
        <Col lg='4' xl='6' className='d-none d-lg-flex justify-content-center'>
          <p className='fs-5 text-center'>Copyright © {year} SpanishDex &nbsp;•&nbsp;  <span className='fw-medium text-nowrap'>Created by Jakin Stahl</span></p>
        </Col>
        <Col xs='12' sm='auto' lg='4' xl='3' className='d-flex align-items-center justify-content-center justify-content-lg-end px-0 ms-sm-auto'>
          <nav>
            { children }
          </nav>
        </Col>
      </Row>
      <Row className='justify-content-center d-flex d-lg-none'>
        <Col xs='auto' className='py-4 py-sm-0'>
          <p className='fs-5 text-center'>Copyright © {year} SpanishDex &nbsp;•&nbsp;  <span className='fw-medium text-nowrap'>Created by Jakin Stahl</span></p>
        </Col>
      </Row>
    </Container>      
  );
}

export default Footer;