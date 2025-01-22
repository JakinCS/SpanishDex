'use client'

import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack"
import Container from "react-bootstrap/Container"
import Alert from "react-bootstrap/Alert";
import { useState } from "react";
import { signOut } from 'next-auth/react';
import Link from "next/link";

const SignOut = () => {

  // State for keeping track of the state of the form (loading status, errors, successes)
  const [formState, setFormState] = useState({
    isLoading: false,
    serverError: false,
    serverMessage: '',
    errorAcknowledged: false
  })

  const [serverError, setServerError] = useState(''); // holds the raw server error for putting in a hidden paragraph for debugging purposes.
  // Function for handling the logging in of the user.
  const logOut = async () => {

    // Set loading state to show a loading spinner
    setFormState(prevState => ({...prevState, isLoading: true, errorAcknowledged: true}));

    try {
      // Sign the user out and redirect to the homepage
      await signOut({ callbackUrl: '/' });
    
      // Success. Now set the server error state to false.
      setFormState(prevState => ({...prevState, error: false}))

    } catch (error) {
      setServerError(JSON.stringify(error));
      setFormState(prevState => ({...prevState, error: true, errorMessage: 'Sign out failed. Please try again.', errorAcknowledged: false, isLoading: false}));

    }
  }

  return (
    <div className='mx-auto mt-50' style={{maxWidth: '35rem'}}>
      <Alert variant="danger" show={(formState.serverError && formState.errorAcknowledged === false)} onClose={() => setFormState(prevState => ({...prevState, errorAcknowledged: true}))} dismissible>
        <Alert.Heading>Error</Alert.Heading>
        {formState.serverMessage}
      </Alert>
      <div className='mt-25 bg-white p-50 rounded'>
        <Stack gap={5} className="text-center">
          <h1 className='fs-2'>Log Out</h1>
          <p className="d-none text-break hiddenError">{serverError}</p>
          <p>Are you sure you want to log out of SpanishDex?</p>
          <Container fluid className="d-flex gap-4 justify-content-center p-0">
            { formState.isLoading ? 
              <Button variant="gray" disabled={true}>Cancel</Button> 
              : 
              <Link href='/' role='button' className="btn btn-gray">
                Cancel
              </Link>     
            }       
            <Button variant="danger" onClick={logOut} disabled={formState.isLoading}>
              {formState.isLoading ? <div style={{padding: '0rem 1rem'}}><div className="loader"></div><span className="visually-hidden">Loading...</span></div> : 'Log Out'}
            </Button>
          </Container>
        </Stack>
      </div>
    </div>
  )
}

export default SignOut