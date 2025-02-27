'use client'

import Navbar from "react-bootstrap/Navbar";
import { useState } from "react";

function NavbarToggle() {
  const [menuOpenState, setMenuOpenState] = useState("closed");

  const toggleMenuOpenState = () => {
    menuOpenState === "open"
      ? setMenuOpenState("closed")
      : setMenuOpenState("open");
  };

  return (
    <Navbar.Toggle
      onClick={toggleMenuOpenState}
      aria-controls="homepage-nav"
      className={
        (menuOpenState === "open" ? "show-close-icon" : "show-menu-icon") +
        " border-0"
      }
      style={{marginRight: '0px !important'}} // Fixes margin issue that occurs when modals are open
    />
  );
}

export default NavbarToggle;
