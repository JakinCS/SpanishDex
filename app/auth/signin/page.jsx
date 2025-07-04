'use client';

import Stack from 'react-bootstrap/Stack';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useActionState, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import GoogleAuthButton from '@/components/miscellaneous/GoogleAuthButton';
import OrSeparator from '@/components/miscellaneous/OrSeparator';
import { logInWithCredentials, logInWithGoogle } from '@/lib/actions';
import PasswordInput from '@/components/utils/PasswordInput';

const SignIn = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

  // State for storing the validity of the form
  const [formValues, setFormValues] = useState({
    username: {value: '', valid: null},
    password: {value: '', valid: null}
  })

  const updateUsernameAndValidate = (e) => {
    let isValid = true;

    if (e.target.value.trim().length === 0) {
      isValid = false;
    }

    setFormValues((prevState) => ({...prevState, username: {...prevState.username, value: e.target.value, valid: isValid}}))
  }
  
  const updatePasswordAndValidate = (e) => {
    let isValid = true;

    if (e.target.value.length === 0) {
      isValid = false;
    }

    setFormValues((prevState) => ({...prevState, password: {...prevState.password, value: e.target.value, valid: isValid}}))
  }

  // These next two function are run when the username and password inputs are blurred
  const handleUsernameBlur = () => {
    // Remove extra space at the end.
    setFormValues((prevState) => ({...prevState, username: {...prevState.username, value: prevState.username.value.trim()}}))
  }

  // This function resets the form values (clears the form)
  const clearForm = () => {
    setFormValues({
      username: {value: '', valid: null},
      password: {value: '', valid: null}
    })
  } 

  const [error, setError] = useState({show: false, message: '', hiddenMsg: ''})

  // Function to control the login functionality for the form on submit.
  const handleSubmitForm1 = async (prevState, fieldValues) => {
    const username = fieldValues.get("username");
    const password = fieldValues.get("password");

    if (!formValues.username.valid || !formValues.password.valid) return;
    
    try {
      const response = await logInWithCredentials(username, password, {redirect: true, redirectTo: callbackUrl})

      if (!response.success) {

        setError({show: true, message: response.message, hiddenMsg: response?.error.toString()})
        return {status: "ERROR"}
      } else if (response.success) {
        setError((prev) => ({...prev, show: false}))

        clearForm();

        return {status: 'SUCCESS'} 
      }
  
    } catch (error) {
      if (error.toString().includes('NEXT_REDIRECT')) {
        throw(error)
      }

      setError({show: true, message: "Sign in failed. Unexpected error occurred.", hiddenMsg: error.toString()})
      return {status: 'ERROR'}
    }
  }

  const [form1State, form1Action, form1Pending] = useActionState(handleSubmitForm1, {status: "INITIAL"})

  // This function handles the submitting of the form for logging in with Google  
  const handleSubmitForm2 = async (prevState) => {    
    try {
      // Run the signIn function to log in with Google
      await logInWithGoogle({ redirectTo: callbackUrl });

      clearForm();

      setError((prev) => ({...prev, show: false}))
      return {status: 'SUCCESS'} 
  
    } catch (error) {
      setError({show: true, message: "Sign in failed. Unexpected error occurred.", hiddenMsg: error.toString()})
      return {status: 'ERROR'}
    }
  }

  const [form2State, form2Action, form2Pending] = useActionState(handleSubmitForm2, {status: 'INITIAL'})

  return (
    <>
      <Alert 
        className='mb-4' 
        variant="danger" 
        aria-live="polite"
        show={(form1State.status === "ERROR" || form2State.status === "ERROR") && !(form1Pending || form2Pending) && error.show} 
        onClose={() => setError((prev) => ({...prev, show: false}))} 
        dismissible
      >
        <Alert.Heading>Error</Alert.Heading>
        {error.message}
      </Alert>
      <section className='bg-white p-50 rounded'>
        <Stack gap={5}>
          <h1 className='fs-2'>Log In</h1>
          <p className="d-none text-break hiddenError">{error.hiddenMsg}</p>
          <Form action={form1Action}>
            <Stack gap={5}>
              <div>
                <Form.Group className="mb-20" controlId="logInUsername">
                  <Form.Label className="fw-medium">Username or Email*</Form.Label>
                  <Form.Control 
                    name="username" 
                    value={formValues.username.value} 
                    onBlur={handleUsernameBlur} 
                    onChange={updateUsernameAndValidate} 
                    className={formValues.username.valid === false && 'is-invalid'} 
                    type="text" 
                    placeholder="Enter username or email" 
                    required
                  />
                  <Form.Control.Feedback type="invalid" aria-live="polite">
                    Username is required
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="logInPassword">
                  <Form.Label className="fw-medium">Password*</Form.Label>
                  <PasswordInput 
                    name="password" 
                    value={formValues.password.value} 
                    onChange={updatePasswordAndValidate} 
                    className={formValues.password.valid === false && 'is-invalid'} 
                    placeholder="Enter password" 
                    required
                  />   
                  <Form.Control.Feedback className={formValues.password.valid === false && 'd-block'} type="invalid" aria-live="polite">
                    Password is required
                  </Form.Control.Feedback>
                  <p style={{marginTop: '0.3125rem', textAlign: 'right'}}>
                    { form1Pending || form2Pending ? 
                      <span className="fw-medium">Forgot Password?</span> :
                      <Link href='/auth/forgot-password'>Forgot Password?</Link>
                    }
                  </p>
                </Form.Group>   
              </div>       
              <Button variant="primary" type="submit" disabled={!(formValues.username.value.length > 0 && formValues.password.value.length > 0) || form1Pending || form2Pending}>
                {form1Pending ? <div style={{padding: '0rem 1rem'}}><div className="loader"></div><span className="visually-hidden">Loading...</span></div> : 'Log In'}
              </Button>
            </Stack>
          </Form>
          <OrSeparator />
          <Form action={form2Action} className='d-flex flex-column'>
            <GoogleAuthButton type="submit" buttonText='signin' isLoading={form1Pending || form2Pending} hasSpinner={form2Pending}/>
          </Form>
          <p>Don’t have an account? {form1Pending || form2Pending ? <span className="fw-medium">Sign Up</span> : <Link href='/auth/signup'>Sign Up</Link>}</p>
        </Stack>
      </section>
    </>
  )
}

export default SignIn