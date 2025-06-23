'use client'
import GoogleAuthButton from "@/components/miscellaneous/GoogleAuthButton";
import OrSeparator from "@/components/miscellaneous/OrSeparator";
import { createAccount, logInWithCredentials, logInWithGoogle } from "@/lib/actions";
import { handlePasswordValidCheck, handlePasswordValidCheck2, isEmailValid, isUsernameValid } from "@/lib/utils";
import { useActionState, useEffect, useState } from 'react';
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Stack from "react-bootstrap/Stack";
import PasswordInput from "../utils/PasswordInput";

function CreateAccountModal(props) {

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

  const updateUsernameAndValidate = (e) => {
    // Include the trim() method to improve the UX. A user may accidentally enter a space before or after their username.
    const result = isUsernameValid(e.target.value.trim());

    setFormValues((prevState) => ({...prevState, username: {...prevState.username, value: e.target.value.trim(), valid: result.valid, message: result.message}}))
  }

  const updateEmailAndValidate = (e) => {
    // Include the trim() method to improve the UX. A user may accidentally enter a space before or after their username.
    const result = isEmailValid(e.target.value.trim());

    setFormValues((prevState) => ({...prevState, email: {...prevState.email, value: e.target.value, valid: result.valid, message: result.message}}))
  }

  const handleEmailBlur = () => {
    setFormValues((prevState) => ({...prevState, email: {...prevState.email, value: prevState.email.value.trim()}}))
  }

  const updatePassword1AndValidate = (e) => {
    const newData = handlePasswordValidCheck2({...formValues.password, value: e.target.value }, formValues.password2, setFormValues, 1);

    setFormValues((prevState) => ({ ...prevState, password: {...prevState.password, ...newData[0]}, password2: {...prevState.password2, ...newData[1]} }))
  }

  const updatePassword2AndValidate = (e) => {
    const newData = handlePasswordValidCheck2({...formValues.password2, value: e.target.value }, formValues.password, setFormValues, 2);

    setFormValues((prevState) => ({ ...prevState, password: {...prevState.password, ...newData[1]}, password2: {...prevState.password2, ...newData[0]} }))
  }
  
  // Function to check and update the validity of the username
  const validateUsername = () => {
    // Include the trim() method to improve the UX. A user may accidentally enter a space before or after their username.
    const result = isUsernameValid(formValues.username.value.trim());
    
    setFormValues(prevState => ({...prevState, username: {...prevState.username, value: prevState.username.value.trim(), valid: result.valid, message: result.message}}));
  }

  // Function to ensure email field contains a valid email
  const validateEmail = () => {
    // Include the trim() method to improve the UX. A user may accidentally enter a space before or after their email.
    const result = isEmailValid(formValues.email.value.trim());
    
    setFormValues(prevState => ({...prevState, email: {...prevState.email, value: prevState.email.value.trim(), valid: result.valid, message: result.message}}))
  }

  // Function for resetting the state of the form (useful when triggered on 'modal open')
  const resetState = () => {
    setFormValues({
      username: {value: '', valid: null, message: null}, 
      email: {value: '', valid: true, message: null},
      password: {value: '', valid: null, message: null},
      password2: {value: '', valid: null, message: null}
    });
    setShowSuccess(false);
    setError({show: false, message: '', hiddenMsg: ''})
  }

  // State for the visibility of the "account created" success message.
  const [showSuccess, setShowSuccess] = useState(false)

  const [error, setError] = useState({show: false, message: '', hiddenMsg: ''})

  // This function is what is run when the user wants to create an account without Google
  const handleSubmitForm1 = async (prevState, fieldValues) => {
    const username = fieldValues.get("username")
    const email = fieldValues.get("email");
    const password1 = fieldValues.get("password1")
    const password2 = fieldValues.get("password2")

    if (!formValues.username.valid || !formValues.email.valid || !formValues.password.valid || !formValues.password2.valid) return;

    return {status: 'SUCCESS'}
    try {
      const response = await createAccount(username, email, password1, password2);

      if (!response.success) {
        // Display an error on the username or email input field if one of them has a specific duplicate error
        if (response.errorType === "USERNAME_DUPLICATE") {
          setFormValues(prevState => ({...prevState, username: {...prevState.username, valid: false, message: "Please choose a different username"}}))
        } else if (response.errorType === "EMAIL_DUPLICATE") {
          setFormValues(prevState => ({...prevState, email: {...prevState.email, valid: false, message: "Please choose a different email address"}}))
        }

        // Set the error state to display an error banner
        setError({show: true, message: response.message, hiddenMsg: response?.error.toString()})

        return {status: "ERROR"};
      } else if (response.success) {

        // Show success message
        setShowSuccess(true);
      }

      // LOG IN the user now

      const signInResponse = await logInWithCredentials(username, password1, { redirectTo: "/dashboard" })

      if (!signInResponse.success) {
        // If the sign in fails, close the modal and open the log in modal
        props.handleClose()
        props.openLogInModal()
      }

      setError((prev) => ({...prev, show: false}))
      return {status: 'SUCCESS'}

    } catch (error) {
      setError({show: true, message: "Sign up failed. Unexpected error occurred. Please try again.", hiddenMsg: error.toString()})
      return {status: 'ERROR'}
    }
  }

  const [form1State, form1Action, form1Pending] = useActionState(handleSubmitForm1, {status: 'INITIAL'})

  // This function is what is run when the user wants to createa an account with Google
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
  // This effect hook is necessary because the button code is not accessible in this JSX file.
  useEffect(() => {
    if (document.querySelector('#signUpModal .btn-close') !== null) {
      if (form1Pending || form2Pending) {
        document.querySelector('#signUpModal .btn-close').disabled = true;
      } else {
        document.querySelector('#signUpModal .btn-close').disabled = false;
      }
    }
  }, [form1Pending, form2Pending])

  const isSubmitDisabled = (
    (!formValues.username.valid || !formValues.email.valid || !formValues.password.valid || !formValues.password2.valid) 
    || form1Pending 
    || form2Pending
  )

  return (
    <Modal size='sm' id='signUpModal' className={showSuccess ? 'modal-disabled' : ''} show={props.show} onExited={() => {resetState()}} onHide={props.handleClose} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title as='h2'>Create Account</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={'modal-success-message ' + (showSuccess ? 'show' : 'hide')} aria-live="polite">
          <h2 className="text-success mb-3">Success</h2>
          <p className="fw-medium mb-4">Account created. Logging you in now.</p>
          <div className="loader-dots"></div>
          <span className="visually-hidden">Loading...</span>
        </div>
        <Stack gap={5}>          
          <Alert 
            variant="danger" 
            aria-live="polite"
            show={(form1State.status === "ERROR" || form2State.status === "ERROR") && !(form1Pending || form2Pending) && error.show} 
            onClose={() => setError((prev) => ({...prev, show: false}))} 
            dismissible
          >
            <Alert.Heading>Error</Alert.Heading>
            {error.message}
          </Alert>
          <p className="d-none text-break hiddenError">{error.hiddenMsg}</p>
          <Form action={form1Action} autoComplete="off">
            <Form.Group className="mb-20" controlId="createAccountUsername">
              <Form.Label className="fw-medium">Username</Form.Label>
              {/* <Form.Control name="username" value={formValues.username.value} onBlur={validateUsername} onChange={updateUsernameValue} className={formValues.username.valid === false && 'is-invalid'} type="text" placeholder="Enter username" /> */}
              <Form.Control 
                name="username" 
                value={formValues.username.value} 
                onChange={updateUsernameAndValidate} 
                className={formValues.username.valid === false && 'is-invalid'} 
                type="text" 
                placeholder="Enter username" 
              />
              <Form.Control.Feedback type="invalid" aria-live="polite">
                {formValues.username.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-20" controlId="createAccountEmail">
              <Form.Label className="fw-medium">Email (optional)</Form.Label>
              {/* <Form.Control 
                name='email' 
                value={formValues.email.value} 
                onBlur={validateEmail} 
                onChange={updateEmailValue} 
                className={formValues.email.valid === false && 'is-invalid'} 
                type="text" 
                placeholder="Enter email" 
              /> */}
              <Form.Control 
                name='email' 
                value={formValues.email.value} 
                onChange={updateEmailAndValidate} 
                onBlur={handleEmailBlur}
                className={formValues.email.valid === false && 'is-invalid'} 
                type="text" 
                placeholder="Enter email" 
              />
              <Form.Control.Feedback type="invalid" aria-live="polite">
                {formValues.email.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-20" controlId="createAccountPassword">
              <Form.Label className="fw-medium">Password</Form.Label>
              {/* <PasswordInput 
                name="password1" 
                value={formValues.password.value} 
                placeholder="Enter password" 
                onBlur={() => handlePasswordValidCheck(formValues, setFormValues, 1)} 
                onChange={updatePasswordValue} 
                className={formValues.password.valid === false && 'is-invalid'}
              /> */}
              <PasswordInput 
                name="password1" 
                value={formValues.password.value} 
                placeholder="Enter password" 
                onChange={updatePassword1AndValidate} 
                className={formValues.password.valid === false && 'is-invalid'}
              />
              <Form.Control.Feedback className={formValues.password.valid === false && 'd-block'} type="invalid" aria-live="polite">
                {formValues.password.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-5" controlId="createAccountPassword2">
              <Form.Label className="fw-medium">Confirm Password</Form.Label>
              {/* <PasswordInput 
                name='password2' 
                value={formValues.password2.value} 
                placeholder="Enter password" 
                onBlur={() => handlePasswordValidCheck(formValues, setFormValues, 2)} 
                onChange={updatePassword2Value} 
                className={formValues.password2.valid === false && 'is-invalid'}
              /> */}
              <PasswordInput 
                name='password2' 
                value={formValues.password2.value} 
                placeholder="Enter password" 
                onChange={updatePassword2AndValidate} 
                className={formValues.password2.valid === false && 'is-invalid'}
              />
              <Form.Control.Feedback className={formValues.password2.valid === false && 'd-block'} type="invalid" aria-live="polite">
                {formValues.password2.message}
              </Form.Control.Feedback>
            </Form.Group>
            <div className="d-flex flex-column">
              <Button variant="primary" type="submit" disabled={isSubmitDisabled}>
                {form1Pending ? <div style={{padding: '0rem 1rem'}}><div className="loader"></div><span className="visually-hidden">Loading...</span></div> : 'Sign Up'}
              </Button>
            </div>
          </Form>
          <OrSeparator />
          <Form action={form2Action} className="d-flex flex-column">
            <GoogleAuthButton type='submit' buttonText='signup' isLoading={form1Pending || form2Pending} hasSpinner={form2Pending} />
          </Form>
          <p>Already have an account? {form1Pending || form2Pending ? <span className="fw-medium">Log In</span> : <a href="#" onClick={(e) => {e.preventDefault(); props.handleClose(); props.openLogInModal()}}>Log In</a>}</p>
        </Stack>
      </Modal.Body>
    </Modal>
  );
}

export default CreateAccountModal;