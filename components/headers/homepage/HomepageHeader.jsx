import Header from "../Header";
import HomepageHeaderButtons from "./HomepageHeaderButtons";

const HomepageHeader = async () => {
  return (
    <Header link='/'>
      <HomepageHeaderButtons />
    </Header>
  );
}

export default HomepageHeader;
