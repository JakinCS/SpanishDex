import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { useActionState, useEffect, useState } from 'react';
import { isUsernameValid } from '@/lib/utils';
import { editUsername } from '@/lib/actions';
import { useSession } from 'next-auth/react';

const EditUsernameModal = (props) => {
  const {session, update} = useSession();

  // State for storing the values of the form
  const [username, setUsername] = useState({value: props.initialValue, valid: null, message: ''})

  const updateUsernameAndValidate = (e) => {
    const result = isUsernameValid(e.target.value.trim());

    setUsername(prevState => ({...prevState, value: e.target.value, valid: result.valid, message: result.message}));
  }

  const handleUsernameBlur = () => {
    setUsername(prevState => ({...prevState, value: prevState.value.trim()}))
  }

  // Function for resetting the state of the form (useful when triggered on 'modal open')
  const resetState = () => {
    setUsername({value: props.initialValue, valid: null, message: ''});
  }

  // Whether or not the error banner should be displayed. Useful for being able to close the error banner.
  const [showError, setShowError] = useState(false);

  // The function that runs when the form is submitted
  const handleFormSubmit = async (prevState, fieldValues) => {
    const usernameValue = fieldValues.get('username');

    // If the username hasn't changed, then just return early
    if (usernameValue === props.initialValue) {
      props.closeModal();
      return {status: 'SUCCESS', error: '', hiddenError: ''}
    }

    try {
      // Call the editUsername server action
      const response = await editUsername(props.userId, usernameValue);
      
      if (!response.success) {
        setShowError(true)
        return {status: "ERROR", error: response.message, hiddenError: response?.error.toString()}

      } else if (response.success) {
        setShowError(false)
        update({username: usernameValue})
        props.setUsername(usernameValue);
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
    if (document.querySelector('#editUsernameModal .btn-close') !== null) {
      if (isPending) {
        document.querySelector('#editUsernameModal .btn-close').disabled = true;
      } else {
        document.querySelector('#editUsernameModal .btn-close').disabled = false;
      }
    }
  }, [isPending])

  return (
    <Modal id='editUsernameModal' show={props.show} backdrop="static" onExited={() => setShowError(false)} onEnter={resetState} onHide={props.closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title as='h2'>Edit Username</Modal.Title>
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
            <Form.Group className="mb-30" controlId="username">
              <Form.Label className="fw-medium">Username*</Form.Label>
              <Form.Control 
                name="username" 
                type="text" 
                placeholder="Enter username" 
                value={username.value} 
                onBlur={handleUsernameBlur} 
                onChange={updateUsernameAndValidate} 
                className={username.valid === false && 'is-invalid'} 
                required
              />
              <Form.Control.Feedback type="invalid" aria-live="polite">
                {username.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Container fluid className="d-flex gap-4 justify-content-end p-0">            
              <Button variant="gray" onClick={props.closeModal} disabled={isPending}>
                Cancel
              </Button>
              <Button variant="primary" type='submit' disabled={!username.valid || isPending}>
                {isPending ? <div style={{padding: '0rem 1rem'}}><div className="loader"></div><span className="visually-hidden">Loading...</span></div> : 'Save'}
              </Button>
            </Container>
          </Form>
        </Stack>
      </Modal.Body>
    </Modal>
  )
}

export default EditUsernameModal