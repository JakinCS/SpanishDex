'use client'

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavbarToggle from "../NavbarToggle";
import HeaderButtons from "./HeaderButtons";

function HomepageHeader(props) {

  return (
    <>
      <Navbar
        fixed="top"
        className="app-header bg-gradient border-bottom border-gray-150 border-2"
      >
        <Navbar.Brand className="d-none d-sm-block">
          <img
            src={"/logo.svg"}
            alt="SpanishDex Logo"
            style={{ height: "3.125rem" }}
          />
        </Navbar.Brand>
        <Navbar.Brand className="d-block d-sm-none">
          <img
            src={"/logo-icon.svg"}
            alt="SpanishDex Logo"
            style={{ height: "3.125rem" }}
          />
        </Navbar.Brand>
        
        <NavbarToggle />
        <Navbar.Collapse id="homepage-nav">
          <Nav className="ms-auto my-2 column-gap-25 row-gap-3 align-items-center">
            <HeaderButtons user={props.user}/>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default HomepageHeader;
