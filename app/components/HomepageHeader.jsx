import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import logo from '../assets/logo.svg';

import { useState } from 'react';

function HomepageHeader() {

  const [menuOpenState, setMenuOpenState] = useState('closed')
  
  const toggleMenuOpenState = () => {
    menuOpenState === 'open' ? setMenuOpenState('closed') : setMenuOpenState('open');
  }

  return (
    <Navbar expand="lg" fixed='top' className="bg-gradient border-bottom border-gray-150 border-2">
      <Navbar.Brand>
        <img src={logo} alt="SpanishDex Logo" style={{height: '3.125rem'}}/>
      </Navbar.Brand>      
      <Navbar.Toggle onClick={toggleMenuOpenState} aria-controls="homepage-nav" className={(menuOpenState === 'open' ? 'show-close-icon' : 'show-menu-icon') + ' border-0'}/>
      <Navbar.Collapse id="homepage-nav">
        <Nav className="ms-auto my-2 column-gap-25 row-gap-3">
          <Button className='ms-auto' variant="outline-primary">Create Account</Button>
          <Button className='ms-auto' variant="primary">Log In</Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default HomepageHeader;