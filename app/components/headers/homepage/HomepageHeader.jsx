"use client";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavbarToggle from "../NavbarToggle";
import HeaderButtons from "./HeaderButtons";
import spanishdex from "@/public/logo.svg";
import spanishdexIcon from "@/public/logo-icon.svg";
import Image from "next/image";
import Link from "next/link";

function HomepageHeader(props) {
  return (
    <>
      <Navbar
        fixed="top"
        className="app-header bg-gradient border-bottom border-gray-150 border-2"
      >
        <Navbar.Brand className="d-none d-sm-block">
          <Link href="/" className='blue-link'>
            <Image
              alt="SpanishDex Logo"
              src={spanishdex}
              placeholder="blur"
              blurDataURL={'/logo.svg'}
              style={{ height: "3.125rem", width: "auto" }}
            />
          </Link>
        </Navbar.Brand>
        <Navbar.Brand className="d-block d-sm-none">
          <Link href="/" className='blue-link'>
            <Image
              src={spanishdexIcon}
              alt="SpanishDex Logo"  
              placeholder="blur"
              blurDataURL={'/logo-icon.svg'}            
              style={{ height: "3.125rem", width: 'auto' }}
            />
          </Link>
        </Navbar.Brand>

        <NavbarToggle />
        <Navbar.Collapse id="homepage-nav">
          <Nav className="ms-auto my-2 column-gap-25 row-gap-3 align-items-center">
            <HeaderButtons isLoggedIn={props.isLoggedIn}/>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default HomepageHeader;
