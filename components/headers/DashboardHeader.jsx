import IconButton from "../IconButton";
import Header from "./Header";
import Button from 'react-bootstrap/Button'

const DashboardHeader = () => {
  return (
    <Header>
      <IconButton iconFillColor={'white'} variant='primary' iconSrc={'/icons/add.svg'} altTag={'New deck icon'} size={'md'}/>
      <Button variant='outline-primary'>My Decks</Button>
    </Header>
  );
}

export default DashboardHeader;