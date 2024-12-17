'use client'
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack"
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container"
import IconButton from "../IconButton";
import { useState } from 'react'

function CreateAccountModal(props) {
  // State for keeping track of password show/hide state
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  }

  const [showPassword2, setShowPassword2] = useState(false);
  const togglePassword2Visibility = () => {
    setShowPassword2(prevState => !prevState);
  }

  // State for storing the validity of the form
  const [formValidity, setFormValidity] = useState({username: null, usernameMsg: null, password: null, password2: null})

  /* 
    Min Length: 2
    Max Length: 25
    Characters: numbers, letters, underscores
    General RegEx: no spaces before, in-between, or afterwards
  
  
  */
  // Function to check and update the validity of the username
  const checkUsernameValidity = (e) => {
    const currUsername = e.target.value;

    let valid = true;
    let message = '';

    if (currUsername.trim().length === 0) {
      valid = false;
      message = 'Username is required'
    } else if (currUsername.length < 2) {
      valid = false;
      message = 'The username must be at least 2 characters'
    } else if (currUsername.length > 25) {
      valid = false;
      message = 'The username cannot be longer than 25 characters'
    } else if (!/\W+/.test(currUsername)) {
      valid = false;
      message = 'Please only use letters, numbers and underscores'
    } else if (/ +/.test(currUsername)) {
      valid = false;
      message = 'Please do not use spaces in your username'
    } else if (/^\w+$/.test(currUsername)) {
      valid = false;
      message = 'Username is invalid'
    }

    if (!valid) setFormValidity(prevState => ({...prevState, username: false, usernameMsg: message}));
    else setFormValidity(prevState => ({...prevState, username: true, usernameMsg: message}));

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

  // Function to check and update the validity of the password (can't be blank)
  const checkPassword2Validity = (e) => {
    const currPassword2 = e.target.value;
    if (currPassword2.trim().length === 0) {
      setFormValidity(prevState => ({...prevState, password2: false}))
    } else {
      setFormValidity(prevState => ({...prevState, password2: true}))
    }
  }

  // Function for resetting the validity state (useful when triggered on 'modal open')
  const resetValidityState = () => {setFormValidity({username: null, usernameMsg: null, password: null, password2: null})}

  return (
    <Modal show={props.show} onShow={() => {setShowPassword(false); setShowPassword2(false); resetValidityState()}} onHide={props.handleClose} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title as='h2'>Create Account</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack gap={5}>
          <p>Sign up for a SpanishDex account.</p>
          <Form>
            <Form.Group className="mb-5" controlId="createAccountUsername">
              <Form.Label className="fw-medium">Username</Form.Label>
              <Form.Control onBlur={checkUsernameValidity} className={formValidity.username === false && 'is-invalid'} type="text" placeholder="username" />
              <Form.Control.Feedback type="invalid">
                {formValidity.usernameMsg}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-5" controlId="createAccountEmail">
              <Form.Label className="fw-medium">Email (optional)</Form.Label>
              <Form.Control type="text" placeholder="email" />
            </Form.Group>
            <Form.Group className="mb-5" controlId="createAccountPassword">
              <Form.Label className="fw-medium">Password</Form.Label>
              <Container className="d-flex gap-3 p-0">
                <div className="w-100">
                  <Form.Control type={showPassword ? 'text' : 'password'} placeholder="password" onBlur={checkPasswordValidity} className={formValidity.password === false && 'is-invalid'} />
                </div>
                <div className="d-flex align-items-center">
                  <IconButton variant='light' iconSrc={showPassword ? '/icons/hide.svg' : '/icons/show.svg'} onClick={togglePasswordVisibility}/>           
                </div>
              </Container>
              <Form.Control.Feedback className={formValidity.password === false && 'd-block'} type="invalid">
                Password is required
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-5" controlId="createAccountPassword2">
              <Form.Label className="fw-medium">Confirm Password</Form.Label>
              <Container className="d-flex gap-3 p-0">
                <div className="w-100">
                  <Form.Control type={showPassword2 ? 'text' : 'password'} placeholder="password" onBlur={checkPassword2Validity} className={formValidity.password2 === false && 'is-invalid'} />
                </div>
                <div className="d-flex align-items-center">
                  <IconButton variant='light' iconSrc={showPassword2 ? '/icons/hide.svg' : '/icons/show.svg'} onClick={togglePassword2Visibility}/>           
                </div>
              </Container>
              <Form.Control.Feedback className={formValidity.password2 === false && 'd-block'} type="invalid">
                Password is required
              </Form.Control.Feedback>
            </Form.Group>
            <Container fluid className="d-flex gap-4 justify-content-end p-0">
              <Button variant="gray" onClick={props.handleClose}>
                Cancel
              </Button>
              <Button variant="primary" onClick={props.handleClose} disabled={!(formValidity.username && formValidity.password && formValidity.password2)}>
                Sign Up
              </Button>
            </Container>
          </Form>
          <p>Already have an account? <a href="#" onClick={() => {props.handleClose(); props.openLogInModal()}}>Log In</a></p>
        </Stack>
      </Modal.Body>
    </Modal>
  );
}

export default CreateAccountModal;
