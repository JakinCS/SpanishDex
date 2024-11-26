'use client'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';

function HomepageContactForm(props) {
  return (
    <Form {...props}>
      <Form.Group className="mb-20" controlId="userName">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter your name" />
      </Form.Group>
      <Form.Group className="mb-20" controlId="userEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter your email" />
      </Form.Group>
      <Form.Group className="mb-5" controlId="userMessage">
        <Form.Label>Comments or Questions</Form.Label>
        <Form.Control as='textarea' rows='5' placeholder="Write your message" />
      </Form.Group>
      <Container fluid className='d-flex justify-content-center'>
        <Button variant="primary" type="submit">
            Submit
        </Button>
      </Container>
    </Form>
  );
}

export default HomepageContactForm;