import Navbar from "react-bootstrap/Navbar";
import HomepageHeaderContent from "./HomepageHeaderContent";

const HomepageHeader = async () => {
  return (
    <Navbar
      fixed="top"
      className="app-header bg-gradient border-bottom border-gray-150 border-2"
    >
      <HomepageHeaderContent />
    </Navbar>
  );
}

export default HomepageHeader;
