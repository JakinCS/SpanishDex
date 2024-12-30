'use client'
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack"
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container"
import Alert from "react-bootstrap/Alert";
import IconButton from "../IconButton";
import { useEffect, useState } from "react";
import { signIn } from 'next-auth/react';

function LogInModal(props) {

  // State for the status of the show/hide password button
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  }

  // State for keeping track of the state of the form (loading status, errors, successes)
  const [formState, setFormState] = useState({
    isLoading: false,
    serverError: false,
    serverMessage: '',
    errorAcknowledged: false,
    showSuccess: false
  })

  // Use effect hook for disabling the modal close button (when the form is being submitted)
  // This effect hook is necessary because the button code is not accessible in this JSX file.
  useEffect(() => {
    if (document.querySelector('#logInModal .btn-close') !== null) {
      if (formState.isLoading) {
        document.querySelector('#logInModal .btn-close').disabled = true;
      } else {
        document.querySelector('#logInModal .btn-close').disabled = false;
      }
    }
  }, [formState.isLoading])

  // State for storing the validity of the form
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
    setFormValues({
      username: {value: '', valid: null}, 
      password: {value: '', valid: null}
    });
    setFormState({
      isLoading: false,
      serverError: false,
      serverMessage: '',
      errorAcknowledged: false,
      showSuccess: false
    });
  }


  // Function for handling the logging in of the user.
  const logIn = async () => {

    // Firstly, double check that the form is valid beforehand as a safety measure.
    validateUsername();
    validatePassword();
    if (!formValues.username.valid || !formValues.password.valid) return;

    // Store the object that will be sent to the api
    let bodyToSend = {
      username: formValues.username.value,
      password: formValues.password.value
    }

    console.log(bodyToSend)

    // Set loading state to show a loading spinner
    setFormState(prevState => ({...prevState, isLoading: true, errorAcknowledged: true}));

    let responseStatus; // Holds the status of the response

    try {

      // await new Promise(resolve => setTimeout(resolve, 5000));

      const response = await signIn('credentials', {
        username: bodyToSend.username,
        password: bodyToSend.password,
        redirect: false,
      })

      console.log(response);

      let responseStatus = response.status;

      if (!response.ok) {
        if (responseStatus === 401) {
          throw('Log in failed. Incorrect username or password. Please try again.');
        } else {
          throw('Log in failed. Error: ' + response.status + '. Please try again later.')
        }
      }
      
      // Success. Now set the server error state to false.
      setFormState(prevState => ({...prevState, serverError: false, showSuccess: true}))

      const closeModal = setTimeout(()=>{setFormState(prevState => ({...prevState, showSuccess: false}))}, 2000);
      // const closeModal = setTimeout(props.handleClose, 2000);

    } catch (error) {
      console.log('error caught: ' + error);
      setFormState(prevState => ({...prevState, serverError: true, serverMessage: error, errorAcknowledged: false}))

    } finally {
      setFormState(prevState => ({...prevState, isLoading: false}));
    }
  }

  return (
    <Modal id='logInModal' className={formState.showSuccess ? 'modal-disabled' : ''} show={props.show} onShow={() => {setShowPassword(false); resetState()}} onHide={props.handleClose} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title as='h2'>Log In</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={'modal-success-message ' + (formState.showSuccess ? 'show' : 'hide')}>
          <h2 className="text-success mb-3">Success</h2>
          <p className="fw-medium">You are now logged in</p>
        </div>
        <Stack gap={5}>
          <Alert variant="danger" show={(formState.serverError && formState.errorAcknowledged === false)} onClose={() => setFormState(prevState => ({...prevState, errorAcknowledged: true}))} dismissible>
            <Alert.Heading>Error</Alert.Heading>
            {formState.serverMessage}
          </Alert>
          <p>Log in to SpanishDex with your existing account.</p>
          <Form>
            <Form.Group className="mb-5" controlId="logInUsername">
              <Form.Label className="fw-medium">Username or Email</Form.Label>
              <Form.Control onBlur={validateUsername} onChange={updateUsernameValue} className={formValues.username.valid === false && 'is-invalid'} type="text" placeholder="username or email" required/>
              <Form.Control.Feedback type="invalid">
                Username is required
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-5" controlId="logInPassword">
              <Form.Label className="fw-medium">Password</Form.Label>
              <Container className="d-flex gap-3 p-0">
                <div className="w-100">
                  <Form.Control type={showPassword ? 'text' : 'password'} onBlur={validatePassword} onChange={updatePasswordValue} className={formValues.password.valid === false && 'is-invalid'} placeholder="password" required/>
                </div>
                <div className="d-flex align-items-center">
                  <IconButton variant='light' iconSrc={showPassword ? '/icons/hide.svg' : '/icons/show.svg'} onClick={togglePasswordVisibility}/>           
                </div>
              </Container>    
              <Form.Control.Feedback className={formValues.password.valid === false && 'd-block'} type="invalid">
                Password is required
              </Form.Control.Feedback>
              <p style={{marginTop: '0.3125rem', textAlign: 'right'}}>
                <a href="#" onClick={() => {props.handleClose(); props.openResetPasswordModal()}}>Forgot Password?</a>
              </p>
            </Form.Group>
            <Container fluid className="d-flex gap-4 justify-content-end p-0">
              <Button variant="gray" onClick={props.handleClose} disabled={formState.isLoading}>
                Cancel
              </Button>
              <Button variant="primary" onClick={logIn} disabled={!(formValues.username.valid && formValues.password.valid) || formState.isLoading}>
                {formState.isLoading ? <div style={{padding: '0rem 1rem'}}><div className="loader"></div><span className="visually-hidden">Loading...</span></div> : 'Log In'}
              </Button>
            </Container>
          </Form>
          <p>Don’t have an account? <a href='#' onClick={() => {props.handleClose(); props.openSignUpModal()}}>Sign Up</a></p>
        </Stack>
      </Modal.Body>
    </Modal>
  );
}

export default LogInModal;
