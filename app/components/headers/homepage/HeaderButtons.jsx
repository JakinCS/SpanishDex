'use client'

import CreateAccountModal from "../../modals/CreateAccountModal"
import LogInModal from "../../modals/LogInModal"
import ResetPasswordModal from "../../modals/ResetPasswordModal";
import Button from 'react-bootstrap/Button'
import { useState } from "react";
import ProfileDropdown from "../ProfileDropdown";
import LogOutModal from "../../modals/LogOutModal";
import Link from "next/link";

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

  console.log("Header Buttons: ", props.user);

  return (
    <>
      { !!props.user ? 
        <>
          <Link role='button' href='/dashboard' className="btn btn-outline-primary ms-auto" id='dashboardButton' >
            <span className="d-none d-md-block">Go To Dashboard</span>
            <span className="d-block d-md-none">Dashboard</span>
          </Link>
          <ProfileDropdown className="ms-auto" user={props.user} onClick={openLogOutModal}/>
        </>
        :
        <>
          <Button className="ms-auto d-none d-md-block" variant="outline-primary" onClick={openLogInModal}>
            Log In
          </Button>
          <a href="#" className="navbar-link d-block d-md-none py-2 ps-2 fw-semibold text-primary" onClick={openLogInModal}>Log In</a>
          
          <Button className="ms-auto" id='createAccountButton' variant="primary" onClick={openSignUpModal}>
            <span className="d-none d-md-block">Create Account</span>
            <span className="d-block d-md-none">Sign Up</span>
          </Button>
        </>
      }
      

      <CreateAccountModal handleClose={closeSignUpModal} show={signUpModalOpenState} openLogInModal={openLogInModal}/>
      <LogInModal handleClose={closeLogInModal} show={logInModalOpenState} openSignUpModal={openSignUpModal} openResetPasswordModal={openResetPasswordModal}/>
      <ResetPasswordModal handleClose={closeResetPasswordModal} show={resetPasswordModalOpenState} openLogInModal={openLogInModal}/>
      <LogOutModal handleClose={closeLogOutModal} show={logOutModalOpenState}/>
    </>
  );
};

export default HeaderButtons