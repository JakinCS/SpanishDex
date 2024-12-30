'use client'
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack"
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container"
import IconButton from "../IconButton";
import Alert from "react-bootstrap/Alert";
import { useEffect, useState } from 'react'

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
    email: {value: '', valid: null, message: null},
    password: {value: '', valid: null, errorType: null, message: null},
    password2: {value: '', valid: null, errorType: null, message: null}
  })

  // Functions to update the value of the username and password fields' states
  const updateUsernameValue = (e) => setFormValues((prevState) => ({...prevState, username: {...prevState.username, value: e.target.value}}))
  const updateEmailValue = (e) => setFormValues(prevState => ({...prevState, email: {...prevState.email, value: e.target.value}}))
  const updatePasswordValue = (e) => setFormValues((prevState) => ({...prevState, password: {...prevState.password, value: e.target.value}}))
  const updatePassword2Value = (e) => setFormValues((prevState) => ({...prevState, password2: {...prevState.password2, value: e.target.value}}))
  
  // Function to check and update the validity of the username
  /* 
    Min Length: 2,   Max Length: 25,   Characters: numbers, letters, underscores
    General RegEx: no spaces before, in-between, or afterwards  
  */
  const validateUsername = () => {
    const currUsername = formValues.username.value;

    let isValid = true;
    let message = '';

    if (currUsername.trim().length === 0) {
      isValid = false;
      message = 'Username is required'
    } else if (currUsername.length < 2) {
      isValid = false;
      message = 'The username must be at least 2 characters'
    } else if (currUsername.length > 25) {
      isValid = false;
      message = 'The username cannot be longer than 25 characters'
    } else if (/ +/.test(currUsername)) {
      isValid = false;
      message = 'Please do not use spaces in your username'
    } else if (/\W+/.test(currUsername)) {
      isValid = false;
      message = 'Please only use letters, numbers and underscores'
    } else if (!/^\w+$/.test(currUsername)) {
      isValid = false;
      message = 'Username is invalid'
    }
    
    setFormValues(prevState => ({...prevState, username: {...prevState.username, valid: isValid, message: message}}));
  }

  // Function to ensure email field contains a valid email
  const validateEmail = () => {
    const currEmail = formValues.email.value;

    let regexExpression = /^([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@([0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?(\.[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?)*|\[((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|IPv6:((((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){6}|::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){5}|[0-9A-Fa-f]{0,4}::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){4}|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):)?(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){3}|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,2}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){2}|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,3}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,4}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::)((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3})|(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3})|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,5}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3})|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,6}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::)|(?!IPv6:)[0-9A-Za-z-]*[0-9A-Za-z]:[!-Z^-~]+)])$/
  
    if (currEmail == '' || regexExpression.test(currEmail)) {
      setFormValues(prevState => ({...prevState, email: {...prevState.email, valid: true}}))
    } else {
      setFormValues(prevState => ({...prevState, email: {...prevState.email, valid: false, message: 'Invalid email address'}}))
    }
  }

  // Function to check whether a password string is valid
  /* 
    Min Length: 6
    Max Length: 1024
    Characters: any
  */
  const isPasswordValid = (passwordStr) => {
    let isValid = true;
    let message = '';

    if (passwordStr.length === 0) {
      isValid = false;
      message = 'Password is required'
    } else if (passwordStr.length < 6) {
      isValid = false;
      message = 'Password must be at least 6 characters'
    } else if (passwordStr.length > 1024) {
      isValid = false;
      message = 'Password length cannot exceed 1024 characters'
    }

    return {isValid, message}
  }

  // This function checks whether the two password fields are match.
  // Also, this function will update the state based on the results.
  const checkPasswordsMatch = () => {
    if (formValues.password.value != formValues.password2.value) return false;
    return true;    
  }  

  // This function handles the validation of the first password field
  const validatePassword1 = () => {
    const passwordValue = formValues.password.value; // Current value of this password field
    const passwordValid = isPasswordValid(passwordValue);  // Check if this field is valid (besides checking whether it matches other field)

    if (!passwordValid.isValid) {
      // If it isn't valid, display an error. No other logic needs to run.
      setFormValues(prevState => ({...prevState, password: {...prevState.password, valid: passwordValid.isValid, errorType: 'reg', message: passwordValid.message}}))
      return;
    }

    /* At this point, this field is otherwise valid. 
    But check to see if the two fields are matching in value */
    const matchesOtherField = checkPasswordsMatch();

    /* If the fields match, don't display a 'matching error' and set the state to valid for this field. 
      Also, even if the fields DON'T match, a 'matching error' isn't necessary if:
       1. The other field is displaying a different error 
       2. The other field has not be touched yet */
    if (matchesOtherField || (!formValues.password2.valid && formValues.password2.errorType === 'reg') || formValues.password2.valid === null) {
      // Remove errors for the this field
      setFormValues(prevState => ({...prevState, password: {...prevState.password, valid: true, errorType: ''}}))

      // If the other field currently displays a "matching error", remove it because the fields now match.
      if (!formValues.password2.valid && formValues.password2.errorType === 'matching') {
        setFormValues(prevState => ({...prevState, password2: {...prevState.password2, valid: true, errorType: ''}}))
      }
    } else { // Otherwise, this field needs a 'matching error'. So display one.

      setFormValues(prevState => ({...prevState, password: {...prevState.password, valid: false, errorType: 'matching', message: 'Passwords must match'}}))

      // If the other field is current showing to be valid, it needs a matching error too.
      if (formValues.password2.valid) {
        setFormValues(prevState => ({...prevState, password2: {...prevState.password2, valid: false, errorType: 'matching', message: 'Passwords must match'}}))
      }
    }
  }
  
  // This function handles the validation of the second password field
  const validatePassword2 = () => {
    const passwordValue = formValues.password2.value; // Current value of this password field
    const passwordValid = isPasswordValid(passwordValue);  // Check if this field is valid (besides checking whether it matches other field)

    if (!passwordValid.isValid) {
      // If it isn't valid, display an error. No other logic needs to run.
      setFormValues(prevState => ({...prevState, password2: {...prevState.password2, valid: passwordValid.isValid, errorType: 'reg', message: passwordValid.message}}))
      return;
    }

    /* At this point, this field is otherwise valid. 
    But check to see if the two fields are matching in value */
    const matchesOtherField = checkPasswordsMatch();

    /* If the fields match, don't display a 'matching error' and set the state to valid for this field. 
      Also, even if the fields DON'T match, a 'matching error' isn't necessary if:
       1. The other field is displaying a different error 
       2. The other field has not be touched yet */
    if (matchesOtherField || (!formValues.password.valid && formValues.password.errorType === 'reg') || formValues.password.valid === null) {
      // Remove errors for the this field
      setFormValues(prevState => ({...prevState, password2: {...prevState.password2, valid: true, errorType: ''}}))

      // If the other field currently displays a "matching error", remove it because the fields now match.
      if (!formValues.password.valid && formValues.password.errorType === 'matching') {
        setFormValues(prevState => ({...prevState, password: {...prevState.password, valid: true, errorType: ''}}))
      }
    } else { // Otherwise, this field needs a 'matching error'. So display one.

      setFormValues(prevState => ({...prevState, password2: {...prevState.password2, valid: false, errorType: 'matching', message: 'Passwords must match'}}))

      // If the other field is current showing to be valid, it needs a matching error too.
      if (formValues.password.valid) {
        setFormValues(prevState => ({...prevState, password: {...prevState.password, valid: false, errorType: 'matching', message: 'Passwords must match'}}))
      }
    }
  }

  // Function for resetting the state of the form (useful when triggered on 'modal open')
  const resetState = () => {
    setFormValues({
      username: {value: '', valid: null, message: null}, 
      email: {value: '', valid: null, message: null},
      password: {value: '', valid: null, message: null},
      password2: {value: '', valid: null, message: null}
    });
    setFormState({
      isLoading: false,
      serverError: false,
      serverMessage: '',
      errorAcknowledged: false,
      showSuccess: false
    });
  }

  const createAccount = async () => {
    let bodyToSend = {
      username: formValues.username.value, 
      email: formValues.email.value, 
      password: formValues.password.value,
      password2: formValues.password2.value
    }

    // Firstly, double check that the form is valid beforehand as a safety measure.
    validateUsername();
    validateEmail();
    validatePassword1();
    validatePassword2();
    if (!formValues.username.valid || !formValues.email.valid || !formValues.password.valid || !formValues.password2.valid) return;


    // Set loading state
    setFormState(prevState => ({...prevState, isLoading: true, errorAcknowledged: true}));

    let responseStatus; // Holds the status of the response

    try {
      // const response = await fetch('/api/auth/signup')
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify(bodyToSend)
      })

      // Set the reponse status for error handling
      responseStatus = response.status;

      // Check if the response is ok. If it is not, AND if the response is in JSON, throw the error within the JSON object.
      if (!response.ok && response.headers.get('content-type') === 'application/json') {
        const json = await response.json();
        throw(json.error);
      } else if (!response.ok) { // Otherwise, throw a generic error message based off the response status.
        throw('Sign up failed. Error: ' + response.status + '. Please try again later.');
      }

      const json = await response.json();
      
      // Success. Now set the server error state to false.
      setFormState(prevState => ({...prevState, serverError: false, showSuccess: true}))

      const closeModal = setTimeout(props.handleClose, 2000);

    } catch (error) {
      console.log('error caught: ' + error);
      setFormState(prevState => ({...prevState, serverError: true, serverMessage: error, errorAcknowledged: false}))

      // If the error is a 409, set the error state for those form fields
      if (responseStatus === 409) {
        if (error.search(/username/i) > -1) {
          setFormValues(prevState => ({...prevState, username: {...prevState.username, valid: false, message: 'This username is already taken. Please choose another username'}}))
        } else if (error.search(/email/i) > -1) {
          setFormValues(prevState => ({...prevState, email: {...prevState.email, valid: false, message: 'This email is already used by another account. Please choose another one'}}))
        }
      }
    } finally {
      setFormState(prevState => ({...prevState, isLoading: false}));
    }    
  }


  return (
    <Modal id='signUpModal' className={formState.showSuccess ? 'modal-disabled' : ''} show={props.show} onShow={() => {setShowPassword(false); setShowPassword2(false); resetState()}} onHide={props.handleClose} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title as='h2'>Create Account</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={'modal-success-message ' + (formState.showSuccess ? 'show' : 'hide')}>
          <h2 className="text-success mb-3">Success</h2>
          <p className="fw-medium">Your account has been created</p>
        </div>
        <Stack gap={5}>          
          <Alert variant="danger" show={(formState.serverError && formState.errorAcknowledged === false)} onClose={() => setFormState(prevState => ({...prevState, errorAcknowledged: true}))} dismissible>
            <Alert.Heading>Error</Alert.Heading>
            {formState.serverMessage}
          </Alert>
          <p>Sign up for a SpanishDex account.</p>
          <Form>
            <Form.Group className="mb-5" controlId="createAccountUsername">
              <Form.Label className="fw-medium">Username</Form.Label>
              <Form.Control onBlur={validateUsername} onChange={updateUsernameValue} className={formValues.username.valid === false && 'is-invalid'} type="text" placeholder="username" />
              <Form.Control.Feedback type="invalid">
                {formValues.username.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-5" controlId="createAccountEmail">
              <Form.Label className="fw-medium">Email (optional)</Form.Label>
              <Form.Control onBlur={validateEmail} onChange={updateEmailValue} className={formValues.email.valid === false && 'is-invalid'} type="text" placeholder="email" />
              <Form.Control.Feedback type="invalid">
                {formValues.email.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-5" controlId="createAccountPassword">
              <Form.Label className="fw-medium">Password</Form.Label>
              <Container className="d-flex gap-3 p-0">
                <div className="w-100">
                  <Form.Control type={showPassword ? 'text' : 'password'} placeholder="password" onBlur={validatePassword1} onChange={updatePasswordValue} className={formValues.password.valid === false && 'is-invalid'} />
                </div>
                <div className="d-flex align-items-center">
                  <IconButton variant='light' iconSrc={showPassword ? '/icons/hide.svg' : '/icons/show.svg'} onClick={togglePasswordVisibility}/>           
                </div>
              </Container>
              <Form.Control.Feedback className={formValues.password.valid === false && 'd-block'} type="invalid">
                {formValues.password.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-5" controlId="createAccountPassword2">
              <Form.Label className="fw-medium">Confirm Password</Form.Label>
              <Container className="d-flex gap-3 p-0">
                <div className="w-100">
                  <Form.Control type={showPassword2 ? 'text' : 'password'} placeholder="password" onBlur={validatePassword2} onChange={updatePassword2Value} className={formValues.password2.valid === false && 'is-invalid'} />
                </div>
                <div className="d-flex align-items-center">
                  <IconButton variant='light' iconSrc={showPassword2 ? '/icons/hide.svg' : '/icons/show.svg'} onClick={togglePassword2Visibility}/>           
                </div>
              </Container>
              <Form.Control.Feedback className={formValues.password2.valid === false && 'd-block'} type="invalid">
                {formValues.password2.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Container fluid className="d-flex gap-4 justify-content-end p-0">
              <Button variant="gray" onClick={props.handleClose} disabled={formState.isLoading}>
                Cancel
              </Button>
              <Button variant="primary" onClick={createAccount} disabled={!(formValues.username.valid && formValues.email.valid && formValues.password.valid && formValues.password2.valid) || formState.isLoading}>
                {formState.isLoading ? <div style={{padding: '0rem 1rem'}}><div className="loader"></div><span className="visually-hidden">Loading...</span></div> : 'Sign Up'}
              </Button>
            </Container>
          </Form>
          <p>Already have an account? <a href="#" onClick={() => {props.handleClose(); props.openLogInModal()}}>Log In</a></p>
        </Stack>
      </Modal.Body>
    </Modal>
  );
}

export default CreateAccountModal;
