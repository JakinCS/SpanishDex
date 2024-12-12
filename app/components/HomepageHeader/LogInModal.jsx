'use client'
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack"
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container"

function LogInModal(props) {
  return (
    <Modal show={props.show} onHide={props.handleClose} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title as='h2'>Log In</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack gap={5}>
          {/* <h2>Log In</h2> */}
          <p>Log in to SpanishDex with your existing account.</p>
          <Form>
            <Form.Group className="mb-5" controlId="userUsername">
              <Form.Label className="fw-medium">Username or Email</Form.Label>
              <Form.Control type="text" placeholder="username or email" />
            </Form.Group>
            <Form.Group className="mb-5" controlId="userPassword">
              <Form.Label className="fw-medium">Password</Form.Label>
              <Form.Control type="password" placeholder="password" />
              <p style={{marginTop: '0.3125rem', textAlign: 'right'}}>
                <a href="#">Forgot Password?</a>
              </p>
            </Form.Group>
            <Container fluid className="d-flex gap-4 justify-content-end p-0">
              <Button variant="gray" onClick={props.handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={props.handleClose}>
                Log In
              </Button>
            </Container>
          </Form>
          <p>Don’t have an account? <a href='#'>Sign Up</a></p>
        </Stack>
      </Modal.Body>
    </Modal>
  );
}

export default LogInModal;
