'use client'

import CreateAccountModal from "./CreateAccountModal"
import LogInModal from "./LogInModal"
import ResetPasswordModal from "./ResetPasswordModal";
import Button from 'react-bootstrap/Button'
import { useState } from "react";
import { signOut } from "next-auth/react";
import ProfileDropdown from "./ProfileDropdown";

const HeaderButtons = (props) => {
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
      
  console.log(props.session)

  return (
    <>
      { !!props.session ? 
        <Button className="ms-auto" id='dashboardButton' variant="outline-primary" >
          Go To Dashboard
        </Button>
        :
        <Button className="ms-auto" id='createAccountButton' variant="outline-primary" onClick={openSignUpModal}>
          Create Account
        </Button>
      }

      { !!props.session ?
        <Button className="ms-auto" variant="primary" onClick={() => {signOut()}}>
          Log Out
        </Button>
        :
        <Button className="ms-auto" variant="primary" onClick={openLogInModal}>
          Log In
        </Button>
      }

      <ProfileDropdown className="ms-auto"/>

      <CreateAccountModal handleClose={closeSignUpModal} show={signUpModalOpenState} openLogInModal={openLogInModal}/>
      <LogInModal handleClose={closeLogInModal} show={logInModalOpenState} openSignUpModal={openSignUpModal} openResetPasswordModal={openResetPasswordModal}/>
      <ResetPasswordModal handleClose={closeResetPasswordModal} show={resetPasswordModalOpenState} openLogInModal={openLogInModal}/>
    </>
  );
};

export default HeaderButtons