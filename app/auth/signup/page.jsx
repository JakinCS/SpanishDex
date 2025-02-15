'use client'

import Stack from 'react-bootstrap/Stack';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import IconButton from '@/components/IconButton';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import OrSeparator from '@/components/OrSeparator';
import GoogleAuthButton from '@/components/GoogleAuthButton';
import { createAccount, logInWithCredentials, logInWithGoogle } from '@/lib/actions';
import { isEmailValid, isPasswordValid, isUsernameValid } from '@/lib/utils';


const SignUp = () => {
  
  const router = useRouter();

  // State for keeping track of the state of the form (loading status, errors, successes)
  const [formState, setFormState] = useState({
    isLoading: false,
    loadingType: '',
    serverError: false,
    serverMessage: '',
    errorAcknowledged: false
  })


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
  

  // State for keeping track of password show/hide state
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  }
  const [showPassword2, setShowPassword2] = useState(false);
  const togglePassword2Visibility = () => {
    setShowPassword2(prevState => !prevState);
  }


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

  // This function checks whether the two password fields are match.
  const checkPasswordsMatch = () => {
    if (formValues.password.value != formValues.password2.value) return false;
    return true;    
  }  

  // This function handles the validation of the first password field
  const validatePassword1 = () => {
    const passwordValue = formValues.password.value; // Current value of this password field
    const passwordValid = isPasswordValid(passwordValue);  // Check if this field is valid (besides checking whether it matches other field)

    if (!passwordValid.valid) {
      // If it isn't valid, display an error. No other logic needs to run.
      setFormValues(prevState => ({...prevState, password: {...prevState.password, valid: passwordValid.valid, errorType: 'reg', message: passwordValid.message}}))
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

    if (!passwordValid.valid) {
      // If it isn't valid, display an error. No other logic needs to run.
      setFormValues(prevState => ({...prevState, password2: {...prevState.password2, valid: passwordValid.valid, errorType: 'reg', message: passwordValid.message}}))
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

  // function to clear the form
  const clearForm = () => {
    // Clear the form
    setFormValues({
      username: {value: '', valid: null, message: null}, 
      email: {value: '', valid: true, message: null},
      password: {value: '', valid: null, errorType: null, message: null},
      password2: {value: '', valid: null, errorType: null, message: null}
    })
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

      clearForm();

    } catch (error) {
      setFormState(prevState => ({...prevState, serverError: true, serverMessage: error.toString(), errorAcknowledged: false}))

    } finally {
      setFormState(prevState => ({...prevState, isLoading: false}));
    }

  }
  
  const [serverError, setServerError] = useState(''); // Holds the raw version of the server error. (stored in a hidden paragraph for debugging purposes)
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
    validatePassword1();
    validatePassword2();
    if (!formValues.username.valid || !formValues.email.valid || !formValues.password.valid || !formValues.password2.valid) return;


    // Set loading state
    setFormState(prevState => ({...prevState, isLoading: true, loadingType: 'reg', errorAcknowledged: true}));

    try {
      const response = await createAccount(bodyToSend.username, bodyToSend.email, bodyToSend.password, bodyToSend.password2);

      if (!response.success) {
        // Display an error on the username or email input field if one of them has a specific duplicate error
        if (response.errorType === "USERNAME_DUPLICATE") {
          setFormValues(prevState => ({...prevState, username: {...prevState.username, valid: false, message: "Please choose a different username"}}))
        } else if (response.errorType === "EMAIL_DUPLICATE") {
          setFormValues(prevState => ({...prevState, email: {...prevState.email, valid: false, message: "Please choose a different email address"}}))
        }

        // Set the form state to display an error banner
        setFormState(prevState => ({...prevState, serverError: true, serverMessage: response.message, errorAcknowledged: false}))
        return;
      } else {
        // Success. Now set the server error state to false.
        setFormState(prevState => ({...prevState, serverError: false}))
      }


      // LOG IN the user now

      const signInResponse = await logInWithCredentials(bodyToSend.username, bodyToSend.password, { redirectTo: "/dashboard" })

      clearForm();

      if (!signInResponse.success) {
        // If the sign in fails, redirect to the sign in page
        router.push('/auth/signin')
      }

    } catch (error) {
      setServerError(error.toString())
      setFormState(prevState => ({...prevState, serverError: true, serverMessage: "Sign up failed. Unexpected error occurred. Please try again.", errorAcknowledged: false}))

    } finally {
      setFormState(prevState => ({...prevState, isLoading: false}));
    }    
  }


  return (
    <>
      <Alert className='mb-4' variant="danger" show={(formState.serverError && formState.errorAcknowledged === false)} onClose={() => setFormState(prevState => ({...prevState, errorAcknowledged: true}))} dismissible>
        <Alert.Heading>Error</Alert.Heading>
        {formState.serverMessage}
      </Alert>
      <div className='bg-white p-50 rounded'>
        <Stack gap={5}>        
          <h1 className='fs-2'>Create Account</h1>
          <p className="d-none text-break hiddenError">{serverError}</p>
          <Form>
            <Form.Group className="mb-20" controlId="createAccountUsername">
              <Form.Label className="fw-medium">Username</Form.Label>
              <Form.Control value={formValues.username.value} onBlur={validateUsername} onChange={updateUsernameValue} className={formValues.username.valid === false && 'is-invalid'} type="text" placeholder="username" />
              <Form.Control.Feedback type="invalid">
                {formValues.username.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-20" controlId="createAccountEmail">
              <Form.Label className="fw-medium">Email (optional)</Form.Label>
              <Form.Control value={formValues.email.value} onBlur={validateEmail} onChange={updateEmailValue} className={formValues.email.valid === false && 'is-invalid'} type="text" placeholder="email" />
              <Form.Control.Feedback type="invalid">
                {formValues.email.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-20" controlId="createAccountPassword">
              <Form.Label className="fw-medium">Password</Form.Label>
              <Container className="d-flex gap-3 p-0">
                <div className="w-100">
                  <Form.Control value={formValues.password.value} type={showPassword ? 'text' : 'password'} placeholder="password" onBlur={validatePassword1} onChange={updatePasswordValue} className={formValues.password.valid === false && 'is-invalid'} />
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
                  <Form.Control value={formValues.password2.value} type={showPassword2 ? 'text' : 'password'} placeholder="password" onBlur={validatePassword2} onChange={updatePassword2Value} className={formValues.password2.valid === false && 'is-invalid'} />
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
          <p>Already have an account? {formState.isLoading ? <span className="fw-medium">Log In</span> : <Link href='/auth/signin'>Log In</Link>}</p>
        </Stack>
      </div>
    </>
  )
}

export default SignUp