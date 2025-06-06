import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { useActionState, useEffect, useState } from 'react';
import PasswordInput from '../PasswordInput';
import { deleteAccount } from '@/lib/actions';

const DeleteAccountModal = (props) => {

  // State for storing the values of the form
  const [password, setPassword] = useState({value: '', valid: null, message: ''})

  const updatePasswordValue = (e) => setPassword(prevState => ({...prevState, value: e.target.value}))

  // Function to check and update the validity of the password
  const validatePassword = () => {
    const result = (password.value.length === 0) ? {valid: false, message: 'Password is required'} : {valid: true, message: ''};
    
    setPassword(prevState => ({...prevState, valid: result.valid, message: result.message}));
  }

  // Function for resetting the state of the form (useful when triggered on 'modal open')
  const resetState = () => {
    setPassword({value: '', valid: null, message: ''});
  }

  // Whether or not the error banner should be displayed. Useful for being able to close the error banner.
  const [showError, setShowError] = useState(false);

  // The function that runs when the form is submitted
  const handleFormSubmit = async (prevState, fieldValues) => {
    const passwordValue = fieldValues.get('password');

    try {
      const response = await deleteAccount(props.userId, passwordValue)
      
      if (!response.success) {
        setShowError(true)
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
    if (document.querySelector('#deleteAccountModal .btn-close') !== null) {
      if (isPending) {
        document.querySelector('#deleteAccountModal .btn-close').disabled = true;
      } else {
        document.querySelector('#deleteAccountModal .btn-close').disabled = false;
      }
    }
  }, [isPending])

  return (
    <Modal id='deleteAccountModal' show={props.show} backdrop="static" onExited={() => setShowError(false)} onEnter={resetState} onHide={props.closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title as='h2'>Delete Account</Modal.Title>
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
          <p>Are you sure you want to delete your account? <br />
          All your decks and flashcards will be removed along with your account.</p>
          <p style={{marginTop: '-0.9375rem'}}>
            This action is permanent and <span className='fw-bold'>cannot be undone</span>.
          </p>
          <Form action={formAction}>
            <Form.Group className="mb-30" controlId="password">
              <Form.Label className="fw-medium">Enter Password To Delete</Form.Label>
              <PasswordInput name="password" placeholder="Enter password" value={password.value} onBlur={validatePassword} onChange={updatePasswordValue} className={password.valid === false && 'is-invalid'} required/>
              <Form.Control.Feedback className={password.valid === false && 'd-block'} type="invalid" aria-live="polite">
                {password.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Container fluid className="d-flex gap-4 justify-content-end p-0">            
              <Button variant="gray" className='d-none d-sm-block' onClick={props.closeModal} disabled={isPending}>
                Cancel
              </Button>
              <Button variant="danger" className='d-none d-sm-block' type='submit' disabled={!password.valid || isPending}>
                {isPending ? <div style={{padding: '0rem 1rem'}}><div className="loader"></div><span className="visually-hidden">Loading...</span></div> : 'Delete Account'}
              </Button>
              <Button variant="danger" className='d-block d-sm-none w-100' type='submit' disabled={!password.valid || isPending}>
                {isPending ? <div style={{padding: '0rem 1rem'}}><div className="loader"></div><span className="visually-hidden">Loading...</span></div> : 'Delete Account'}
              </Button>
            </Container>
          </Form>
        </Stack>
      </Modal.Body>
    </Modal>
  )
}

export default DeleteAccountModal