import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { useState, useActionState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { deleteDeck } from '@/lib/actions';

const DeleteDeckModal = (props) => {
  const router = useRouter();

  // Whether or not the error banner should be displayed. Useful for being able to close the error banner.
  const [showError, setShowError] = useState(false);

  // The function that runs when the form is submitted
  const handleFormSubmit = async (prevState, fieldValues) => {

    try {

      const response = await deleteDeck(props.deck.id)

      if (!response.success) {
        setShowError(true)
        return {status: "ERROR", error: response.message, hiddenError: response?.error.toString()}

      } else if (response.success) {
        setShowError(false)
        
        // Redirect to the dashboard
        router.push('/dashboard')

        return {status: 'SUCCESS', error: '', hiddenError: ''}
      }

    } catch (error) {
      setShowError(true);
      return {status: 'ERROR', error: 'Unexpected error occurred. Please try again later.', hiddenError: error.toString()}
    }
  }

  const [formState, formAction, isPending] = useActionState(handleFormSubmit, {status: 'INITIAL', error: '', hiddenError: ''})

  // Use effect hook for disabling the modal close button (when the form is being submitted)
  // This effect hook is necessary because the button code is not accessible in this JSX file.
  useEffect(() => {
    if (document.querySelector('#deleteDeckModal .btn-close') !== null) {
      if (isPending) {
        document.querySelector('#deleteDeckModal .btn-close').disabled = true;
      } else {
        document.querySelector('#deleteDeckModal .btn-close').disabled = false;
      }
    }
  }, [isPending])

  return (
    <Modal id='deleteDeckModal' show={props.show} backdrop="static" onExited={() => setShowError(false)} onHide={props.closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title as='h2'>Delete Deck?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Alert variant="danger" className='mb-30' show={formState.status === "ERROR" && !isPending && showError} onClose={() => setShowError(false)} dismissible>
          <Alert.Heading>Error</Alert.Heading>
          {formState.error}
        </Alert>
        <p className="d-none text-break hiddenError">{formState.hiddenError}</p>
        <p className='mb-15'>Are you sure you want to delete this deck ({props.deck.title})?</p>
        <p className='mb-30'>This action is <span className='fw-semibold'>permanent</span>. The deck and all the cards in the deck cannot be recovered.</p>
        <Form action={formAction}>
          <Container fluid className="d-none d-xs_sm-flex gap-4 justify-content-end p-0">            
            <Button variant="gray" className='d-none d-sm-block' onClick={props.closeModal} disabled={isPending}>
              Cancel
            </Button>
            <Button variant="gray" className='d-block d-sm-none w-100' onClick={props.closeModal} disabled={isPending}>
              Cancel
            </Button>
            <Button variant="danger" className='d-none d-sm-block' type='submit' disabled={isPending}>
              {isPending ? <div style={{padding: '0rem 1rem'}}><div className="loader"></div><span className="visually-hidden">Loading...</span></div> : 'Delete Deck'}
            </Button>
            <Button variant="danger" className='d-block d-sm-none w-100' type='submit' disabled={isPending}>
              {isPending ? <div style={{padding: '0rem 1rem'}}><div className="loader"></div><span className="visually-hidden">Loading...</span></div> : 'Delete Deck'}
            </Button>
          </Container>
          <Container fluid className="d-flex d-xs_sm-none flex-column gap-4 justify-content-end p-0">       
            <Button variant="danger" className='d-block d-sm-none w-100' type='submit' disabled={isPending}>
              {isPending ? <div style={{padding: '0rem 1rem'}}><div className="loader"></div><span className="visually-hidden">Loading...</span></div> : 'Delete Deck'}
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

export default DeleteDeckModal