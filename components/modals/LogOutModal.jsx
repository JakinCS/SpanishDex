'use client'
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack"
import Container from "react-bootstrap/Container"
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form"
import { useActionState, useEffect, useState } from "react";
import { signOut } from "next-auth/react";

function LogOutModal(props) {

  const [serverError, setServerError] = useState(''); // holds the raw server error for putting in a hidden paragraph for debugging purposes.

  // State for whether to show the error banner or not
  const [showError, setShowError] = useState(false)

  // Function for handling the logging out of the user
  const handleFormSubmit = async (prevState) => {    
    try {
      await signOut({redirectTo: '/'})

      return { ...prevState, status: "SUCCESS"}

    } catch (error) {

      setServerError(JSON.stringify(error));
      setShowError(true);
      return { ...prevState, error: 'Sign out failed. Please try again.', status: "ERROR"}          
    }
  }

  const [formState, formAction, isPending] = useActionState(handleFormSubmit, {error: '', status: 'INITIAL'})

  // Use effect hook for disabling the modal close button (when the form is being submitted)
  // This effect hook is necessary because the button code is not accessible in this JSX file.
  useEffect(() => {
    if (document.querySelector('#logOutModal .btn-close') !== null) {
      if (isPending) {
        document.querySelector('#logOutModal .btn-close').disabled = true;
      } else {
        document.querySelector('#logOutModal .btn-close').disabled = false;
      }
    }
  }, [isPending])

  return (
    <Modal id='logOutModal' show={props.show} onExited={()=>setShowError(false)} onHide={props.handleClose} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title as='h2'>Log Out</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack gap={5}>
          <Alert variant="danger" show={(formState.status === "ERROR" && showError === true)} onClose={() => setShowError(false)} dismissible>
            <Alert.Heading>Error</Alert.Heading>
            {formState.error}
          </Alert>
          <p className="d-none text-break hiddenError">{serverError}</p>
          <p>Are you sure you want to log out of SpanishDex?</p>
          <Form action={formAction}>
            <Container fluid className="d-flex gap-4 justify-content-end p-0">            
              <Button variant="gray" onClick={props.handleClose} disabled={isPending}>
                Cancel
              </Button>
              <Button variant="danger" type='submit' disabled={isPending}>
                {isPending ? <div style={{padding: '0rem 1rem'}}><div className="loader"></div><span className="visually-hidden">Loading...</span></div> : 'Log Out'}
              </Button>
            </Container>
          </Form>
        </Stack>
      </Modal.Body>
    </Modal>
  );
}

export default LogOutModal;
