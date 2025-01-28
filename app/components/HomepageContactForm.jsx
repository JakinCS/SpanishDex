'use client'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Alert from "react-bootstrap/Alert";
import { useState } from 'react';

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
    let isValid = false;
    let message = '';

    if (name.trim().length === 0) {
      message = 'Name is required'
    } else {
      isValid = true;
    }

    setFormValues((prev) => ({...prev, name: {...prev.name, valid: isValid, message: message}}));
  }

  // This function validates the input string to ensure it is a valid email
  const validateEmail = (email) => {
    let regexExpression = /^([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@([0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?(\.[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?)*|\[((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|IPv6:((((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){6}|::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){5}|[0-9A-Fa-f]{0,4}::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){4}|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):)?(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){3}|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,2}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){2}|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,3}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,4}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::)((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3})|(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3})|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,5}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3})|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,6}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::)|(?!IPv6:)[0-9A-Za-z-]*[0-9A-Za-z]:[!-Z^-~]+)])$/
    let isValid = false;
    let message = '';

    if (email.trim().length === 0) {
      message = 'Email address is required';
    } else if (!regexExpression.test(email)) {
      message = 'Invalid email address'
    } else {
      isValid = true;
    }

    setFormValues((prev) => ({...prev, email: {...prev.email, valid: isValid, message: message}}));
  }

  // This function validates the input string to ensure it is a valid comment
  const validateComments = (comment) => {
    let isValid = false;
    let message = '';

    if (comment.trim().length === 0) {
      message = 'Message field is required'
    } else {
      isValid = true;
    }

    setFormValues((prev) => ({...prev, comments: {...prev.comments, valid: isValid, message: message}}));
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
      // Query the contact API

      // throw('error')

      // Update the form state to show that the form was successfully submitted
      setFormState((prev) => ({...prev, showSuccess: true, successAcknowledged: false}))

      // Reset the form values
      resetForm();

    } catch (error) {
      // Update the form state to show that an error occurred
      setFormState((prev) => ({...prev, serverError: true, serverMessage: 'temp', errorAcknowledged: false}))
    } finally {
      // Update the form state to show that the form is no longer loading
      setFormState((prev) => ({...prev, isLoading: false}))
    }
  }

  return (
    <Form {...props}>
      <Alert className='mb-20' variant="danger" show={formState.serverError && formState.errorAcknowledged === false} dismissible>
        <Alert.Heading>Error</Alert.Heading>
        {formState.serverMessage || 'An error occurred while submitting the form. Please try again later.'}
      </Alert>
      <Alert className='mb-20' variant="success" show={formState.showSuccess && formState.successAcknowledged === false} onClose={acknowledgeSuccessBanner} dismissible>
        <Alert.Heading>Success</Alert.Heading>
        Your message has been sent successfully.
      </Alert>
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
            Submit
        </Button>
      </Container>
    </Form>
  );
}

export default HomepageContactForm;