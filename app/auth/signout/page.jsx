'use client'

import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack"
import Container from "react-bootstrap/Container"
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form"
import { useActionState, useState } from "react";
import Link from "next/link";
import { logOut } from "@/lib/actions";

const SignOut = () => {
  
  const [serverError, setServerError] = useState(''); // holds the raw server error for putting in a hidden paragraph for debugging purposes.
  
  // State for whether to show the error banner or not
  const [showError, setShowError] = useState(false)

  // Function for handling the logging out of the user
  const handleFormSubmit = async (prevState) => {    
    try {
      await logOut('/')

      return { ...prevState, status: "SUCCESS"}

    } catch (error) {
      if (error.toString().includes('NEXT_REDIRECT')) {
        throw(error)
      } 
      
      setServerError(JSON.stringify(error));
      setShowError(true);
      return { ...prevState, error: 'Sign out failed. Please try again.', status: "ERROR"}          
    }
  }

  const [formState, formAction, isPending] = useActionState(handleFormSubmit, {error: '', status: 'INITIAL'})

  return (
    <>
      <Alert 
        className="mb-4" 
        variant="danger" 
        aria-live="polite"
        show={(formState.status === "ERROR" && showError)} 
        onClose={() => setShowError(false)} 
        dismissible
      >
        <Alert.Heading>Error</Alert.Heading>
        {formState.error}
      </Alert>
      <div className='bg-white p-50 rounded'>
        <Stack gap={5} className="text-center">
          <h1 className='fs-2'>Log Out</h1>
          <p className="d-none text-break hiddenError">{serverError}</p>
          <p>Are you sure you want to log out of SpanishDex?</p>
          <Form action={formAction}>
            <Container fluid className="d-flex gap-4 justify-content-center p-0">
              { isPending ? 
                <Button variant="gray" disabled={true}>Cancel</Button> 
                : 
                <Link href='/' role='button' className="btn btn-gray">
                  Cancel
                </Link>     
              }       
              <Button variant="danger" type="submit" disabled={isPending}>
                {isPending ? <div style={{padding: '0rem 1rem'}}><div className="loader"></div><span className="visually-hidden">Loading...</span></div> : 'Log Out'}
              </Button>
            </Container>
          </Form>
        </Stack>
      </div>
    </>
  )
}

export default SignOut