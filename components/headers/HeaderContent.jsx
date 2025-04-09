"use client";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import spanishdex from "@/public/logo.svg";
import spanishdexIcon from "@/public/logo-icon.svg";
import Image from "next/image";
import Link from "next/link";

const HeaderContent = ({ children }) => {
  return (
    <>
      <Navbar.Brand className="d-none d-sm-block">
        <Link href="/" className='blue-link'>
          <Image
            className="logo"
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
            className="logo"
            src={spanishdexIcon}
            alt="SpanishDex Logo"  
            placeholder="blur"
            blurDataURL={'/logo-icon.svg'}            
            style={{ height: "3.125rem", width: 'auto' }}
          />
        </Link>
      </Navbar.Brand>

      <Navbar.Collapse id="homepage-nav">
        <Nav className="ms-auto my-2 column-gap-20 column-gap-sm-25 row-gap-3 align-items-center">
          {children}
        </Nav>
      </Navbar.Collapse>
    </>
  )
}

export default HeaderContent