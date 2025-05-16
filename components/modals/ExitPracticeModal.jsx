import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';

const ExitPracticeModal = ({...props}) => {

  // State to for showing a loading spinner and disabling elements while it is loading.
  const [isPending, setIsPending] = useState(false)

  // This function runs when the user clicks the 'discard changes' button
  const handleExitPractice = async () => {
    setIsPending(true)

    await props.finishPractice();

    props.closeModal();
  }

  return (
    <Modal id='exitPracticeModal' show={props.show} backdrop="static" onHide={props.closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title as='h2'>Exit Practice?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className='mb-10'>Are you sure you want to leave this practice session?</p>
        <p className='mb-30'>(Results of already practiced flashcards are saved)</p>
        <Form action={handleExitPractice}>
          <Container fluid className="d-none d-xs_sm-flex gap-4 justify-content-end p-0">            
            <Button variant="gray" className='d-none d-sm-block' onClick={props.closeModal} disabled={isPending}>
              Cancel
            </Button>
            <Button variant="gray" className='d-block d-sm-none w-100' onClick={props.closeModal} disabled={isPending}>
              Cancel
            </Button>
            <Button variant="danger" className='d-none d-sm-block' onClick={handleExitPractice} disabled={isPending}>
              {isPending ? <div style={{padding: '0rem 1rem'}}><div className="loader"></div><span className="visually-hidden">Loading...</span></div> : 'Leave Practice'}
            </Button>
            <Button variant="danger" className='d-block d-sm-none w-100' onClick={handleExitPractice} disabled={isPending}>
              {isPending ? <div style={{padding: '0rem 1rem'}}><div className="loader"></div><span className="visually-hidden">Loading...</span></div> : 'Leave'}
            </Button>
          </Container>
          <Container fluid className="d-flex d-xs_sm-none flex-column gap-4 justify-content-end p-0">       
            <Button variant="danger" className='d-block d-sm-none w-100' onClick={handleExitPractice} disabled={isPending}>
              {isPending ? <div style={{padding: '0rem 1rem'}}><div className="loader"></div><span className="visually-hidden">Loading...</span></div> : 'Leave Practice'}
            </Button>     
            <Button variant="gray" className='d-block d-sm-none w-100' onClick={props.closeModal} disabled={isPending}>
              Cancel
            </Button>
          </Container>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default ExitPracticeModal