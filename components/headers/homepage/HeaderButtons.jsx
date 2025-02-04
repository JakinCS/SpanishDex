'use client'

import CreateAccountModal from "@/components/modals/CreateAccountModal"
import LogInModal from "@/components/modals/LogInModal"
import ResetPasswordModal from "@/components/modals/ResetPasswordModal";
import Button from 'react-bootstrap/Button'
import { useState } from "react";
import ProfileDropdown from "@/components/headers/ProfileDropdown";
import LogOutModal from "@/components/modals/LogOutModal";
import Link from "next/link";
import { useSession } from "next-auth/react";

const HeaderButtons = (props) => {
  const { data: session } =  useSession();

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

  const tempUserInfo = {
    username: " ...loading",
    profile_colors: [ "#cccccc", "#000000" ]
  }

  return (
    <>
      { !!props.sessionInfo ? 
        <>
          <Link role='button' href='/dashboard' className="btn btn-outline-primary ms-auto" id='dashboardButton' >
            <span className="d-none d-md-block">Go To Dashboard</span>
            <span className="d-block d-md-none">Dashboard</span>
          </Link>
          <ProfileDropdown className="ms-auto" user={session?.user || props.sessionInfo.user} onClick={openLogOutModal}/>
        </>
        :
        <>
          <Button className="ms-auto d-none d-md-block" variant="outline-primary" onClick={openLogInModal}>
            Log In
          </Button>
          <a href="#" className="navbar-link blue-link d-block d-md-none py-2 px-2 fw-semibold text-primary" style={{marginRight: '-0.3125rem'}} onClick={(e) => {e.preventDefault(); openLogInModal()}}>Log In</a>
          
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