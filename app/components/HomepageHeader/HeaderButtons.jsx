import CreateAccountButton from "./CreateAccountButton"
import CreateAccountModal from "./CreateAccountModal"
import LogInButton from "./LogInButton"
import LogInModal from "./LogInModal"
import { useState } from "react";

const HeaderButtons = () => {
  const [logInModalOpenState, setLogInModalOpenState] = useState(false);

  const openLogInModal = () => {
    setLogInModalOpenState(true);
  };
  const closeLogInModal = () => {
    setLogInModalOpenState(false);
  };

  const [signUpModalOpenState, setSignUpModalOpenState] = useState(false);

  const openSignUpModal = () => {
    setSignUpModalOpenState(true);
  };
  const closeSignUpModal = () => {
    setSignUpModalOpenState(false);
  };

  return (
    <>
      <CreateAccountButton openModal={openSignUpModal}/>
      <LogInButton openModal={openLogInModal} />

      <CreateAccountModal handleClose={closeSignUpModal} show={signUpModalOpenState} openLogInModal={openLogInModal}/>
      <LogInModal handleClose={closeLogInModal} show={logInModalOpenState} openSignUpModal={openSignUpModal} />
    </>
  );
};

export default HeaderButtons