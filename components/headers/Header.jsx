import Navbar from "react-bootstrap/Navbar";
import HeaderContent from "./HeaderContent";

const Header = async ({ children }) => {
  return (
    <Navbar
      fixed="top"
      className="app-header bg-gradient border-bottom border-gray-150 border-2 justify-content-center"
    > 
      <Navbar className="w-100 p-0" style={{maxWidth: '87.5rem'}}>
        <HeaderContent>
          { children }
        </HeaderContent>
      </Navbar>
    </Navbar>
  );
}

export default Header;