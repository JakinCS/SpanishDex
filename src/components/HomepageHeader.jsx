import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import logo from '../assets/logo.svg';

function HomepageHeader() {
  return (
    // <Navbar expand="lg" className="bg-gradient">
    //   <Container>
    //     <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
    //     <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //     <Navbar.Collapse id="basic-navbar-nav">
    //       <Nav className="me-auto">
    //         <Nav.Link href="#home">Home</Nav.Link>
    //         <Nav.Link href="#link">Link</Nav.Link>
    //         <NavDropdown title="Dropdown" id="basic-nav-dropdown">
    //           <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
    //           <NavDropdown.Item href="#action/3.2">
    //             Another action
    //           </NavDropdown.Item>
    //           <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
    //           <NavDropdown.Divider />
    //           <NavDropdown.Item href="#action/3.4">
    //             Separated link
    //           </NavDropdown.Item>
    //         </NavDropdown>
    //       </Nav>
    //     </Navbar.Collapse>
    //   </Container>
    // </Navbar>

    // <div className="d-flex align-items-center justify-content-between bg-gradient py-4 px-50 border-bottom border-gray-150 border-2">
    //   <img src={logo} alt="SpanishDex Logo" style={{height: '3.125rem'}}/>
    //   <div className="d-flex align-items-center column-gap-25">
    //     <Button variant="outline-primary">Create Account</Button>
    //     <Button variant="primary">Log In</Button>
    //   </div>
    // </div>

    <Navbar expand="lg" className="bg-gradient">
      <Navbar.Brand>
        <img src={logo} alt="SpanishDex Logo" style={{height: '3.125rem'}}/>
      </Navbar.Brand>      
      <Navbar.Toggle aria-controls="homepage-nav" />
      <Navbar.Collapse id="homepage-nav">
        <Nav className="ms-auto my-2 column-gap-25 row-gap-3">
          <Nav.Link className="ms-auto"><Button variant="outline-primary">Create Account</Button></Nav.Link>
          <Nav.Link className="ms-auto"><Button variant="primary">Log In</Button></Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default HomepageHeader;