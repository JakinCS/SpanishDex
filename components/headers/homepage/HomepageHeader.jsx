import Navbar from "react-bootstrap/Navbar";
import HomepageHeaderContent from "./HomepageHeaderContent";
import { auth } from "@/auth"


const HomepageHeader = async () => {
  // Get session information
  const session = await auth();

  return (
    <Navbar
      fixed="top"
      className="app-header bg-gradient border-bottom border-gray-150 border-2"
    >
      <HomepageHeaderContent sessionInfo={session} />
    </Navbar>
  );
}

export default HomepageHeader;
