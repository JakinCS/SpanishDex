'use client'
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack"
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container"
import IconButton from "../IconButton";
import { useState } from "react";

function LogInModal(props) {

  // State for the status of the show/hide password button
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  }

  // State for storing the validity of the form
  const [formValidity, setFormValidity] = useState({username: null, password: null})

  // Function to check and update the validity of the username/email (can't be blank)
  const checkUsernameValidity = (e) => {
    const currUsername = e.target.value;
    if (currUsername.trim().length === 0) {
      setFormValidity(prevState => ({...prevState, username: false}))
    } else {
      setFormValidity(prevState => ({...prevState, username: true}))
    }
  }

  // Function to check and update the validity of the password (can't be blank)
  const checkPasswordValidity = (e) => {
    const currPassword = e.target.value;
    if (currPassword.trim().length === 0) {
      setFormValidity(prevState => ({...prevState, password: false}))
    } else {
      setFormValidity(prevState => ({...prevState, password: true}))
    }
  }

  // Function for resetting the validity state (useful when triggered on 'modal open')
  const resetValidityState = () => {setFormValidity({username: null, password: null})}

  return (
    <Modal show={props.show} onShow={() => {setShowPassword(false); resetValidityState()}} onHide={props.handleClose} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title as='h2'>Log In</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack gap={5}>
          <p>Log in to SpanishDex with your existing account.</p>
          <Form >
            <Form.Group className="mb-5" controlId="logInUsername">
              <Form.Label className="fw-medium">Username or Email</Form.Label>
              <Form.Control onBlur={checkUsernameValidity} className={formValidity.username === false && 'is-invalid'} type="text" placeholder="username or email" required/>
              <Form.Control.Feedback type="invalid">
                Username is required
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-5" controlId="logInPassword">
              <Form.Label className="fw-medium">Password</Form.Label>
              <Container className="d-flex gap-3 p-0">
                <div className="w-100">
                  <Form.Control type={showPassword ? 'text' : 'password'} onBlur={checkPasswordValidity} className={formValidity.password === false && 'is-invalid'} placeholder="password" required/>
                </div>
                <div className="d-flex align-items-center">
                  <IconButton variant='light' iconSrc={showPassword ? '/icons/hide.svg' : '/icons/show.svg'} onClick={togglePasswordVisibility}/>           
                </div>
              </Container>    
              <Form.Control.Feedback className={formValidity.password === false && 'd-block'} type="invalid">
                Password is required
              </Form.Control.Feedback>
              <p style={{marginTop: '0.3125rem', textAlign: 'right'}}>
                <a href="#" onClick={() => {props.handleClose(); props.openResetPasswordModal()}}>Forgot Password?</a>
              </p>
            </Form.Group>
            <Container fluid className="d-flex gap-4 justify-content-end p-0">
              <Button variant="gray" onClick={props.handleClose}>
                Cancel
              </Button>
              <Button variant="primary" onClick={props.handleClose} disabled={!(formValidity.username && formValidity.password)}>
                Log In
              </Button>
            </Container>
          </Form>
          <p>Don’t have an account? <a href='#' onClick={() => {props.handleClose(); props.openSignUpModal()}}>Sign Up</a></p>
        </Stack>
      </Modal.Body>
    </Modal>
  );
}

export default LogInModal;
