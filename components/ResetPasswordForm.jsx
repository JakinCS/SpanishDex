'use client'

import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import IconButton from '@/components/IconButton';
import { useState } from 'react';
import { handlePasswordValidCheck } from '@/lib/utils';
import { resetPassword } from '@/lib/actions';

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

  const [serverError, setServerError] = useState(''); // Holds the raw version of the server error. (stored in a hidden paragraph for debugging purposes)
  // The function run when the 'Reset Password' button is clicked.
  // This function handles the resetting of the user password.
  const handleResetPassword = async (e) => {
    e.preventDefault();

    // Double check that the form really is valid by running the password validation function
    handlePasswordValidCheck(formValues, setFormValues, 1)
    handlePasswordValidCheck(formValues, setFormValues, 2)
    if (!formValues.password.valid || !formValues.password2.valid) return;

    // Set loading state
    setFormState(prevState => ({...prevState, isLoading: !prevState.isLoading, errorAcknowledged: true, successAcknowledged: true}));

    try {
      const response = await resetPassword(props.username, formValues.password.value, props.token)

      // If there is a problem with the password reset, then show an error
      if (!response.success) {
        if (response.error) setServerError(response.error);

        setFormState(prevState => ({...prevState, serverError: true, serverMessage: response.message, errorAcknowledged: false}))
      } else if (response.success) {
        // Success. Now set the server error state to false.
        setFormState(prevState => ({...prevState, serverError: false, showSuccess: true, successAcknowledged: false}))

        // Reset the form
        setFormValues({
          password: {value: '', valid: null, errorType: null, message: null},
          password2: {value: '', valid: null, errorType: null, message: null}
        })
      }

    } catch (error) {
      setServerError(error.toString())
      setFormState(prevState => ({...prevState, serverError: true, serverMessage: "Unexpected error occurred. Please try again", errorAcknowledged: false}))

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
              <Form.Control type={showPassword ? 'text' : 'password'} placeholder="Enter new password" value={formValues.password.value} onBlur={() => handlePasswordValidCheck(formValues, setFormValues, 1)} onChange={updatePasswordValue} className={formValues.password.valid === false && 'is-invalid'} />
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
              <Form.Control type={showPassword2 ? 'text' : 'password'} placeholder="Confirm password" value={formValues.password2.value} onBlur={() => handlePasswordValidCheck(formValues, setFormValues, 2)} onChange={updatePassword2Value} className={formValues.password2.valid === false && 'is-invalid'} />
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