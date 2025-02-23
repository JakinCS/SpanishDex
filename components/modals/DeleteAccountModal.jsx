import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

const DeleteAccountModal = (props) => {

  let isPending = false;

  return (
    <Modal show={props.show} backdrop="static" onHide={props.closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title as='h2'>Delete Account</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack gap={5}>
          <Alert variant="danger" show={false} dismissible>
            <Alert.Heading>Error</Alert.Heading>
            formState.error
          </Alert>
          <p className="d-none text-break hiddenError">serverError</p>
          <Form>
            <Form.Group className="mb-30" controlId="password_safeguard">
              <Form.Label className="fw-medium">Enter Password To Delete</Form.Label>
              <Form.Control name="password" type="text" placeholder="password" required/>
              <Form.Control.Feedback type="invalid">
                Email is required
              </Form.Control.Feedback>
            </Form.Group>
            <Container fluid className="d-flex gap-4 justify-content-end p-0">            
              <Button variant="gray" onClick={props.closeModal}>
                Cancel
              </Button>
              <Button variant="primary" type='submit'>
                {isPending ? <div style={{padding: '0rem 1rem'}}><div className="loader"></div><span className="visually-hidden">Loading...</span></div> : 'Save'}
              </Button>
            </Container>
          </Form>
        </Stack>
      </Modal.Body>
    </Modal>
  )
}

export default DeleteAccountModal