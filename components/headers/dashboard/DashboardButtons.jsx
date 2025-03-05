'use client'

import Button from 'react-bootstrap/Button'
import IconButton from '@/components/IconButton'
import { useSession } from "next-auth/react";
import ProfileDropdown from '../ProfileDropdown';
import { useState } from 'react';
import LogOutModal from '@/components/modals/LogOutModal';

const DashboardButtons = () => {
  const { data: session } =  useSession();

  // Log Out Modal State
  const [logOutModalOpenState, setLogOutModalOpenState] = useState(false);

  const openLogOutModal = () => setLogOutModalOpenState(true);
  const closeLogOutModal = () => setLogOutModalOpenState(false);
  

  return (
    <>
      {!!session &&
        <>
          <IconButton iconFillColor={'white'} variant='primary' iconSrc={'/icons/add.svg'} altTag={'New deck icon'} size={'md'}/>
          <Button variant='outline-primary'>
            <span className="d-none d-md-block">My Decks</span>
            <span className="d-block d-md-none">Decks</span>
          </Button>
          <ProfileDropdown className="ms-auto" user={session?.user} onClick={openLogOutModal}/>
        </>
      }


      <LogOutModal handleClose={closeLogOutModal} show={logOutModalOpenState}/>
    </>
  )
}

export default DashboardButtons