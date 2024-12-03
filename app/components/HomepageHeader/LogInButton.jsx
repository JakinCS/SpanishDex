'use client'

import Button from 'react-bootstrap/Button'
import LogInModal from './LogInModal';
import { useState } from "react";

function LogInButton() {

    const [logInModalOpenState, setLogInModalOpenState] = useState(false);

    const openLogInModal = () => {
        setLogInModalOpenState(true);
      }
      const closeLogInModal = () => {
        setLogInModalOpenState(false);
      }

    return (
      <>
        <Button className="ms-auto" variant="primary" onClick={openLogInModal}>
          Log In
        </Button>

        <LogInModal handleClose={closeLogInModal} show={logInModalOpenState} />
      </>
    );
}

export default LogInButton;