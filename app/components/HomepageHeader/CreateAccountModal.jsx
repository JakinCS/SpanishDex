'use client'
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack"
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container"

function CreateAccountModal(props) {


  return (
    <Modal show={props.show} onHide={props.handleClose} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title as='h2'>Create Account</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack gap={5}>
          <p>Sign up for a SpanishDex account.</p>
          <Form>
            <Form.Group className="mb-5" controlId="createAccountUsername">
              <Form.Label className="fw-medium">Username</Form.Label>
              <Form.Control type="text" placeholder="username" />
            </Form.Group>
            <Form.Group className="mb-5" controlId="createAccountEmail">
              <Form.Label className="fw-medium">Email (optional)</Form.Label>
              <Form.Control type="text" placeholder="email" />
            </Form.Group>
            <Form.Group className="mb-5" controlId="createAccountPassword">
              <Form.Label className="fw-medium">Password</Form.Label>
              <Form.Control type="password" placeholder="password" />
            </Form.Group>
            <Form.Group className="mb-5" controlId="createAccountPassword2">
              <Form.Label className="fw-medium">Confirm Password</Form.Label>
              <Form.Control type="password" placeholder="password" />
            </Form.Group>
            <Container fluid className="d-flex gap-4 justify-content-end p-0">
              <Button variant="gray" onClick={props.handleClose}>
                Cancel
              </Button>
              <Button variant="primary" onClick={props.handleClose}>
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
