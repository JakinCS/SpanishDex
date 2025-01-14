'use client'
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack"
import Container from "react-bootstrap/Container"
import Alert from "react-bootstrap/Alert";
import { useEffect, useState } from "react";
import { signOut } from 'next-auth/react';
import { useRouter } from "next/navigation";

function LogOutModal(props) {
  const router = useRouter();

  // State for keeping track of the state of the form (loading status, errors, successes)
  const [formState, setFormState] = useState({
    isLoading: false,
    error: false,
    errorMessage: '',
    errorAcknowledged: false
  })

  // Use effect hook for disabling the modal close button (when the form is being submitted)
  // This effect hook is necessary because the button code is not accessible in this JSX file.
  useEffect(() => {
    if (document.querySelector('#logOutModal .btn-close') !== null) {
      if (formState.isLoading) {
        document.querySelector('#logOutModal .btn-close').disabled = true;
      } else {
        document.querySelector('#logOutModal .btn-close').disabled = false;
      }
    }
  }, [formState.isLoading])

  // Function for resetting the state of the form (useful when triggered on 'modal open')
  const resetState = () => {
    setFormState({
      isLoading: false,
      error: false,
      errorMessage: '',
      errorAcknowledged: false
    });
  }


  let serverError = ''; // holds the raw server error for putting in a hidden paragraph for debugging purposes.
  // Function for handling the logging in of the user.
  const logIn = async () => {

    // Set loading state to show a loading spinner
    setFormState(prevState => ({...prevState, isLoading: true, errorAcknowledged: true}));

    try {

      // Sign the user out
      await signOut();
    
      // Success. Now set the server error state to false.
      setFormState(prevState => ({...prevState, error: false}))

      // Redirect to the homepage
      router.push('/');

    } catch (error) {
      serverError = JSON.stringify(error);
      setFormState(prevState => ({...prevState, error: true, errorMessage: 'Sign out failed. Please try again.', errorAcknowledged: false, isLoading: false}));

    }
  }

  return (
    <Modal id='logOutModal' show={props.show} onShow={resetState} onHide={props.handleClose} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title as='h2'>Log Out</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack gap={5}>
          <Alert variant="danger" show={(formState.error && formState.errorAcknowledged === false)} onClose={() => setFormState(prevState => ({...prevState, errorAcknowledged: true}))} dismissible>
            <Alert.Heading>Error</Alert.Heading>
            {formState.errorMessage}
          </Alert>
          <p className="d-none hiddenError">{serverError}</p>
          <p>Are you sure you want to log out of SpanishDex?</p>
          <Container fluid className="d-flex gap-4 justify-content-end p-0">
            <Button variant="gray" onClick={props.handleClose} disabled={formState.isLoading}>
              Cancel
            </Button>
            <Button variant="danger" onClick={logIn} disabled={formState.isLoading}>
              {formState.isLoading ? <div style={{padding: '0rem 1rem'}}><div className="loader"></div><span className="visually-hidden">Loading...</span></div> : 'Log Out'}
            </Button>
          </Container>
        </Stack>
      </Modal.Body>
    </Modal>
  );
}

export default LogOutModal;
