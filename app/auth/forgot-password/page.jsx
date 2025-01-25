'use client'

import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack"
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import { useState } from "react";
import Link from "next/link";

const ForgotPassword = () => {

  // State for keeping track of the state of the form (loading status, errors, successes)
  const [formState, setFormState] = useState({
    isLoading: false,
    serverError: false,
    serverMessage: '',
    errorAcknowledged: false,
    showSuccess: false
  });

  // Holds the email information
  const [email, setEmail] = useState('');


  const [serverError, setServerError] = useState(''); // holds the raw server error for putting in a hidden paragraph for debugging purposes.
  // Handles the sending of the reset password email.
  const handleSendEmail = async (e) => {
    e.preventDefault();

    // Set loading state to show a loading spinner
    setFormState(prevState => ({...prevState, isLoading: true, errorAcknowledged: true}));

    try {

      const response = await fetch('/api/auth/request-reset-password', {
        method: 'POST',
        body: JSON.stringify({email: email})
      })

      if (!response.ok && response.headers.get('content-type') === 'application/json') {
        const json = await response.json();
        throw(json.error);
      } else if (!response.ok) {
        throw("Error code: " + response.status);
      }
    
      // Success. Now set the server error state to false.
      setFormState(prevState => ({...prevState, error: false, showSuccess: true}));


    } catch (error) {
      setServerError(JSON.stringify(error));
      setFormState(prevState => ({...prevState, error: true, errorMessage: 'Email failed to send. Please try again.', errorAcknowledged: false}));
    } finally {
      setFormState(prevState => ({...prevState, isLoading: false}));
    }
  }


  return (
    <div className='mx-auto mt-50' style={{maxWidth: '31.25rem'}}>
      <Alert variant="danger" show={(formState.serverError && formState.errorAcknowledged === false)} onClose={() => setFormState(prevState => ({...prevState, errorAcknowledged: true}))} dismissible>
        <Alert.Heading>Error</Alert.Heading>
        {formState.serverMessage}
      </Alert>
      <div className='mt-25 bg-white p-50 rounded'>
        <Stack gap={5}>
          <h1 className='fs-2'>Reset Password</h1>
          <p className="d-none text-break hiddenError">{serverError}</p>
          <p>Please enter your email address below, and we&apos;ll send you a link to reset your password.</p>
          <Form>
            <Form.Group className='mb-5' controlId="resetPasswordEmail">
              <Form.Label className="fw-medium">Email Address</Form.Label>
              <Form.Control type="text" onChange={(e) => setEmail(e.target.value)} placeholder="email address" />
            </Form.Group>     

            {formState.showSuccess && <p className="mb-5">Email sent. <br /> Didn&apos;t receive the email? {!email || formState.isLoading ? <span className="fw-medium">Resend Email</span> : <a href="" onClick={handleSendEmail}>Resend Email</a>}</p>} 

            <Container fluid className="d-flex gap-4 justify-content-end p-0">
              {formState.showSuccess ?     

                ( formState.isLoading ? 
                  <>                    
                    <Button variant="gray" disabled={true}>Close</Button>
                    <Button variant="primary" disabled={true}>
                      <div style={{padding: '0rem 1rem'}}><div className="loader"></div><span className="visually-hidden">Loading...</span></div>
                    </Button>                    
                  </> 
                  :
                  <>
                    <Link href='/' role='button' className="btn btn-gray">
                      Close
                    </Link>
                    <Link href='/auth/signin' role='button' className="btn btn-primary">
                        Return To Log In
                    </Link>
                  </>
                )

                :

                ( formState.isLoading ? 
                  <>
                    <Button variant="gray" disabled={true}>Back</Button>
                    <Button variant="primary" onClick={handleSendEmail} disabled={true}>
                      <div style={{padding: '0rem 1rem'}}><div className="loader"></div><span className="visually-hidden">Loading...</span></div>
                    </Button>
                  </>
                  :
                  <>
                    <Link href='/auth/signin' role='button' className="btn btn-gray">
                      Back
                    </Link>
                    <Button variant="primary" onClick={handleSendEmail} disabled={ !email }>
                      Send Email
                    </Button>
                  </>
                )
              }
            </Container>
          </Form>
        </Stack>
      </div>
    </div>
  )
}

export default ForgotPassword