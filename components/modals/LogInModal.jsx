'use client'
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack"
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import GoogleAuthButton from "@/components/GoogleAuthButton";
import OrSeparator from "@/components/OrSeparator";
import { logInWithCredentials, logInWithGoogle } from "@/lib/actions";
import PasswordInput from "../PasswordInput";

function LogInModal(props) {
  const router = useRouter();

  // State for storing the values of the form
  const [formValues, setFormValues] = useState({
    username: {value: '', valid: null},
    password: {value: '', valid: null}
  })

  const updateUsernameValue = (e) => setFormValues(prevState => ({...prevState, username: {...prevState.username, value: e.target.value}}))
  const updatePasswordValue = (e) => setFormValues(prevState => ({...prevState, password: {...prevState.password, value: e.target.value}}))
  

  // Function to check and update the validity of the username/email (can't be blank)
  const validateUsername = () => {
    const currUsername = formValues.username.value;
    
    let isValid = true;

    if (currUsername.trim().length === 0) {
      isValid = false;
    }

    setFormValues(prevState => ({...prevState, username: {...prevState.username, valid: isValid}}))
  }

  // Function to check and update the validity of the password (can't be blank)
  const validatePassword = () => {
    const currPassword = formValues.password.value;

    let isValid = true;

    if (currPassword.trim().length === 0) {
      isValid = false;
    }

    setFormValues(prevState => ({...prevState, password: {...prevState.password, valid: isValid}}))
  }

  // Function for resetting the state of the form (useful when triggered on 'modal open')
  const resetState = () => {
    setError(prev => ({...prev, show: false}))
    setFormValues({
      username: {value: '', valid: null}, 
      password: {value: '', valid: null}
    });
  }


  const [error, setError] = useState({show: false, message: '', hiddenMsg: ''})
  
  // Function to control the login functionality for the form on submit.
  const handleSubmitForm1 = async (prevState, fieldValues) => {
    const username = fieldValues.get("username");
    const password = fieldValues.get("password");
    
    try {
      const response = await logInWithCredentials(username, password)

      if (!response.success) {

        setError({show: true, message: response.message, hiddenMsg: response?.error.toString()})
        return {status: "ERROR"}
      } else if (response.success) {
        setError((prev) => ({...prev, show: false}))

        // Redirect to the dashboard
        router.push('/dashboard')

        return {status: 'SUCCESS'} 
      }
  
    } catch (error) {
      setError({show: true, message: "Sign in failed. Unexpected error occurred.", hiddenMsg: error.toString()})
      return {status: 'ERROR'}
    }
  }

  const [form1State, form1Action, form1Pending] = useActionState(handleSubmitForm1, {status: "INITIAL"})

  // This function handles the submitting of the form for logging in with Google  
  const handleSubmitForm2 = async (prevState) => {    
    try {
      // Run the signIn function to log in with Google
      await logInWithGoogle();

      setError((prev) => ({...prev, show: false}))
      return {status: 'SUCCESS'} 
  
    } catch (error) {
      setError({show: true, message: "Sign in failed. Unexpected error occurred.", hiddenMsg: error.toString()})
      return {status: 'ERROR'}
    }
  }

  const [form2State, form2Action, form2Pending] = useActionState(handleSubmitForm2, {status: 'INITIAL'})

  // Use effect hook for disabling the modal close button (when the form is being submitted)
  // This effect hook is necessary because the button code is not directly contained in this JSX file.
  useEffect(() => {
    if (document.querySelector('#logInModal .btn-close') !== null) {
      if (form1Pending || form2Pending) {
        document.querySelector('#logInModal .btn-close').disabled = true;
      } else {
        document.querySelector('#logInModal .btn-close').disabled = false;
      }
    }
  }, [form1Pending, form2Pending])


  return (
    <Modal size='sm' id='logInModal' className={(form1State.status === "SUCCESS" || form2State.status === "SUCCESS") ? 'modal-disabled' : ''} show={props.show} onExited={() => {resetState()}} onHide={props.handleClose} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title as='h2'>Log In</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={'modal-success-message ' + ((form1State.status === "SUCCESS" || form2State.status === "SUCCESS") ? 'show' : 'hide')}>
          <h2 className="text-success mb-3">Success</h2>
          <p className="fw-medium">You are now logged in</p>
        </div>
        <Stack gap={5}>
          <Alert variant="danger" show={(form1State.status === "ERROR" || form2State.status === "ERROR") && !(form1Pending || form2Pending) && error.show} onClose={() => setError((prev) => ({...prev, show: false}))} dismissible>
            <Alert.Heading>Error</Alert.Heading>
            {error.message}
          </Alert>
          <p className="d-none text-break hiddenError">{error.hiddenMsg}</p>
          <Form action={form1Action}>
            <Stack gap={5}>
              <div>
                <Form.Group className="mb-20" controlId="logInUsername">
                  <Form.Label className="fw-medium">Username or Email</Form.Label>
                  <Form.Control name="username" value={formValues.username.value} onBlur={validateUsername} onChange={updateUsernameValue} className={formValues.username.valid === false && 'is-invalid'} type="text" placeholder="username or email" required/>
                  <Form.Control.Feedback type="invalid">
                    Username is required
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="logInPassword">
                  <Form.Label className="fw-medium">Password</Form.Label>
                  <PasswordInput name="password" value={formValues.password.value} onBlur={validatePassword} onChange={updatePasswordValue} className={formValues.password.valid === false && 'is-invalid'} placeholder="password" required/>
                  <Form.Control.Feedback className={formValues.password.valid === false && 'd-block'} type="invalid">
                    Password is required
                  </Form.Control.Feedback>
                  <p style={{marginTop: '0.3125rem', textAlign: 'right'}}>
                    { form1Pending || form2Pending ? 
                      <span className="fw-medium">Forgot Password?</span> :
                      <a href="#" onClick={(e) => {e.preventDefault(); props.handleClose(); props.openResetPasswordModal()}}>Forgot Password?</a>
                    }
                  </p>
                </Form.Group>
              </div>        
              <Button variant="primary" type="submit" disabled={!(formValues.username.valid && formValues.password.valid) || form1Pending || form2Pending}>
                {form1Pending ? <div style={{padding: '0rem 1rem'}}><div className="loader"></div><span className="visually-hidden">Loading...</span></div> : 'Log In'}
              </Button>  
            </Stack>              
          </Form>
          <OrSeparator />
          <Form action={form2Action} className='d-flex flex-column'>
            <GoogleAuthButton type="submit" buttonText='signin' isLoading={form1Pending || form2Pending} hasSpinner={form2Pending} />
          </Form>
          <p>Don’t have an account? {form1Pending || form2Pending ? <span className="fw-medium">Sign Up</span> : <a href='#' onClick={(e) => {e.preventDefault(); props.handleClose(); props.openSignUpModal()}}>Sign Up</a>}</p>
        </Stack>
      </Modal.Body>
    </Modal>
  );
}

export default LogInModal;