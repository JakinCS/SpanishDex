import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { useRouter } from "next/navigation";
import { useState } from 'react';

const DiscardChangesModal = ({deckTitle, deckId, ...props}) => {
  const router = useRouter();

  // State to for showing a loading spinner and disabling elements while it is loading.
  const [isPending, setIsPending] = useState(false)

  // This function runs when the user clicks the 'discard changes' button
  const handleDiscardChanges = async () => {
    setIsPending(true)

    // Redirect either to the deck page or the dashboard.
    if (deckId != null) {
      // Redirect to the deck view page
      router.push(`/dashboard/deck/${deckId}`)
    } else {
      // Redirect to the dashboard
      router.push('/dashboard')
    }
  }

  return (
    <Modal id='discardChangesModal' show={props.show} backdrop="static" onHide={props.closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title as='h2'>Confirm Discard</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className='mb-30'>Are you sure you want to discard your changes to {deckTitle}?</p>
        <Form action={handleDiscardChanges}>
          <Container fluid className="d-none d-xs_sm-flex gap-4 justify-content-end p-0">            
            <Button variant="gray" className='d-none d-sm-block' onClick={props.closeModal} disabled={isPending}>
              Cancel
            </Button>
            <Button variant="gray" className='d-block d-sm-none w-100' onClick={props.closeModal} disabled={isPending}>
              Cancel
            </Button>
            <Button variant="danger" className='d-none d-sm-block' onClick={handleDiscardChanges} disabled={isPending}>
              {isPending ? <div style={{padding: '0rem 1rem'}}><div className="loader"></div><span className="visually-hidden">Loading...</span></div> : 'Discard Changes'}
            </Button>
            <Button variant="danger" className='d-block d-sm-none w-100' onClick={handleDiscardChanges} disabled={isPending}>
              {isPending ? <div style={{padding: '0rem 1rem'}}><div className="loader"></div><span className="visually-hidden">Loading...</span></div> : 'Discard Changes'}
            </Button>
          </Container>
          <Container fluid className="d-flex d-xs_sm-none flex-column gap-4 justify-content-end p-0">       
            <Button variant="danger" className='d-block d-sm-none w-100' onClick={handleDiscardChanges} disabled={isPending}>
              {isPending ? <div style={{padding: '0rem 1rem'}}><div className="loader"></div><span className="visually-hidden">Loading...</span></div> : 'Discard Changes'}
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

export default DiscardChangesModal