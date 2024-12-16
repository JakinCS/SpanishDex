'use client'
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack"
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container"
import IconButton from "../IconButton";
import { useState } from "react";

function LogInModal(props) {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  }

  return (
    <Modal show={props.show} onHide={props.handleClose} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title as='h2'>Log In</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack gap={5}>
          <p>Log in to SpanishDex with your existing account.</p>
          <Form>
            <Form.Group className="mb-5" controlId="logInUsername">
              <Form.Label className="fw-medium">Username or Email</Form.Label>
              <Form.Control type="text" placeholder="username or email" />
            </Form.Group>
            <Form.Group className="mb-5" controlId="logInPassword">
              <Form.Label className="fw-medium">Password</Form.Label>
              <Container className="d-flex gap-3 p-0">
                <div className="w-100">
                  <Form.Control type={showPassword ? 'text' : 'password'} placeholder="password" />
                </div>
                <div className="d-flex align-items-center">
                  <IconButton variant='light' iconSrc={showPassword ? '/icons/hide.svg' : '/icons/show.svg'} onClick={togglePasswordVisibility}/>           
                </div>
              </Container>              
              <p style={{marginTop: '0.3125rem', textAlign: 'right'}}>
                <a href="#" onClick={() => {props.handleClose(); props.openResetPasswordModal()}}>Forgot Password?</a>
              </p>
            </Form.Group>
            <Container fluid className="d-flex gap-4 justify-content-end p-0">
              <Button variant="gray" onClick={props.handleClose}>
                Cancel
              </Button>
              <Button variant="primary" onClick={props.handleClose}>
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
