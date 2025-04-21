import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { useRouter } from "next/navigation";
import { useState } from 'react';

const UnsavedChangesModal = ({...props}) => {
  const router = useRouter();

  // State to for showing a loading spinner and disabling elements while it is loading.
  const [isPending, setIsPending] = useState(false)

  // This function runs when the user clicks the 'discard changes' button
  const handleDiscardChanges = async () => {
    setIsPending(true)

    // Add delay so that the process doesn't happen so quickly.
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    })

    // Go back to the previous page
    router.back()
  }

  return (
    <Modal id='unsavedChangesModal' show={props.show} backdrop="static" onHide={props.closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title as='h2'>Discard Changes?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className='mb-10'>You have unsaved changes! Are you sure you want to go back?</p>
        <p className='mb-30'>You will lose your changes to this deck.</p>
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
              {isPending ? <div style={{padding: '0rem 1rem'}}><div className="loader"></div><span className="visually-hidden">Loading...</span></div> : 'Discard'}
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

export default UnsavedChangesModal