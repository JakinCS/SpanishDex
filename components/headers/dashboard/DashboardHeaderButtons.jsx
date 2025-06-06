'use client'

import Button from 'react-bootstrap/Button'
import IconButton from '@/components/IconButton'
import { useSession } from "next-auth/react";
import ProfileDropdown from '../ProfileDropdown';
import { useState } from 'react';
import CreateAccountModal from "@/components/modals/CreateAccountModal"
import LogInModal from "@/components/modals/LogInModal"
import ResetPasswordModal from "@/components/modals/ResetPasswordModal";
import LogOutModal from '@/components/modals/LogOutModal';
import ButtonWithIcon from '@/components/ButtonWithIcon';

const DashboardHeaderButtons = () => {
  const { data: session } =  useSession();

  // Log In Modal State
  const [logInModalOpenState, setLogInModalOpenState] = useState(false);

  const openLogInModal = () => setLogInModalOpenState(true);
  const closeLogInModal = () => setLogInModalOpenState(false);

  // Sign Up Modal State
  const [signUpModalOpenState, setSignUpModalOpenState] = useState(false);

  const openSignUpModal = () => setSignUpModalOpenState(true);
  const closeSignUpModal = () => setSignUpModalOpenState(false);

  // Reset Password Modal State
  const [resetPasswordModalOpenState, setResetPasswordModalOpenState] = useState(false);

  const openResetPasswordModal = () => setResetPasswordModalOpenState(true);
  const closeResetPasswordModal = () => setResetPasswordModalOpenState(false);

  // Log Out Modal State
  const [logOutModalOpenState, setLogOutModalOpenState] = useState(false);

  const openLogOutModal = () => setLogOutModalOpenState(true);
  const closeLogOutModal = () => setLogOutModalOpenState(false);
  

  return (
    <>
      { session === null && 
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
      { (!!session || session === undefined) &&
        <>
          <IconButton isLinkButton={true} href='/dashboard/deck/new' className={'btn btn-primary'} iconFillColor={'white'} iconSrc={'/icons/add.svg'} altTag={'New deck icon'} size={'md'}/>

          <ButtonWithIcon isLinkButton={true} href='/dashboard' iconFillColor={'primary'} className='btn btn-outline-primary d-none d-sm_md-block' iconSrc='/icons/home-300-edited-blue.svg' iconHeight={20} altTag=''>Home</ButtonWithIcon>
          <IconButton isLinkButton={true} href='/dashboard' iconFillColor={'primary'} className='btn btn-outline-primary d-block d-sm_md-none' iconSrc={'/icons/home-300-edited-blue.svg'} altTag={'Go home icon'} size={'sm'}/>  
        </>
      }

      { session === undefined &&
        <div className='placeholder-glow'>
          <span className='d-block placeholder bg-gray-150 rounded-circle' style={{height: '2.5rem', width: '2.5rem' }}></span>
        </div>
      }
      
      { !!session && 
        <ProfileDropdown className="ms-auto" user={session?.user} onClick={openLogOutModal}/>
      }


      <CreateAccountModal handleClose={closeSignUpModal} show={signUpModalOpenState} openLogInModal={openLogInModal}/>
      <LogInModal handleClose={closeLogInModal} show={logInModalOpenState} openSignUpModal={openSignUpModal} openResetPasswordModal={openResetPasswordModal}/>
      <ResetPasswordModal handleClose={closeResetPasswordModal} show={resetPasswordModalOpenState} openLogInModal={openLogInModal}/>
      <LogOutModal handleClose={closeLogOutModal} show={logOutModalOpenState}/>
    </>
  )
}

export default DashboardHeaderButtons