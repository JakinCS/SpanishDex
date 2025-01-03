'use client'

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack"
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container"
import { useState } from "react";

const ResetPasswordModal = (props) => {

  const [showSuccess, setShowSuccess] = useState(false)

  return (
    <Modal show={props.show} onShow={() => setShowSuccess(false)} onHide={props.handleClose} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title as='h2'>Reset Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack gap={5}>
          <p>
            {showSuccess ?
            'Email sent. Please check your inbox for the email containing instructions on resetting your password.' :
            'Please enter your email address below, and we will send you an email with instructions for resetting your password.'
            }            
          </p>
          <Form>
            {showSuccess ? null :
              <Form.Group className='mb-5' controlId="resetPasswordEmail">
                <Form.Label className="fw-medium">Email Address</Form.Label>
                <Form.Control type="text" placeholder="email address" />
              </Form.Group> 
            }            
            <Container fluid className="d-flex gap-4 justify-content-end p-0">
              {showSuccess ?
                <Button variant="gray" onClick={props.handleClose}>
                  Close
                </Button> :
                <Button variant="gray" onClick={() => {props.handleClose(); props.openLogInModal()}}>
                  Back
                </Button>
              }
              {showSuccess ?
                <Button variant="primary" onClick={() => {props.handleClose(); props.openLogInModal()}}>
                  Return To Log In
                </Button> :
                <Button variant="primary" onClick={() => {setShowSuccess(true)}}>
                  Send Email
                </Button>
              }
            </Container>
          </Form>
        </Stack>
      </Modal.Body>
    </Modal>
  )
}

export default ResetPasswordModal