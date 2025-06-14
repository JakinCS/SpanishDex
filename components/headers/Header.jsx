import Navbar from "react-bootstrap/Navbar";
import HeaderContent from "./HeaderContent";

const Header = async ({ children, link }) => {
  return (
    <Navbar
      fixed="top"
      className="app-header bg-gradient border-bottom border-gray-150 border-2 justify-content-center"
      as="header"
    > 
      <Navbar className="w-100 p-0" style={{maxWidth: '80rem'}}>
        <HeaderContent link={link}>
          { children }
        </HeaderContent>
      </Navbar>
    </Navbar>
  );
}

export default Header;