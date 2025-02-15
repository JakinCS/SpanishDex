'use client'
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack"
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container"
import IconButton from "@/components/IconButton";
import Alert from "react-bootstrap/Alert";
import { useEffect, useState } from 'react'
import GoogleAuthButton from "@/components/GoogleAuthButton";
import OrSeparator from "@/components/OrSeparator";
import { createAccount, logInWithCredentials, logInWithGoogle } from "@/lib/actions";
import { handlePasswordValidCheck, isEmailValid, isUsernameValid } from "@/lib/utils";

function CreateAccountModal(props) {

  // State for keeping track of password show/hide state
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  }
  const [showPassword2, setShowPassword2] = useState(false);
  const togglePassword2Visibility = () => {
    setShowPassword2(prevState => !prevState);
  }

  // State for keeping track of the state of the form (loading status, errors, successes)
  const [formState, setFormState] = useState({
    isLoading: false,
    loadingType: '',
    serverError: false,
    serverMessage: '',
    errorAcknowledged: false,
    showSuccess: false
  })

  // Use effect hook for disabling the modal close button (when the form is being submitted)
  // This effect hook is necessary because the button code is not accessible in this JSX file.
  useEffect(() => {
    if (document.querySelector('#signUpModal .btn-close') !== null) {
      if (formState.isLoading) {
        document.querySelector('#signUpModal .btn-close').disabled = true;
      } else {
        document.querySelector('#signUpModal .btn-close').disabled = false;
      }
    }
  }, [formState.isLoading])

  // State for storing the state of the form values
  const [formValues, setFormValues] = useState({
    username: {value: '', valid: null, message: null}, 
    email: {value: '', valid: true, message: null},
    password: {value: '', valid: null, errorType: null, message: null},
    password2: {value: '', valid: null, errorType: null, message: null}
  })

  // Functions to update the value of the username and password fields' states
  const updateUsernameValue = (e) => setFormValues((prevState) => ({...prevState, username: {...prevState.username, value: e.target.value}}))
  const updateEmailValue = (e) => setFormValues(prevState => ({...prevState, email: {...prevState.email, value: e.target.value}}))
  const updatePasswordValue = (e) => setFormValues((prevState) => ({...prevState, password: {...prevState.password, value: e.target.value}}))
  const updatePassword2Value = (e) => setFormValues((prevState) => ({...prevState, password2: {...prevState.password2, value: e.target.value}}))
  
  // Function to check and update the validity of the username
  const validateUsername = () => {
    const result = isUsernameValid(formValues.username.value);
    
    setFormValues(prevState => ({...prevState, username: {...prevState.username, valid: result.valid, message: result.message}}));
  }

  // Function to ensure email field contains a valid email
  const validateEmail = () => {
    const result = isEmailValid(formValues.email.value);
    
    setFormValues(prevState => ({...prevState, email: {...prevState.email, valid: result.valid, message: result.message}}))
  }

  // Function for resetting the state of the form (useful when triggered on 'modal open')
  const resetState = () => {
    setFormValues({
      username: {value: '', valid: null, message: null}, 
      email: {value: '', valid: true, message: null},
      password: {value: '', valid: null, message: null},
      password2: {value: '', valid: null, message: null}
    });
    setFormState({
      isLoading: false,
      loadingType: '',
      serverError: false,
      serverMessage: '',
      errorAcknowledged: false,
      showSuccess: false
    });
  }

  // This function handles the logging in with Google logic
  const signUpWithGoogle = async () => {

    // Set loading state to show a loading spinner
    setFormState(prevState => ({...prevState, isLoading: true, loadingType: 'google', errorAcknowledged: true}));

    try {      
      // Run the signIn function to log in with Google
      await logInWithGoogle()

      // Success. Now set the server error state to false.
      setFormState(prevState => ({...prevState, serverError: false}))

    } catch (error) {
      setFormState(prevState => ({...prevState, serverError: true, serverMessage: error.toString(), errorAcknowledged: false}))

    } finally {
      setFormState(prevState => ({...prevState, isLoading: false}));
    }

  }
  
  const [serverError, setServerError] = useState(''); // Holds the raw version of the server error. (stored in a hidden paragraph for debugging purposes)
  // This function handles the logic for creating an account. It runs on the click of the sign up button
  const handleCreateAccount = async () => {
    let bodyToSend = {
      username: formValues.username.value, 
      email: formValues.email.value, 
      password: formValues.password.value,
      password2: formValues.password2.value
    }

    // Firstly, double check that the form is valid beforehand as a safety measure.
    validateUsername();
    validateEmail();
    handlePasswordValidCheck(formValues, setFormValues, 1);
    handlePasswordValidCheck(formValues, setFormValues, 2);
    if (!formValues.username.valid || !formValues.email.valid || !formValues.password.valid || !formValues.password2.valid) return;


    // Set loading state
    setFormState(prevState => ({...prevState, isLoading: true, loadingType: 'reg', errorAcknowledged: true}));

    try {
      const response = await createAccount(bodyToSend.username, bodyToSend.email, bodyToSend.password, bodyToSend.password2)

      if (!response.success) {
        if (response.errorType === "USERNAME_DUPLICATE") {
          setFormValues(prevState => ({...prevState, username: {...prevState.username, valid: false, message: "Please choose a different username"}}))
        } else if (response.errorType === "EMAIL_DUPLICATE") {
          setFormValues(prevState => ({...prevState, email: {...prevState.email, valid: false, message: "Please choose a different email address"}}))
        }

        setFormState(prevState => ({...prevState, serverError: true, serverMessage: response.message, errorAcknowledged: false}))
        return;
      } else {
        setFormState(prevState => ({...prevState, serverError: false, showSuccess: true}))
      }


      // LOG IN the user now
      
      const signInResponse = await logInWithCredentials(bodyToSend.username, bodyToSend.password, {redirect: true, redirectTo: '/dashboard'})

      if (!signInResponse.success) {
        // If the sign in fails, close the modal and open the log in modal
        props.handleClose()
        props.openLogInModal()
      }

    } catch (error) {
      setServerError(error.toString());
      setFormState(prevState => ({...prevState, serverError: true, serverMessage: "Sign up failed. Unexpected error occurred. Please try again.", errorAcknowledged: false}))

    } finally {
      setFormState(prevState => ({ ...prevState, isLoading: false }));
    }    
  }


  return (
    <Modal size='sm' id='signUpModal' className={formState.showSuccess ? 'modal-disabled' : ''} show={props.show} onShow={() => {setShowPassword(false); setShowPassword2(false); resetState()}} onHide={props.handleClose} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title as='h2'>Create Account</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={'modal-success-message ' + (formState.showSuccess ? 'show' : 'hide')}>
          <h2 className="text-success mb-3">Success</h2>
          <p className="fw-medium mb-4">Account created. Logging you in now.</p>
          <div className="loader-dots"></div>
          <span className="visually-hidden">Loading...</span>
        </div>
        <Stack gap={5}>          
          <Alert variant="danger" show={(formState.serverError && formState.errorAcknowledged === false)} onClose={() => setFormState(prevState => ({...prevState, errorAcknowledged: true}))} dismissible>
            <Alert.Heading>Error</Alert.Heading>
            {formState.serverMessage}
          </Alert>
          <p className="d-none text-break hiddenError">{serverError}</p>
          <Form>
            <Form.Group className="mb-20" controlId="createAccountUsername">
              <Form.Label className="fw-medium">Username</Form.Label>
              <Form.Control onBlur={validateUsername} onChange={updateUsernameValue} className={formValues.username.valid === false && 'is-invalid'} type="text" placeholder="username" />
              <Form.Control.Feedback type="invalid">
                {formValues.username.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-20" controlId="createAccountEmail">
              <Form.Label className="fw-medium">Email (optional)</Form.Label>
              <Form.Control onBlur={validateEmail} onChange={updateEmailValue} className={formValues.email.valid === false && 'is-invalid'} type="text" placeholder="email" />
              <Form.Control.Feedback type="invalid">
                {formValues.email.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-20" controlId="createAccountPassword">
              <Form.Label className="fw-medium">Password</Form.Label>
              <Container className="d-flex gap-3 p-0">
                <div className="w-100">
                  <Form.Control type={showPassword ? 'text' : 'password'} placeholder="password" onBlur={() => handlePasswordValidCheck(formValues, setFormValues, 1)} onChange={updatePasswordValue} className={formValues.password.valid === false && 'is-invalid'} />
                </div>
                <div className="d-flex align-items-center">
                  <IconButton variant='light' iconSrc={showPassword ? '/icons/hide.svg' : '/icons/show.svg'} altTag={showPassword ? 'hide icon' : 'show icon'} onClick={togglePasswordVisibility}/>           
                </div>
              </Container>
              <Form.Control.Feedback className={formValues.password.valid === false && 'd-block'} type="invalid">
                {formValues.password.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="createAccountPassword2">
              <Form.Label className="fw-medium">Confirm Password</Form.Label>
              <Container className="d-flex gap-3 p-0">
                <div className="w-100">
                  <Form.Control type={showPassword2 ? 'text' : 'password'} placeholder="password" onBlur={() => handlePasswordValidCheck(formValues, setFormValues, 2)} onChange={updatePassword2Value} className={formValues.password2.valid === false && 'is-invalid'} />
                </div>
                <div className="d-flex align-items-center">
                  <IconButton variant='light' iconSrc={showPassword2 ? '/icons/hide.svg' : '/icons/show.svg'} altTag={showPassword ? 'hide icon' : 'show icon'} onClick={togglePassword2Visibility}/>           
                </div>
              </Container>
              <Form.Control.Feedback className={formValues.password2.valid === false && 'd-block'} type="invalid">
                {formValues.password2.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
          <Button variant="primary" onClick={handleCreateAccount} disabled={!(formValues.username.valid && formValues.email.valid && formValues.password.valid && formValues.password2.valid) || formState.isLoading}>
            {formState.isLoading && formState.loadingType === 'reg' ? <div style={{padding: '0rem 1rem'}}><div className="loader"></div><span className="visually-hidden">Loading...</span></div> : 'Sign Up'}
          </Button>
          <OrSeparator />
          <GoogleAuthButton buttonText='signup' isLoading={formState.isLoading} loadingType={formState.loadingType} onClick={signUpWithGoogle}/>
          <p>Already have an account? {formState.isLoading ? <span className="fw-medium">Log In</span> : <a href="#" onClick={() => {props.handleClose(); props.openLogInModal()}}>Log In</a>}</p>
        </Stack>
      </Modal.Body>
    </Modal>
  );
}

export default CreateAccountModal;
