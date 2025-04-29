import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

const DeleteCardModal = ({englishWord, spanishWord, deleteCard, ...props}) => {

  // This function runs the passed in 'deleteCard' function.
  const handleDeleteCard = () => {
    deleteCard();
    props.closeModal()
  }

  return (
    <Modal id='deleteCardModal' show={props.show} backdrop="static" onHide={props.closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title as='h2'>Delete Card?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className='mb-30'>Are you sure you want to delete this card?</p>
        <p className='text-primary fw-semibold fs-5 lh-1 mb-10'>Spanish</p>
        <div className={'d-flex bg-white rounded border border-1point5 w-100 h-100 mb-20'} style={{minHeight: '2.5rem', overflow: 'hidden'}}>
          <p className='mx-20 py-3 text-break lh-sm'>{spanishWord}</p>
        </div>
        <p className='text-primary fw-semibold fs-5 lh-1 mb-10'>English</p>
        <div className={'d-flex bg-white rounded border border-1point5 w-100 h-100 mb-40'} style={{minHeight: '2.5rem', overflow: 'hidden'}}>
          <p className='mx-20 py-3 text-break lh-sm'>{englishWord}</p>
        </div>
        <Form action={handleDeleteCard}>
          <Container fluid className="d-none d-xs_sm-flex gap-4 justify-content-end p-0">            
            <Button variant="gray" className='d-none d-sm-block' onClick={props.closeModal}>
              Cancel
            </Button>
            <Button variant="gray" className='d-block d-sm-none w-100' onClick={props.closeModal}>
              Cancel
            </Button>
            <Button variant="danger" className='d-none d-sm-block' type='submit'>
              Delete Card
            </Button>
            <Button variant="danger" className='d-block d-sm-none w-100' type='submit'>
              Delete Card
            </Button>
          </Container>
          <Container fluid className="d-flex d-xs_sm-none flex-column gap-4 justify-content-end p-0">       
            <Button variant="danger" className='d-block d-sm-none w-100' type='submit'>
              Delete Card
            </Button>     
            <Button variant="gray" className='d-block d-sm-none w-100' onClick={props.closeModal}>
              Cancel
            </Button>
          </Container>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default DeleteCardModal