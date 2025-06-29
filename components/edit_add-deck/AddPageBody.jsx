'use client'

import BackButton from '@/components/miscellaneous/BackButton'
import Button from "react-bootstrap/Button";
import Alert from 'react-bootstrap/Alert';
import UnderlineContainer from '@/components/utils/UnderlineContainer';
import Form from 'react-bootstrap/Form'
import EditCardListItem from '@/components/edit_add-deck/EditCardListItem';
import AddCardArea from '@/components/edit_add-deck/AddCardArea';
import TitleEdit from '@/components/edit_add-deck/TitleEdit';
import { useState, useEffect } from 'react';
import DiscardChangesModal from '../modals/DiscardChangesModal';
import MoreButton from './MoreButton';
import { useRouter } from 'next/navigation';
import UnsavedChangesModal from '../modals/UnsavedChangesModal';
import { createDeck } from '@/lib/actions';

const AddPageBody = ({ initialData }) => {
  const router = useRouter();

  // This state and respective functions handle the show/hide of the discard changes modal
  const [showDiscardModal, setShowDiscardModal] = useState(false);
  const openDiscardModal = () => {setShowDiscardModal(true)}
  const closeDiscardModal = () => {setShowDiscardModal(false)}
  
  // This state and respective functions handle the show/hide of the unsaved changes modal
  const [showUnsavedChangesModal, setShowUnsavedChangesModal] = useState(false);
  const openUnsavedChangesModal = () => {setShowUnsavedChangesModal(true)}
  const closeUnsavedChangesCard = () => {setShowUnsavedChangesModal(false)}

  // This is the state for all of the data associated with this deck.
  const [data, setData] = useState(initialData)

  const handleBackButtonClick = (e) => {
    e.preventDefault();

    if (hasChanges(initialData, data)) {
      openUnsavedChangesModal();
    } else {
      // If there are no changes, just go back
      router.back()
    }
  } 

  // This function determines whether there are any changes or not.
  const hasChanges = (initialData, newData) => {
    if (initialData.title !== newData.title) return true;
    if (initialData.description !== newData.description) return true;
    if (newData.cards.length > 0) return true;
    return false;
  }

  // This useEffect adds an event listener for the 'beforeunload' event, which is triggered when the user tries to leave the page.
  // It tries to prevent the user from leaving the page if there are unsaved changes.
  useEffect(() => {
    const newfunction = (e) => {
      if (hasChanges(initialData, data)) {
        e.preventDefault();
        return (e.returnValue = '')
      } 
    }

    if (!hasChanges(initialData, data)) {
      return;
    }

    window.addEventListener('beforeunload', newfunction, {capture: true});

    return () => {
      window.removeEventListener('beforeunload', newfunction, {capture: true}); // Clean up the event listener
    }
  }, [data, initialData])

  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState({show: false, error: '', message: ''})

  // This function is run when the save button is clicked. It handles the logic for saving the deck.
  const handleSaveChanges = async () => {

    try {
      setIsPending(true);
      setError((prev) => ({...prev, show: false}))

      const result = await createDeck(data.title, data.description, data.cards);
      if (result.success) {
        // If the deck was created successfully, redirect to the deck page
        router.replace(`/dashboard/deck/${result.deckId}`);
      } else {
        // Handle error in creating deck
        setError({show: true, error: result.error, message: result.message})
        setIsPending(false);
      }
    } catch (error) {
      setError({show: true, error: error.toString(), message: "Unexpected error occurred. Please try again."});
      setIsPending(false);
    }
  }

  return (
    <>
      <Alert 
        variant="danger" 
        className='mb-30 modified-margin' 
        aria-live="polite"
        show={error.show} 
        onClose={() => setError((prev) => ({...prev, show: false}))} 
        dismissible
      >
        <Alert.Heading>Error</Alert.Heading>
        {error.message}
      </Alert>
      <p className="d-none text-break hiddenError">{error.error}</p>
      
      <div className='d-flex justify-content-between align-items-center mb-40'>
        <BackButton onClick={handleBackButtonClick}/>
        <div className='d-flex'>
          <Button variant='outline-danger' className='d-none d-sm_md-block me-15' onClick={openDiscardModal} disabled={isPending}>Discard Changes</Button>
          <Button variant='primary' className='d-none d-xs_sm-block' onClick={handleSaveChanges} disabled={isPending}>
            {!isPending ? 'Save Deck' : <div style={{padding: '0rem 1.75rem'}}><div className="loader"></div><span className="visually-hidden">Loading...</span></div>}
          </Button>
          <Button variant='primary' className='d-block d-xs_sm-none' onClick={handleSaveChanges} disabled={isPending}>
            {!isPending ? 'Save' : <div style={{padding: '0rem 0.3125rem'}}><div className="loader"></div><span className="visually-hidden">Loading...</span></div>}
          </Button>
          <MoreButton openModal={openDiscardModal} className='d-block d-sm_md-none ms-10' />
        </div>
      </div>

      <section>
        <p>Title</p>
        <TitleEdit setState={setData} titleValue={data.title} />

        <p className='mt-30 mb-10' id="deck-description-label">Description</p>
        <Form.Control 
          className={data.description.length != 0 ? 'fw-normal' : ''}
          name='description' 
          as='textarea' 
          aria-labelledby='deck-description-label'
          rows='5' 
          placeholder="Enter a description of your deck." 
          style={{maxWidth: '31.25rem'}}
          value={data.description}
          onChange={(e) => { setData(prev => ({...prev, description: e.target.value})) }}
        />
      </section>

      <section>
        <UnderlineContainer className='mt-40 mb-30'>
          <div className='d-flex align-items-center' style={{minHeight: '2.5rem'}}>
            <h2 className='fw-medium fs-3'>Add a Card</h2>
          </div>
        </UnderlineContainer>

        <AddCardArea setState={setData}/>
      </section>

      <section>
        <UnderlineContainer className='mt-50 mb-30'>
          <div className='d-flex align-items-center' style={{minHeight: '2.5rem'}}>
            <h2 className='fw-medium fs-3'>All Cards ({data.cards.length})</h2>
          </div>
        </UnderlineContainer>

        <ul style={{marginBottom: 0, paddingLeft: 0}}>
          { data.cards.map((card, index) => {
            return <EditCardListItem key={card._id} number={index + 1} cardId={card._id} spanish={card.spanish} english={card.english} className='mb-15' setState={setData}/>
          })}
        </ul>

        { data.cards.length === 0 && (
          <p className='text-center'>There are no cards in this deck yet. Start by adding a card above.</p>
        )}
      </section>

      <DiscardChangesModal show={showDiscardModal} closeModal={closeDiscardModal} deckTitle={data.title} />
      <UnsavedChangesModal show={showUnsavedChangesModal} closeModal={closeUnsavedChangesCard} />

    </>
  )
}

export default AddPageBody