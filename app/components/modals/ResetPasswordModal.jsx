'use client'

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack"
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import { useEffect, useState } from "react";

const ResetPasswordModal = (props) => {

  const [showSuccess, setShowSuccess] = useState(false)

  // State for keeping track of the state of the form (loading status, errors, successes)
  const [formState, setFormState] = useState({
    isLoading: false,
    error: false,
    errorMessage: '',
    errorAcknowledged: false,
    showSuccess: false
  });

  // Holds the email information
  const [email, setEmail] = useState('');

  // Use effect hook for disabling the modal close button (when the form is being submitted)
  // This effect hook is necessary because the button code is not accessible in this JSX file.
  useEffect(() => {
    if (document.querySelector('#resetPasswordModal .btn-close') !== null) {
      if (formState.isLoading) {
        document.querySelector('#resetPasswordModal .btn-close').disabled = true;
      } else {
        document.querySelector('#resetPasswordModal .btn-close').disabled = false;
      }
    }
  }, [formState.isLoading])


  // Function for resetting the state of the form (useful when triggered on 'modal open')
  const resetState = () => {
    setEmail('');
    setFormState({
      isLoading: false,
      error: false,
      errorMessage: '',
      errorAcknowledged: false,
      showSuccess: false
    });
  }

  let serverError = ''; // holds the raw server error for putting in a hidden paragraph for debugging purposes.
  // Handles the sending of the reset password email.
  const handleSendEmail = async (e) => {
    e.preventDefault();

    // Set loading state to show a loading spinner
    setFormState(prevState => ({...prevState, isLoading: true, errorAcknowledged: true}));

    try {

      // await new Promise((resolve) => {setTimeout(resolve, 2000)})

      const response = await fetch('/api/auth/request-reset-password', {
        method: 'POST',
        body: JSON.stringify({email: email})
      })

      if (!response.ok) {
        throw("Error code: " + response.status);
      }

      // throw("bad error")
    
      // Success. Now set the server error state to false.
      setFormState(prevState => ({...prevState, error: false, showSuccess: true}));


    } catch (error) {
      serverError = JSON.stringify(error);
      setFormState(prevState => ({...prevState, error: true, errorMessage: 'Email failed to send. Please try again.', errorAcknowledged: false}));
    } finally {
      setFormState(prevState => ({...prevState, isLoading: false}));
    }
  }

  return (
    <Modal id='resetPasswordModal' show={props.show} onShow={resetState} onHide={props.handleClose} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title as='h2'>Reset Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack gap={5}>
          <Alert variant="danger" show={(formState.error && formState.errorAcknowledged === false)} onClose={() => setFormState(prevState => ({...prevState, errorAcknowledged: true}))} dismissible>
            <Alert.Heading>Error</Alert.Heading>
            {formState.errorMessage}
          </Alert>
          <p className="d-none hiddenError">{serverError}</p>
          <p>Please enter your email address below, and we will send you an email with instructions for resetting your password.</p>
          <Form>
            <Form.Group className='mb-5' controlId="resetPasswordEmail">
              <Form.Label className="fw-medium">Email Address</Form.Label>
              <Form.Control type="text" onChange={(e) => setEmail(e.target.value)} placeholder="email address" />
            </Form.Group>     

            {formState.showSuccess && <p className="mb-5">Email sent. If you don't receive the email, you can {!email || formState.isLoading ? <span className="fw-medium">resend the email</span> : <a href="" onClick={handleSendEmail}>resend the email</a>}.</p>} 

            <Container fluid className="d-flex gap-4 justify-content-end p-0">
              {formState.showSuccess ?
                <Button variant="gray" onClick={props.handleClose} disabled={formState.isLoading}>
                  Close
                </Button> :
                <Button variant="gray" onClick={() => {props.handleClose(); props.openLogInModal()}} disabled={formState.isLoading}>
                  Back
                </Button>
              }
              {formState.showSuccess ?
                <Button variant="primary" onClick={() => {props.handleClose(); props.openLogInModal()}} disabled={formState.isLoading}>
                  {formState.isLoading ? <div style={{padding: '0rem 1rem'}}><div className="loader"></div><span className="visually-hidden">Loading...</span></div> : 'Return To Log In'}
                </Button> :
                <Button variant="primary" onClick={handleSendEmail} disabled={ !email || formState.isLoading}>
                  {formState.isLoading ? <div style={{padding: '0rem 1rem'}}><div className="loader"></div><span className="visually-hidden">Loading...</span></div> : 'Send Email'}
                </Button>
              }
            </Container>
          </Form>
        </Stack>
      </Modal.Body>
    </Modal>
  )
}

export default ResetPasswordModal