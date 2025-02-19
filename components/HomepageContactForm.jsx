'use client'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Alert from "react-bootstrap/Alert";
import { useActionState, useState } from 'react';
import { sendContactFormMessage } from '@/lib/actions';
import { isEmailValid } from '@/lib/utils';

function HomepageContactForm(props) {

  // Store the state of the values of the form.
  const [formValues, setFormValues] = useState({
    name: {value: '', valid: null, message: ''},
    email: {value: '', valid: null, message: ''},
    comments: {value: '', valid: null, message: ''},
  })

  // Functions to update the state of the form values on the change event
  const updateNameValue = (e) => setFormValues((prev) => ({...prev, name: {...prev.name, value: e.target.value}}));
  const updateEmailValue = (e) => setFormValues((prev) => ({...prev, email: {...prev.email, value: e.target.value}}));
  const updateCommentsValue = (e) => setFormValues((prev) => ({...prev, comments: {...prev.comments, value: e.target.value}}));

  // This function validates the input string to ensure it is a valid name
  const validateName = (name) => {
    const stateChange = name.trim().length === 0 ? {valid: false, message: 'Name is required'} : {valid: true, message: ''}

    setFormValues((prev) => ({...prev, name: {...prev.name, ...stateChange}}));
  }

  // This function validates the input string to ensure it is a valid email
  const validateEmail = (email) => {   
    if (email.trim().length === 0) setFormValues((prev) => ({...prev, email: {...prev.email, valid: false, message: "Email address is required"}}));
    else {
      const validationResult = isEmailValid(email)
      setFormValues((prev) => ({...prev, email: {...prev.email, valid: validationResult.valid, message: validationResult.message}}));
    }
  }

  // This function validates the input string to ensure it is a valid comment
  const validateComments = (comment) => {
    const newStateValues = comment.trim().length === 0 ? {valid: false, message: 'Message field is required'} : {valid: true, message: ''}

    setFormValues((prev) => ({...prev, comments: {...prev.comments, ...newStateValues}}));
  }

  // State for the show/hide status of the error and success banners.
  const [showBanners, setShowBanners] = useState({error: false, success: false})

  // Function that hides all banners
  const hideBanners = () => {
    setShowBanners({error: false, success: false});
  }

  const handleSubmitForm = async (prevState, fieldValues) => {
    const name = fieldValues.get('name');
    const email = fieldValues.get('email');
    const comment = fieldValues.get('comment');

    try {
      const response = await sendContactFormMessage(formValues.name.value, formValues.email.value, formValues.comments.value);

      if (!response.success) {
        setShowBanners({error: true, success: false})
        return {error: response.message, hiddenError: response.error, status: "ERROR", values: {name, email, comment}}
      } else if (response.success) {
        setShowBanners({error: false, success: true})

        // Reset the form
        setFormValues({
          name: {value: '', valid: null, message: ''},
          email: {value: '', valid: null, message: ''},
          comments: {value: '', valid: null, message: ''},
        })

        return {error: '', hiddenError: '', status: "SUCCESS", values: {name: '', email: '', comment: ''}}
      } 

    } catch (error) {
      setShowBanners({error: true, success: false})
      return {error: 'Unexpected error occurred. Please try again', hiddenError: error.toString(), status: "ERROR", values: {name, email, comment}}
    }
  }
 
  const [formState, formAction, isPending] = useActionState(handleSubmitForm, {error: '', hiddenError: '', status: 'INITIAL', values: {name: '', email: '', comment: ''}})

  return (
    <Form action={formAction} {...props}>
      <Alert className='mb-20' variant="danger" show={formState.status === "ERROR" && showBanners.error} onClose={() => setShowBanners((prevState) => ({...prevState, error: false}))} dismissible>
        <Alert.Heading>Error</Alert.Heading>
        {formState.error}
      </Alert>
      <Alert className='mb-20' variant="success" show={formState.status === "SUCCESS" && showBanners.success} onClose={() => setShowBanners((prevState) => ({...prevState, success: false}))} dismissible>
        <Alert.Heading>Success</Alert.Heading>
        Your message has been sent successfully.
      </Alert>
      <p className="d-none text-break hiddenError">{formState.hiddenError}</p>
      <Form.Group className="mb-20" controlId="userName">
        <Form.Label className="fw-medium">Name</Form.Label>
        <Form.Control name='name' type="text" placeholder="Enter your name" value={formValues.name.value} className={formValues.name.valid === false && 'is-invalid'} onChange={ updateNameValue } onBlur={(e)=>validateName(e.target.value)}/>
        <Form.Control.Feedback type="invalid">
          {formValues.name.message}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-20" controlId="userEmail">
        <Form.Label className="fw-medium">Email address</Form.Label>
        <Form.Control name='email' type="email" placeholder="Enter your email" value={formValues.email.value} className={formValues.email.valid === false && 'is-invalid'} onChange={ updateEmailValue } onBlur={(e)=>validateEmail(e.target.value)}/>
        <Form.Control.Feedback type="invalid">
          {formValues.email.message}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-5" controlId="userMessage">
        <Form.Label className="fw-medium">Comments or Questions</Form.Label>
        <Form.Control name='comment' as='textarea' rows='5' placeholder="Write your message" value={formValues.comments.value} className={formValues.comments.valid === false && 'is-invalid'} onChange={ updateCommentsValue } onBlur={(e)=>validateComments(e.target.value)}/>
        <Form.Control.Feedback type="invalid">
          {formValues.comments.message}
        </Form.Control.Feedback>
      </Form.Group>
      <Container fluid className='d-flex justify-content-center'>
        <Button variant="primary" onClick={hideBanners} type="submit" disabled={isPending || !(formValues.name.valid && formValues.email.valid && formValues.comments.valid)}>
          {isPending ? <div style={{padding: '0rem 1rem'}}><div className="loader"></div><span className="visually-hidden">Loading...</span></div> : 'Submit'}
        </Button>
      </Container>
    </Form>
  );
}

export default HomepageContactForm;