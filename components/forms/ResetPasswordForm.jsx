'use client'

import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { useActionState, useState } from 'react';
import { handlePasswordValidCheck } from '@/lib/utils';
import { resetPassword } from '@/lib/actions';
import PasswordInput from '../utils/PasswordInput';

const ResetPasswordForm = (props) => {

  // State for storing the state of the password inputs
  const [formValues, setFormValues] = useState({
    password: {value: '', valid: null, errorType: null, message: null},
    password2: {value: '', valid: null, errorType: null, message: null}
  })

  // These functions update the password state to contain updated values
  const updatePassword1AndValidate = (e) => {
    // Run a special utility funtion to check the validity of the password field
    const newData = handlePasswordValidCheck({...formValues.password, value: e.target.value }, formValues.password2);

    setFormValues((prevState) => ({ ...prevState, password: {...prevState.password, ...newData[0]}, password2: {...prevState.password2, ...newData[1]} }))
  }

  const updatePassword2AndValidate = (e) => {
    // Run a special utility funtion to check the validity of the password field
    const newData = handlePasswordValidCheck({...formValues.password2, value: e.target.value }, formValues.password);

    setFormValues((prevState) => ({ ...prevState, password: {...prevState.password, ...newData[1]}, password2: {...prevState.password2, ...newData[0]} }))
  }

  // State for the show/hide status of the error and success banners.
  const [showBanners, setShowBanners] = useState({error: false, success: false})

  // This function handles the submitting of the form to reset the user password.
  const handleSubmitForm = async (prevState, fieldValues) => {
    const password1 = fieldValues.get("password1");

    try {
      // Call the resetPassword() function to reset the user's password
      const response = await resetPassword(props.username, password1, props.token)

      // Set the error/success status based on the response.
      if (!response.success) {
        setShowBanners({success: false, error: true})
        return {error: response.message, status: "ERROR", hiddenError: response?.error}
      } else if (response.success) {
        setShowBanners({success: true, error: false})

        // Reset the form
        setFormValues({
          password: {value: '', valid: null, errorType: null, message: null},
          password2: {value: '', valid: null, errorType: null, message: null}
        })

        return {error: '', hiddenError: '', status: "SUCCESS"}
      }

    } catch (error) {
      setShowBanners({success: false, error: true})
      return {error: "Password reset failed. Unexpected error occurred. Please try again", hiddenError: error.toString(), status: "ERROR"}
    }
  }

  const [formState, formAction, isPending] = useActionState(handleSubmitForm, {error: '', hiddenError: '', status: "INITIAL"})

  return (
    <>
      <Form action={formAction} className='w-100' style={{maxWidth: '34.375rem'}}>
        <Alert 
          variant="danger" 
          className='mb-5' 
          aria-live="polite"
          show={(formState.status === "ERROR" && !isPending && showBanners.error)} 
          onClose={() => setShowBanners( (prevState) => ({...prevState, error: false}) )} 
          dismissible
        >
          <Alert.Heading>Error</Alert.Heading>
          {formState.error}
        </Alert>
        <Alert 
          variant="success" 
          className='mb-5' 
          role="status"
          aria-live="polite"
          show={formState.status === "SUCCESS" && !isPending && showBanners.success} 
          onClose={() => setShowBanners( (prevState) => ({...prevState, success: false}) )} 
          dismissible
        >
          <Alert.Heading>Success</Alert.Heading>
          Password has been reset successfully.
        </Alert>
        <p className="d-none text-break hiddenError">{formState.hiddenError}</p>
        <Form.Group className="mb-5" controlId="newPassword">
          <Form.Label className="fw-medium">Password*</Form.Label>
          <PasswordInput 
            name='password1' 
            placeholder="Enter new password" 
            value={formValues.password.value} 
            onChange={updatePassword1AndValidate} 
            className={formValues.password.valid === false && 'is-invalid'}
          />
          <Form.Control.Feedback className={formValues.password.valid === false && 'd-block'} type="invalid" aria-live="polite">
            {formValues.password.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-40" controlId="newPassword2">
          <Form.Label className="fw-medium">Confirm Password*</Form.Label>
          <PasswordInput 
            name='password2' 
            placeholder="Confirm password" 
            value={formValues.password2.value} 
            onChange={updatePassword2AndValidate} 
            className={formValues.password2.valid === false && 'is-invalid'} 
          />
          <Form.Control.Feedback className={formValues.password2.valid === false && 'd-block'} type="invalid" aria-live="polite">
            {formValues.password2.message}
          </Form.Control.Feedback>
        </Form.Group>
        
        <Container fluid className='d-flex justify-content-center'>
          <Button variant="primary" type="submit" disabled={!(formValues.password.valid && formValues.password2.valid) || isPending}>
              {isPending ? <div style={{padding: '0rem 1rem'}}><div className="loader"></div><span className="visually-hidden">Loading...</span></div> : 'Reset Password'}
          </Button>
        </Container>
      </Form>
    </>
  )
}

export default ResetPasswordForm