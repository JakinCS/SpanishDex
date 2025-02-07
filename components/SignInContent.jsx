'use client'

import Stack from 'react-bootstrap/Stack';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import IconButton from '@/components/IconButton';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import GoogleAuthButton from '@/components/GoogleAuthButton';
import OrSeparator from '@/components/OrSeparator';


const SignInContent = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

  const router = useRouter();

  // State for keeping track of the state of the form (loading status, errors, successes)
  const [formState, setFormState] = useState({
    isLoading: false,
    loadingType: '',
    serverError: false,
    serverMessage: '',
    errorAcknowledged: false
  })

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

  // State for the status of the show/hide password button
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  }

  // This function resets the form values (clears the form)
  const clearForm = () => {
    setFormValues({
      username: {value: '', valid: null},
      password: {value: '', valid: null}
    })
  } 

  // This function handles the logging in with Google logic
  const logInWithGoogle = async () => {

    // Set loading state to show a loading spinner
    setFormState(prevState => ({...prevState, isLoading: true, loadingType: 'google', errorAcknowledged: true}));

    try {      
      // Run the signIn function to log in with Google
      await signIn('google', {redirectTo: '/dashboard'})

      // Success. Now set the server error state to false.
      setFormState(prevState => ({...prevState, serverError: false}))

      clearForm();

    } catch (error) {
      setFormState(prevState => ({...prevState, serverError: true, serverMessage: error.toString(), errorAcknowledged: false}))

    } finally {
      setFormState(prevState => ({...prevState, isLoading: false}));
    }

  }

  // Function to control the login functionality for the form on submit.
  const logIn = async () => {

    // Firstly, double check that the form is valid beforehand as a safety measure.
    validateUsername();
    validatePassword();
    if (!formValues.username.valid || !formValues.password.valid) return;

    // Set loading state to show a loading spinner
    setFormState(prevState => ({...prevState, isLoading: true, loadingType: 'reg', errorAcknowledged: true}));

    try {

      // const response = await signIn('google')
      const response = await signIn('credentials', {
        username: formValues.username.value,
        password: formValues.password.value,
        redirect: false,
        redirectTo: callbackUrl
      })

      if (response) {
        if (response.error === 'CredentialsSignin') {
          throw('Log in failed. Incorrect username or password. Please try again.');
        }
        
        if (!response.ok) {
          throw('Log in failed. Error: ' + response.status + '. Please try again later.')
        }
      }   
      
      // Success. Now set the server error state to false.
      setFormState(prevState => ({...prevState, serverError: false}))

      clearForm();

      // Redirect to the dashboard
      router.push(callbackUrl)

    } catch (error) {
      setFormState(prevState => ({...prevState, serverError: true, serverMessage: error.toString(), errorAcknowledged: false}))

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
          <h1 className='fs-2'>Log In</h1>
          <Form>
            <Form.Group className="mb-20" controlId="logInUsername">
              <Form.Label className="fw-medium">Username or Email</Form.Label>
              <Form.Control value={formValues.username.value} onBlur={validateUsername} onChange={updateUsernameValue} className={formValues.username.valid === false && 'is-invalid'} type="text" placeholder="username or email" required/>
              <Form.Control.Feedback type="invalid">
                Username is required
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="logInPassword">
              <Form.Label className="fw-medium">Password</Form.Label>
              <Container className="d-flex gap-3 p-0">
                <div className="w-100">
                  <Form.Control value={formValues.password.value} type={showPassword ? 'text' : 'password'} onBlur={validatePassword} onChange={updatePasswordValue} className={formValues.password.valid === false && 'is-invalid'} placeholder="password" required/>
                </div>
                <div className="d-flex align-items-center">  
                  <IconButton variant='light' iconSrc={showPassword ? '/icons/hide.svg' : '/icons/show.svg'} onClick={togglePasswordVisibility}/>           
                </div>
              </Container>    
              <Form.Control.Feedback className={formValues.password.valid === false && 'd-block'} type="invalid">
                Password is required
              </Form.Control.Feedback>
              <p style={{marginTop: '0.3125rem', textAlign: 'right'}}>
                { formState.isLoading ? 
                  <span className="fw-medium">Forgot Password?</span> :
                  <Link href='/auth/forgot-password'>Forgot Password?</Link>
                }
              </p>
            </Form.Group>
          </Form>          
          <Button variant="primary" onClick={logIn} disabled={!(formValues.username.valid && formValues.password.valid) || formState.isLoading}>
            {formState.isLoading && formState.loadingType === 'reg' ? <div style={{padding: '0rem 1rem'}}><div className="loader"></div><span className="visually-hidden">Loading...</span></div> : 'Log In'}
          </Button>
          <OrSeparator />
          <GoogleAuthButton buttonText='signin' isLoading={formState.isLoading} loadingType={formState.loadingType} onClick={logInWithGoogle}/>
          <p>Don’t have an account? {formState.isLoading ? <span className="fw-medium">Sign Up</span> : <Link href='/auth/signup'>Sign Up</Link>}</p>
        </Stack>
      </div>
    </>
  )
}

export default SignInContent;