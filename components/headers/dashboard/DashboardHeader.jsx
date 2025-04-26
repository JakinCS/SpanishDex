import Header from "../Header";
import DashboardHeaderButtons from "./DashboardHeaderButtons";

const DashboardHeader = () => {
  return (
    <Header link='/dashboard'>
      <DashboardHeaderButtons />
    </Header>
  );
}

export default DashboardHeader;