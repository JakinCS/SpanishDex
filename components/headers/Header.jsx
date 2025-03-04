import Navbar from "react-bootstrap/Navbar";
import HeaderContent from "./HeaderContent";

const Header = async ({ children }) => {
  return (
    <Navbar
      fixed="top"
      className="app-header bg-gradient border-bottom border-gray-150 border-2"
    >
      <HeaderContent>
        { children }
      </HeaderContent>
    </Navbar>
  );
}

export default Header;