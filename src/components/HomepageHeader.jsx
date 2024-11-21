import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import logo from '../assets/logo.svg';

function HomepageHeader() {
  return (
    <Navbar expand="lg" fixed='top' className="bg-gradient border-bottom border-gray-150 border-2">
      <Navbar.Brand>
        <img src={logo} alt="SpanishDex Logo" style={{height: '3.125rem'}}/>
      </Navbar.Brand>      
      <Navbar.Toggle aria-controls="homepage-nav" className='border-0'/>
      <Navbar.Collapse id="homepage-nav">
        <Nav className="ms-auto my-2 column-gap-25 row-gap-3">
          <Button className='ms-auto' variant="outline-primary">Create Account</Button>
          <Button className='ms-auto' variant="primary">Log In</Button>
        </Nav>
        {/* <Nav className="ms-auto my-2 column-gap-25 row-gap-3">
          <Nav.Link className="ms-auto"><Button variant="outline-primary">Create Account</Button></Nav.Link>
          <Nav.Link className="ms-auto"><Button variant="primary">Log In</Button></Nav.Link>
        </Nav> */}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default HomepageHeader;