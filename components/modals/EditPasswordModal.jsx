import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { useActionState, useEffect, useState } from 'react';
import { handlePasswordValidCheck } from '@/lib/utils';
import PasswordInput from '../utils/PasswordInput';
import { editPassword } from '@/lib/actions';

const EditPasswordModal = (props) => {

  // State for storing the values of the form
  const [formValues, setFormValues] = useState({
    currPassword: {value: '', valid: null, errorType: null, message: ''},
    password: {value: '', valid: null, errorType: null, message: ''},
    password2: {value: '', valid: null, errorType: null, message: ''}
  })

  const updateCurrPasswordAndValidate = (e) => {
    const validationResult = (e.target.value.length === 0) ? {valid: false, message: 'Password is required'} : {valid: true, message: ''};

    setFormValues(prevState => ({...prevState, currPassword: {...prevState.currPassword, value: e.target.value, valid: validationResult.valid, message: validationResult.message}}));
  }

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

  // Function for resetting the state of the form (useful when triggered on 'modal open')
  const resetState = () => {
    setFormValues({
      currPassword: {value: '', valid: null, errorType: null, message: ''},
      password: {value: '', valid: null, errorType: null, message: ''},
      password2: {value: '', valid: null, errorType: null, message: ''}
    })
  }

  // Whether or not the error banner should be displayed. Useful for being able to close the error banner.
  const [showError, setShowError] = useState(false);

  // The function that runs when the form is submitted
  const handleFormSubmit = async (prevState, fieldValues) => {
    const currentPasswordValue = fieldValues.get('currPassword');
    const password1Value = fieldValues.get('password1');
    const password2Value = fieldValues.get('password2')

    try {
      const response = await editPassword(props.userId, currentPasswordValue, password1Value, password2Value);
      
      if (!response.success) {
        setShowError(true)
        if (response.message.includes('password') && response.message.includes('incorrect')) {
          setFormValues(prevState => ({...prevState, currPassword: {...prevState.currPassword, valid: false, message: "Incorrect password"}}));
        }
        return {status: "ERROR", error: response.message, hiddenError: response?.error.toString()}

      } else if (response.success) {
        setShowError(false)
        props.closeModal();
        return {status: 'SUCCESS', error: '', hiddenError: ''}
      }

    } catch (error) {
      setShowError(true);
      return {status: 'ERROR', error: 'Unexpected error occurred. Please try again later.', hiddenError: error.toString()}
    }
  }

  const [formState, formAction, isPending] = useActionState(handleFormSubmit, {status: 'INITIAL', error: '', hiddenError: ''})

  // Use effect hook for disabling the modal close button (when the form is being submitted)
  // This effect hook is necessary because the button code is not accessible in this JSX file.
  useEffect(() => {
    if (document.querySelector('#changePasswordModal .btn-close') !== null) {
      if (isPending) {
        document.querySelector('#changePasswordModal .btn-close').disabled = true;
      } else {
        document.querySelector('#changePasswordModal .btn-close').disabled = false;
      }
    }
  }, [isPending])

  return (
    <Modal id='changePasswordModal' show={props.show} backdrop="static" onExited={() => setShowError(false)} onEnter={resetState} onHide={props.closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title as='h2'>Change Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack gap={5}>
          <Alert 
            variant="danger" 
            aria-live="polite"
            show={formState.status === "ERROR" && !isPending && showError} 
            onClose={() => setShowError(false)} 
            dismissible
          >
            <Alert.Heading>Error</Alert.Heading>
            {formState.error}
          </Alert>
          <p className="d-none text-break hiddenError">{formState.hiddenError}</p>
          <Form action={formAction}>
            <Form.Group className='' controlId="currPassword">
              <Form.Label className="fw-medium">Current Password*</Form.Label>
              <PasswordInput 
                name="currPassword" 
                placeholder="Current password" 
                value={formValues.currPassword.value} 
                onChange={updateCurrPasswordAndValidate} 
                className={formValues.currPassword.valid === false && 'is-invalid'} 
                required
              />
              <Form.Control.Feedback className={formValues.currPassword.valid === false && 'd-block'} type="invalid" aria-live="polite">
                {formValues.currPassword.message}
              </Form.Control.Feedback>
              <p className='fs-5 forgot-password mt-10' style={{textAlign: 'right'}}>
                { isPending ? 
                  <span className="fw-medium">Forgot Password?</span> :
                  <a href="#" onClick={(e) => {e.preventDefault(); props.closeModal(); props.openResetPasswordModal()}}>Forgot Password?</a>
                }
              </p>
            </Form.Group>
            <div className="container my-30">
              <div className="row align-items-center">
                <div className="col" style={{height: '2px', backgroundColor: '#888888'}}></div>
              </div>
            </div>
            <Form.Group className="mb-30" controlId="password1">
              <Form.Label className="fw-medium">New Password*</Form.Label>
              <PasswordInput 
                name="password1" 
                placeholder="New password" 
                value={formValues.password.value} 
                onChange={updatePassword1AndValidate} 
                className={formValues.password.valid === false && 'is-invalid'} 
                required
              />
              <Form.Control.Feedback className={formValues.password.valid === false && 'd-block'} type="invalid" aria-live="polite">
                {formValues.password.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-30" controlId="password2">
              <Form.Label className="fw-medium">Confirm New Password*</Form.Label>
              <PasswordInput 
                name="password2" 
                placeholder="Confirm password" 
                value={formValues.password2.value} 
                onChange={updatePassword2AndValidate} 
                className={formValues.password2.valid === false && 'is-invalid'} 
                required
              />
              <Form.Control.Feedback className={formValues.password2.valid === false && 'd-block'} type="invalid" aria-live="polite">
                {formValues.password2.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Container fluid className="d-flex gap-4 justify-content-end p-0">            
              <Button variant="gray" onClick={props.closeModal} disabled={isPending}>
                Cancel
              </Button>
              <Button variant="primary" type='submit' disabled={!(formValues.currPassword.valid && formValues.password.valid && formValues.password2.valid) || isPending}>
                {isPending ? <div style={{padding: '0rem 1rem'}}><div className="loader"></div><span className="visually-hidden">Loading...</span></div> : 'Save'}
              </Button>
            </Container>
          </Form>
        </Stack>
      </Modal.Body>
    </Modal>
  )
}

export default EditPasswordModal