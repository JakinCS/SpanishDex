import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { useActionState, useEffect, useState } from 'react';
import { isEmailValid } from '@/lib/utils';
import { editEmail } from '@/lib/actions';
import { useSession } from 'next-auth/react';

const EditEmailModal = (props) => {

  const {session, update} = useSession();

  // State for storing the values of the form
  const [email, setEmail] = useState({value: props.initialValue, valid: null, message: ''})

  const updateEmailValue = (e) => setEmail(prevState => ({...prevState, value: e.target.value}))

  // Function to check and update the validity of the email
  const validateEmail = () => {
    const result = isEmailValid(email.value);
    
    setEmail(prevState => ({...prevState, valid: result.valid, message: result.message}));
  }

  // Function for resetting the state of the form (useful when triggered on 'modal open')
  const resetState = () => {
    setEmail({value: props.initialValue, valid: null, message: ''});
  }

  // Whether or not the error banner should be displayed. Useful for being able to close the error banner.
  const [showError, setShowError] = useState(false);

  // The function that runs when the form is submitted
  const handleFormSubmit = async (prevState, fieldValues) => {
    const emailValue = fieldValues.get('email');

    if (emailValue.toLowerCase() === props.initialValue.toLowerCase()) {
      props.closeModal();
      return {status: 'SUCCESS', error: '', hiddenError: ''}
    }

    try {

      // Call the editEmail server action
      const response = await editEmail(props.userId, emailValue)
      
      if (!response.success) {
        setShowError(true)
        return {status: "ERROR", error: response.message, hiddenError: response?.error.toString()}

      } else if (response.success) {
        setShowError(false)

        props.setEmail(emailValue.toLowerCase());
        update({email: emailValue.toLowerCase()})

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
    if (document.querySelector('#editEmailModal .btn-close') !== null) {
      if (isPending) {
        document.querySelector('#editEmailModal .btn-close').disabled = true;
      } else {
        document.querySelector('#editEmailModal .btn-close').disabled = false;
      }
    }
  }, [isPending])

  return (
    <Modal id='editEmailModal' show={props.show} backdrop="static" onExited={() => setShowError(false)} onEnter={resetState} onHide={props.closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title as='h2'>Edit Email</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack gap={5}>
          <Alert variant="danger" show={formState.status === "ERROR" && !isPending && showError} onClose={() => setShowError(false)} dismissible>
            <Alert.Heading>Error</Alert.Heading>
            {formState.error}
          </Alert>
          <p className="d-none text-break hiddenError">{formState.hiddenError}</p>
          <Form action={formAction}>
            <Form.Group className="mb-30" controlId="email">
              <Form.Label className="fw-medium">Email</Form.Label>
              <Form.Control name="email" type="text" placeholder="Enter email" value={email.value} onBlur={validateEmail} onChange={updateEmailValue} className={email.valid === false && 'is-invalid'}/>
              <Form.Control.Feedback type="invalid">
                {email.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Container fluid className="d-flex gap-4 justify-content-end p-0">            
              <Button variant="gray" onClick={props.closeModal} disabled={isPending}>
                Cancel
              </Button>
              <Button variant="primary" type='submit' disabled={!email.valid || isPending}>
                {isPending ? <div style={{padding: '0rem 1rem'}}><div className="loader"></div><span className="visually-hidden">Loading...</span></div> : 'Save'}
              </Button>
            </Container>
          </Form>
        </Stack>
      </Modal.Body>
    </Modal>
  )
}

export default EditEmailModal