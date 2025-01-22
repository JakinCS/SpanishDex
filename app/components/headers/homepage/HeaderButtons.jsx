'use client'

import CreateAccountModal from "../../modals/CreateAccountModal"
import LogInModal from "../../modals/LogInModal"
import ResetPasswordModal from "../../modals/ResetPasswordModal";
import Button from 'react-bootstrap/Button'
import { useState } from "react";
import ProfileDropdown from "../ProfileDropdown";
import LogOutModal from "../../modals/LogOutModal";
import { useSession } from "next-auth/react";

const HeaderButtons = (props) => {
  // Log In Modal State
  const [logInModalOpenState, setLogInModalOpenState] = useState(false);

  const openLogInModal = () => {
    setLogInModalOpenState(true);
  };
  const closeLogInModal = () => {
    setLogInModalOpenState(false);
  };

  // Sign Up Modal State
  const [signUpModalOpenState, setSignUpModalOpenState] = useState(false);

  const openSignUpModal = () => {
    setSignUpModalOpenState(true);
  };
  const closeSignUpModal = () => {
    setSignUpModalOpenState(false);
  };

  // Reset Password Modal State
  const [resetPasswordModalOpenState, setResetPasswordModalOpenState] = useState(false);

  const openResetPasswordModal = () => {
    setResetPasswordModalOpenState(true);
  }
  const closeResetPasswordModal = () => {
    setResetPasswordModalOpenState(false);
  }

  // Log Out Modal State
  const [logOutModalOpenState, setLogOutModalOpenState] = useState(false);

  const openLogOutModal = () => {
    setLogOutModalOpenState(true);
  }
  const closeLogOutModal = () => {
    setLogOutModalOpenState(false);
  }

  console.log(props.user)
  return (
    <>
      { !!props.user ? 
        <Button className="ms-auto" id='dashboardButton' variant="outline-primary" >
          Go To Dashboard
        </Button>
        :
        <Button className="ms-auto" id='createAccountButton' variant="outline-primary" onClick={openSignUpModal}>
          Create Account
        </Button>
      }

      { !!props.user ?
        <ProfileDropdown className="ms-auto" user={props.user} onClick={openLogOutModal}/>
        :
        <Button className="ms-auto" variant="primary" onClick={openLogInModal}>
          Log In
        </Button>
      }
      

      <CreateAccountModal handleClose={closeSignUpModal} show={signUpModalOpenState} openLogInModal={openLogInModal}/>
      <LogInModal handleClose={closeLogInModal} show={logInModalOpenState} openSignUpModal={openSignUpModal} openResetPasswordModal={openResetPasswordModal}/>
      <ResetPasswordModal handleClose={closeResetPasswordModal} show={resetPasswordModalOpenState} openLogInModal={openLogInModal}/>
      <LogOutModal handleClose={closeLogOutModal} show={logOutModalOpenState}/>
    </>
  );
};

export default HeaderButtons