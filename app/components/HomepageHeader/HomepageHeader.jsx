'use client'

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import LogInButton from "./LogInButton";
import NavbarToggle from "./NavbarToggle";

function HomepageHeader() {

  return (
    <>
      <Navbar
        expand="lg"
        fixed="top"
        className="bg-gradient border-bottom border-gray-150 border-2"
      >
        <Navbar.Brand>
          <img
            src={"/logo.svg"}
            alt="SpanishDex Logo"
            style={{ height: "3.125rem" }}
          />
        </Navbar.Brand>
        <NavbarToggle />
        <Navbar.Collapse id="homepage-nav">
          <Nav className="ms-auto my-2 column-gap-25 row-gap-3">
            <Button className="ms-auto" variant="outline-primary">
              Create Account
            </Button>
            <LogInButton />
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default HomepageHeader;
