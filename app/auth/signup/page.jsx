'use client'

import Stack from 'react-bootstrap/Stack';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useActionState, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import OrSeparator from '@/components/OrSeparator';
import GoogleAuthButton from '@/components/GoogleAuthButton';
import { createAccount, logInWithCredentials, logInWithGoogle } from '@/lib/actions';
import { handlePasswordValidCheck, isEmailValid, isUsernameValid } from '@/lib/utils';
import PasswordInput from '@/components/PasswordInput';


const SignUp = () => {
  
  const router = useRouter();

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

  // State for the visibility of the "account created" message.
  // This message is only displayed when the log in action fails after a successful account creation.
  const [showAccountCreated, setShowAccountCreated] = useState(false)

  const [error, setError] = useState({show: false, message: '', hiddenMsg: ''})

  // This function is what is run when the user wants to create an account without Google
  const handleSubmitForm1 = async (prevState, fieldValues) => {
    const username = fieldValues.get("username")
    const email = fieldValues.get("email");
    const password1 = fieldValues.get("password1")
    const password2 = fieldValues.get("password2")

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
      }

      // LOG IN the user now

      const signInResponse = await logInWithCredentials(username, password1, { redirectTo: "/dashboard" })

      clearForm();

      if (!signInResponse.success) {
        // Communicate to the user that the account creation was successful prior to redirecting to the sign in page
        setShowAccountCreated(true);

        // Wait a second before redirecting
        await new Promise(res => { setTimeout(() => { res() }, 1000) })

        // If the sign in fails, redirect to the sign in page
        router.push('/auth/signin')
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
      <Alert className='mb-4' variant="danger" show={(form1State.status === "ERROR" || form2State.status === "ERROR") && !(form1Pending || form2Pending) && error.show} onClose={() => setError((prev) => ({...prev, show: false}))} dismissible>
        <Alert.Heading>Error</Alert.Heading>
        {error.message}
      </Alert>
      <div className='bg-white p-50 rounded'>
        <div className={'modal-success-message ' + (showAccountCreated ? 'show' : 'hide')} style={{left: 0}}>
          <h2 className="text-success mb-3">Success</h2>
          <p className="fw-medium">Your account is created</p>
        </div>
        <Stack gap={5} style={showAccountCreated ? {opacity: '.15', pointerEvents: 'none', WebkitUserSelect: 'none', msUserSelect: 'none', userSelect: 'none'} : {}}>        
          <h1 className='fs-2'>Create Account</h1>
          <p className="d-none text-break hiddenError">{error.hiddenMsg}</p>
          <Form action={form1Action}>
            <Form.Group className="mb-20" controlId="createAccountUsername">
              <Form.Label className="fw-medium">Username</Form.Label>
              <Form.Control name='username' value={formValues.username.value} onBlur={validateUsername} onChange={updateUsernameValue} className={formValues.username.valid === false && 'is-invalid'} type="text" placeholder="username" />
              <Form.Control.Feedback type="invalid">
                {formValues.username.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-20" controlId="createAccountEmail">
              <Form.Label className="fw-medium">Email (optional)</Form.Label>
              <Form.Control name='email' value={formValues.email.value} onBlur={validateEmail} onChange={updateEmailValue} className={formValues.email.valid === false && 'is-invalid'} type="text" placeholder="email" />
              <Form.Control.Feedback type="invalid">
                {formValues.email.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-20" controlId="createAccountPassword">
              <Form.Label className="fw-medium">Password</Form.Label>
              <PasswordInput name="password1" value={formValues.password.value} placeholder="password" onBlur={() => handlePasswordValidCheck(formValues, setFormValues, 1)} onChange={updatePasswordValue} className={formValues.password.valid === false && 'is-invalid'}/>
              <Form.Control.Feedback className={formValues.password.valid === false && 'd-block'} type="invalid">
                {formValues.password.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className='mb-5' controlId="createAccountPassword2">
              <Form.Label className="fw-medium">Confirm Password</Form.Label>
              <PasswordInput name="password2" value={formValues.password2.value} placeholder="password" onBlur={() => handlePasswordValidCheck(formValues, setFormValues, 2)} onChange={updatePassword2Value} className={formValues.password2.valid === false && 'is-invalid'}/>
              <Form.Control.Feedback className={formValues.password2.valid === false && 'd-block'} type="invalid">
                {formValues.password2.message}
              </Form.Control.Feedback>
            </Form.Group>
            <div className='d-flex flex-column'>
              <Button variant="primary" type='submit' disabled={!(formValues.username.valid && formValues.email.valid && formValues.password.valid && formValues.password2.valid) || form1Pending || form2Pending}>
                {form1Pending ? <div style={{padding: '0rem 1rem'}}><div className="loader"></div><span className="visually-hidden">Loading...</span></div> : 'Sign Up'}
              </Button>
            </div>
          </Form>
          <OrSeparator />
          <Form action={form2Action} className='d-flex flex-column'>
            <GoogleAuthButton type='submit' buttonText='signup' isLoading={form1Pending || form2Pending} hasSpinner={form2Pending}/>
          </Form>
          <p>Already have an account? {form1Pending || form2Pending ? <span className="fw-medium">Log In</span> : <Link href='/auth/signin'>Log In</Link>}</p>
        </Stack>
      </div>
    </>
  )
}

export default SignUp