'use client'

import CreateAccountModal from "./CreateAccountModal"
import LogInModal from "./LogInModal"
import ResetPasswordModal from "./ResetPasswordModal";
import Button from 'react-bootstrap/Button'
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

  const [resetPasswordModalOpenState, setResetPasswordModalOpenState] = useState(false);

  const openResetPasswordModal = () => {
    setResetPasswordModalOpenState(true);
  }
  const closeResetPasswordModal = () => {
    setResetPasswordModalOpenState(false);
  }

  return (
    <>
      <Button className="ms-auto" id='createAccountButton' variant="outline-primary" onClick={openSignUpModal}>
        Create Account
      </Button>
      <Button className="ms-auto" variant="primary" onClick={openLogInModal}>
        Log In
      </Button>

      <CreateAccountModal handleClose={closeSignUpModal} show={signUpModalOpenState} openLogInModal={openLogInModal}/>
      <LogInModal handleClose={closeLogInModal} show={logInModalOpenState} openSignUpModal={openSignUpModal} openResetPasswordModal={openResetPasswordModal}/>
      <ResetPasswordModal handleClose={closeResetPasswordModal} show={resetPasswordModalOpenState} openLogInModal={openLogInModal}/>
    </>
  );
};

export default HeaderButtons