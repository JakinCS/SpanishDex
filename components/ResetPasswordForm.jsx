'use client'

import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import IconButton from '@/components/IconButton';
import { useState } from 'react';

const ResetPasswordForm = (props) => {

  // State for keeping track of the state of the form (loading status, errors, successes)
  const [formState, setFormState] = useState({
    isLoading: false,
    serverError: false,
    serverMessage: '',
    errorAcknowledged: false,
    showSuccess: false,
    successAcknowledged: false
  })

  // State for storing the state of the password inputs
  const [formValues, setFormValues] = useState({
    password: {value: '', valid: null, errorType: null, message: null},
    password2: {value: '', valid: null, errorType: null, message: null}
  })

  // These functions update the password state to contain updated values
  const updatePasswordValue = (e) => setFormValues((prevState) => ({...prevState, password: {...prevState.password, value: e.target.value}}))
  const updatePassword2Value = (e) => setFormValues((prevState) => ({...prevState, password2: {...prevState.password2, value: e.target.value}}))

  // State for the visibility of the password values
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  }
  const [showPassword2, setShowPassword2] = useState(false);
  const togglePassword2Visibility = () => {
    setShowPassword2(prevState => !prevState);
  }
  
  // Function to check whether a password string is valid
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
    const matchesOtherField = (formValues.password.value == formValues.password2.value);

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
    const matchesOtherField = (formValues.password.value == formValues.password2.value);

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


  const [serverError, setServerError] = useState(''); // Holds the raw version of the server error. (stored in a hidden paragraph for debugging purposes)
  // The function run when the 'Reset Password' button is clicked.
  // This function handles the resetting of the user password.
  const handleResetPassword = async (e) => {
    e.preventDefault();

    // Double check that the form really is valid by running the password 1 and 2 validation functions
    validatePassword1();
    validatePassword2();
    if (!formValues.password.valid || !formValues.password2.valid) return;

    // Set loading state
    setFormState(prevState => ({...prevState, isLoading: !prevState.isLoading, errorAcknowledged: true, successAcknowledged: true}));

    try {

      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        body: JSON.stringify({
          username: props.username, 
          password: formValues.password.value,
          token: props.token
        })
      })

      // If there is a problem with the response, then throw an error.
      if (!response.ok && response.headers.get('content-type') === 'application/json') {
        const json = await response.json();
        setServerError(JSON.stringify(json.serverError));

        if (response.status == 400) throw(json.error);
      }      
      if (!response.ok) {
        throw('Password reset failed. Error: ' + response.status + '. Please try again later.');
      }
            
      // Success. Now set the server error state to false.
      setFormState(prevState => ({...prevState, serverError: false, showSuccess: true, successAcknowledged: false}))

      // Reset the form
      setFormValues({
        password: {value: '', valid: null, errorType: null, message: null},
        password2: {value: '', valid: null, errorType: null, message: null}
      })

    } catch (error) {
      setFormState(prevState => ({...prevState, serverError: true, serverMessage: error.toString(), errorAcknowledged: false}))

    } finally {
      setFormState(prevState => ({...prevState, isLoading: false}));
    }    

  }


  return (
    <>
      <Form className='w-100' style={{maxWidth: '34.375rem'}}>
        <Alert variant="danger" className='mb-5' show={(formState.serverError && formState.errorAcknowledged === false)} onClose={() => setFormState(prevState => ({...prevState, errorAcknowledged: true}))} dismissible>
          <Alert.Heading>Error</Alert.Heading>
          {formState.serverMessage}
        </Alert>
        <Alert variant="success" className='mb-5' show={formState.showSuccess && formState.successAcknowledged === false} onClose={() => setFormState(prevState => ({...prevState, successAcknowledged: true}))} dismissible>
          <Alert.Heading>Success</Alert.Heading>
          Password has been reset successfully.
        </Alert>
        <p className="d-none text-break hiddenError">{serverError}</p>
        <Form.Group className="mb-5" controlId="newPassword">
          <Form.Label className="fw-medium">Password</Form.Label>
          <Container className="d-flex gap-3 p-0">
            <div className="w-100">
              <Form.Control type={showPassword ? 'text' : 'password'} placeholder="Enter new password" value={formValues.password.value} onBlur={validatePassword1} onChange={updatePasswordValue} className={formValues.password.valid === false && 'is-invalid'} />
            </div>
            <div className="d-flex align-items-center">
              <IconButton variant='light' iconSrc={showPassword ? '/icons/hide.svg' : '/icons/show.svg'} altTag={showPassword ? 'hide icon' : 'show icon'} onClick={togglePasswordVisibility}/>           
            </div>
          </Container>
          <Form.Control.Feedback className={formValues.password.valid === false && 'd-block'} type="invalid">
            {formValues.password.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-40" controlId="newPassword2">
          <Form.Label className="fw-medium">Confirm Password</Form.Label>
          <Container className="d-flex gap-3 p-0">
            <div className="w-100">
              <Form.Control type={showPassword2 ? 'text' : 'password'} placeholder="Confirm password" value={formValues.password2.value} onBlur={validatePassword2} onChange={updatePassword2Value} className={formValues.password2.valid === false && 'is-invalid'} />
            </div>
            <div className="d-flex align-items-center">
              <IconButton variant='light' iconSrc={showPassword2 ? '/icons/hide.svg' : '/icons/show.svg'} altTag={showPassword ? 'hide icon' : 'show icon'} onClick={togglePassword2Visibility}/>           
            </div>
          </Container>
          <Form.Control.Feedback className={formValues.password2.valid === false && 'd-block'} type="invalid">
            {formValues.password2.message}
          </Form.Control.Feedback>
        </Form.Group>
        
        <Container fluid className='d-flex justify-content-center'>
          <Button variant="primary" type="submit" onClick={handleResetPassword}  disabled={!(formValues.password.valid && formValues.password2.valid) || formState.isLoading}>
              {formState.isLoading ? <div style={{padding: '0rem 1rem'}}><div className="loader"></div><span className="visually-hidden">Loading...</span></div> : 'Reset Password'}
          </Button>
        </Container>
      </Form>
    </>
  )
}

export default ResetPasswordForm