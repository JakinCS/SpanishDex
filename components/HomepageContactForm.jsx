'use client'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Alert from "react-bootstrap/Alert";
import { useState } from 'react';
import { sendContactFormMessage } from '@/lib/actions';
import { isEmailValid } from '@/lib/utils';

function HomepageContactForm(props) {

  // Store the state of the form itself.
  const [formState, setFormState] = useState({
    isLoading: false,
    serverError: false,
    serverMessage: '',
    errorAcknowledged: false,
    showSuccess: false,
    successAcknowledged: false,
  })

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

  // This function effectively closes the error banner by setting the errorAcknowledged form state value to true
  const acknowledgeErrorBanner = () => {
    setFormState(prevState => ({...prevState, errorAcknowledged: true}))
  }

  // This function effectively closes the success banner by setting the successAcknowledged form state value to true
  const acknowledgeSuccessBanner = () => {
    setFormState(prevState => ({...prevState, successAcknowledged: true}))
  }
  
  // This function does a complete reset of the form values state
  const resetForm = () => {
    setFormValues({
      name: {value: '', valid: null, message: ''},
      email: {value: '', valid: null, message: ''},
      comments: {value: '', valid: null, message: ''},
    })
  }


  const [serverError, setServerError] = useState(''); // Holds the raw version of the server error. (stored in a hidden paragraph for debugging purposes)
  
  // Function to handle the contact form submission
  const submitContactForm = async (e) => {
    e.preventDefault();

    // Double check the validity of the form
    validateName(formValues.name.value);
    validateEmail(formValues.email.value);
    validateComments(formValues.comments.value);
    if (!(formValues.name.valid && formValues.email.valid && formValues.comments.valid)) {
      return;
    }

    // Update the form state to show that the form is loading. Also remove any error or success banners that are showing
    setFormState((prev) => ({
      ...prev,
      isLoading: true,
      errorAcknowledged: true,
      successAcknowledged: true
    }))

    try {
      const response = await sendContactFormMessage(formValues.name.value, formValues.email.value, formValues.comments.value);

      if (!response.success) {
        setServerError(response.error);

        // Update the form state to show that an error occurred
        setFormState((prev) => ({...prev, serverError: true, serverMessage: response.message, errorAcknowledged: false}))
      } else if (response.success) {
        // Update the form state to show that the form was successfully submitted
        setFormState((prev) => ({...prev, serverError: false, showSuccess: true, successAcknowledged: false}))

        // Reset the form values
        resetForm();
      }

    } catch (error) {
      // Update the form state to show that an error occurred
      setFormState((prev) => ({...prev, serverError: true, serverMessage: "Unexpected error occurred. Please try again.", errorAcknowledged: false}))
    } finally {
      // Update the form state to show that the form is no longer loading
      setFormState((prev) => ({...prev, isLoading: false}))
    }
  }

  return (
    <Form {...props}>
      <Alert className='mb-20' variant="danger" show={formState.serverError && formState.errorAcknowledged === false} onClose={acknowledgeErrorBanner} dismissible>
        <Alert.Heading>Error</Alert.Heading>
        {formState.serverMessage || 'An error occurred while submitting the form. Please try again later.'}
      </Alert>
      <Alert className='mb-20' variant="success" show={formState.showSuccess && formState.successAcknowledged === false} onClose={acknowledgeSuccessBanner} dismissible>
        <Alert.Heading>Success</Alert.Heading>
        Your message has been sent successfully.
      </Alert>
      <p className="d-none text-break hiddenError">{serverError}</p>
      <Form.Group className="mb-20" controlId="userName">
        <Form.Label className="fw-medium">Name</Form.Label>
        <Form.Control type="text" placeholder="Enter your name" value={formValues.name.value} className={formValues.name.valid === false && 'is-invalid'} onChange={ updateNameValue } onBlur={(e)=>validateName(e.target.value)}/>
        <Form.Control.Feedback type="invalid">
          {formValues.name.message}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-20" controlId="userEmail">
        <Form.Label className="fw-medium">Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter your email" value={formValues.email.value} className={formValues.email.valid === false && 'is-invalid'} onChange={ updateEmailValue } onBlur={(e)=>validateEmail(e.target.value)}/>
        <Form.Control.Feedback type="invalid">
          {formValues.email.message}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-5" controlId="userMessage">
        <Form.Label className="fw-medium">Comments or Questions</Form.Label>
        <Form.Control as='textarea' rows='5' placeholder="Write your message" value={formValues.comments.value} className={formValues.comments.valid === false && 'is-invalid'} onChange={ updateCommentsValue } onBlur={(e)=>validateComments(e.target.value)}/>
        <Form.Control.Feedback type="invalid">
          {formValues.comments.message}
        </Form.Control.Feedback>
      </Form.Group>
      <Container fluid className='d-flex justify-content-center'>
        <Button variant="primary" type="submit" onClick={submitContactForm} disabled={formState.isLoading || !(formValues.name.valid && formValues.email.valid && formValues.comments.valid)}>
          {formState.isLoading ? <div style={{padding: '0rem 1rem'}}><div className="loader"></div><span className="visually-hidden">Loading...</span></div> : 'Submit'}
        </Button>
      </Container>
    </Form>
  );
}

export default HomepageContactForm;