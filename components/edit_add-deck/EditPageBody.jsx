'use client'

import BackButton from '@/components/BackButton'
import Button from "react-bootstrap/Button";
import Alert from 'react-bootstrap/Alert';
import UnderlineContainer from '@/components/UnderlineContainer';
import Form from 'react-bootstrap/Form'
import EditCardListItem from '@/components/edit_add-deck/EditCardListItem';
import AddCardArea from '@/components/edit_add-deck/AddCardArea';
import TitleEdit from '@/components/edit_add-deck/TitleEdit';
import { useEffect, useRef, useState, useCallback } from 'react';
import DiscardChangesModal from '../modals/DiscardChangesModal';
import MoreButton from './MoreButton';
import { useRouter } from 'next/navigation';
import UnsavedChangesModal from '../modals/UnsavedChangesModal';
import { editDeck } from '@/lib/actions';

const EditPageBody = ({ deckId, initialData }) => {
  const savedData = useRef(initialData); // This is used to keep track of what data is saved.
  const pendingData = useRef(null); // This is used to keep track of what data is current "being sent or saved"

  const router = useRouter();

  // This state and respective functions handle the show/hide of the discard changes modal
  const [showDiscardModal, setShowDiscardModal] = useState(false);
  const openDiscardModal = () => {setShowDiscardModal(true)}
  const closeDiscardCard = () => {setShowDiscardModal(false)}
  
  // This state and respective functions handle the show/hide of the unsaved changes modal
  const [showUnsavedChangesModal, setShowUnsavedChangesModal] = useState(false);
  const openUnsavedChangesModal = () => {setShowUnsavedChangesModal(true)}
  const closeUnsavedChangesCard = () => {setShowUnsavedChangesModal(false)}

  // This is the state for all of the data associated with this deck.
  const [data, setData] = useState(initialData)

  // State for keeping track of whether the page is actively loading while saving
  const [isPending, setIsPending] = useState(false);

  // Holds error information from the save action
  const [error, setError] = useState({show: false, error: '', message: ''})

  const handleBackButtonClick = async (e) => {
    e.preventDefault();

    const deckHasChanges = areChanges();

    if (deckHasChanges) {
      openUnsavedChangesModal();
    } else {
      // If there are no changes, just go back

      // Have a purposeful little delay first
      await new Promise(res => setTimeout(res, 1000))

      router.push(`/dashboard/deck/${deckId}`)
    }
  } 

  // This function finds out what has been changed on the page
  const getChanges = useCallback((savedData, newData) => {
    let changes = {
      title: savedData.title === newData.title ? undefined : newData.title,
      description: savedData.description === newData.description ? undefined : newData.description,
      deletedCards: [],
      addedCards: [],
      otherCards: []
    }

    // Look for cards in the old (saved) data that aren't found in the new data. These cards have been deleted.
    changes.deletedCards = savedData.cards.filter((card) => !newData.cards.find((otherCard) => (card._id === otherCard._id)))

    // looping through all the cards of the new data
    newData.cards.forEach((card) => {
      // See if you can find this particular card of the new data in the old (saved) data
      const findResult = savedData.cards.find((otherCard) => (card._id === otherCard._id))
      // If not found in the old (saved) data, it must be an added card.
      if (!findResult) {
        changes.addedCards.push(card)
      } else {
        // At this point, the card is neither delete nor added. Check to see if it was modified.
        if (findResult.english !== card.english || findResult.spanish !== card.spanish) {
          changes.otherCards.push(card)
        }
      }
    }, [])

    return changes;
  })

  // This function returns a boolean of whether there are active changes to the deck 
  const areChanges = useCallback(() => {
    const deckChanges = getChanges(savedData.current, data);
    if (deckChanges.title !== undefined || deckChanges.description !== undefined || deckChanges.deletedCards.length > 0 || deckChanges.addedCards.length > 0 || deckChanges.otherCards.length > 0) {
      return true;
    }
    return false
  }, [data, getChanges])

  // This useEffect adds an event listener for the 'beforeunload' event, which is triggered when the user tries to leave the page.
  // It tries to prevent the user from leaving the page if there are unsaved changes.
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (deckHasChanges) {
        e.preventDefault();
        return (e.returnValue = '')
      } 
    }

    const deckHasChanges = areChanges();
    if (!deckHasChanges) {
      return;
    }

    window.addEventListener('beforeunload', handleBeforeUnload, {capture: true});

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload, {capture: true}); // Clean up the event listener
    }
  }, [isPending, areChanges]) // Added isPending for a dependency so that when changes are saved, it knows not to block a refresh

  const showSaved = () => {
    const paragraph = document.createElement("p");
    paragraph.textContent = "Saved";
    paragraph.className = 'text-green fw-semibold text-end lh-1 saved-paragraph has-animation';
    paragraph.style.marginTop = '-1.1rem';
    paragraph.style.marginBottom = '.1rem'
    document.getElementById("saved-changes-div").appendChild(paragraph);

    setTimeout(() => {
      paragraph.remove();
    }, 1500);
  }


  // This function edits the card information for the added cards, updating their ids so they can be re-edited
  const updateCardIds = (addedCards, newIds) => {
    if (addedCards.length === 0) return; // If there are no added cards, do nothing

    // Loop through the added cards and update their ids
    addedCards.forEach((card, index) => {
      const newId = newIds[index]; // Get the new id for this card
      setData((prevState) => {
        const newCardsArray = prevState.cards.map((c) => {
          if (c._id === card._id) {
            return {...c, _id: newId}; // Update the id of this card
          } else {
            return c; // Return the card as is
          }
        })
        return {...prevState, cards: newCardsArray}; // Return the updated state
      })

      savedData.current = {...savedData.current, cards: savedData.current.cards.map((c) => {
        if (c._id === card._id) {
          return {...c, _id: newId}; // Update the id of this card in the saved data
        } else {
          return c; // Return the card as is
        }
      })}

    })
  }


  const handleSaveChanges = async () => {
    const changes = getChanges(savedData.current, data);

    if (changes.title !== undefined && changes.description !== undefined && changes.deletedCards.length === 0 && changes.addedCards.length === 0 && changes.otherCards.length === 0) {
      setIsPending(true);
      setError((prev) => ({...prev, show: false}))
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 500);
      })
      setIsPending(false);
      showSaved();
      return;
    }

    try {
      setIsPending(true);
      setError((prev) => ({...prev, show: false}))

      pendingData.current = data; // Save the current data as pending data

      const result = await editDeck( deckId, changes );
      if (result.success) {

        // Update the savedData to the current data
        savedData.current = pendingData.current;

        if (result.newCardIds != null) {
          updateCardIds(changes.addedCards, result.newCardIds);
        }

        // Turn off the pending state and show success
        showSaved();
        setIsPending(false)

        // Refreshing helps to update the app with the newly added data. When the user clicks the back button, there's no issue
        router.refresh(); 
      } else {
        // Handle error in editing deck
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
      <Alert variant="danger" className='mb-30 modified-margin' show={error.show} onClose={() => setError((prev) => ({...prev, show: false}))} dismissible>
        <Alert.Heading>Error</Alert.Heading>
        {error.message}
      </Alert>
      <p className="d-none text-break hiddenError">{error.error}</p>

      <div id="saved-changes-div">
      </div>

      <div className='d-flex justify-content-between align-items-center mb-40'>
        <BackButton onClick={handleBackButtonClick}/>
        <div className='d-flex'>
          <Button variant='outline-danger' className='d-none d-sm_md-block me-15' onClick={openDiscardModal}>Discard Changes</Button>
          <Button variant='primary' className='d-none d-xs_sm-block' onClick={handleSaveChanges} disabled={isPending}>
            {!isPending ? 'Save Deck' : <div style={{padding: '0rem 1.75rem'}}><div className="loader"></div><span className="visually-hidden">Loading...</span></div>}
          </Button>
          <Button variant='primary' className='d-block d-xs_sm-none' onClick={handleSaveChanges} disabled={isPending}>
            {!isPending ? 'Save' : <div style={{padding: '0rem 0.3125rem'}}><div className="loader"></div><span className="visually-hidden">Loading...</span></div>}
          </Button>
          <MoreButton openModal={openDiscardModal} className='d-block d-sm_md-none ms-10' />
        </div>
      </div>
      
      <p>Title</p>
      <TitleEdit setState={setData} titleValue={data.title} />

      <p className='mt-30 mb-10'>Description</p>
      <Form.Control 
        className={data.description.length != 0 ? 'fw-normal' : ''}
        name='description' 
        as='textarea' 
        rows='5' 
        placeholder="Enter a description of your deck." 
        style={{maxWidth: '31.25rem'}}
        value={data.description}
        onChange={(e) => { setData(prev => ({...prev, description: e.target.value})) }}
      />

      <UnderlineContainer className='mt-40 mb-30'>
        <div className='d-flex align-items-center' style={{minHeight: '2.5rem'}}>
          <h3 className='fw-medium'>Add a Card</h3>
        </div>
      </UnderlineContainer>

      <AddCardArea setState={setData}/>

      <UnderlineContainer className='mt-50 mb-30'>
        <div className='d-flex align-items-center' style={{minHeight: '2.5rem'}}>
          <h3 className='fw-medium'>All Cards ({data.cards.length})</h3>
        </div>
      </UnderlineContainer>

      <div>
        { data.cards.map((card, index) => {
          return <EditCardListItem key={card._id} number={index + 1} cardId={card._id} spanish={card.spanish} english={card.english} className='mb-15' setState={setData}/>
        })}
      </div>

      { data.cards.length === 0 && (
        <p className='text-center'>There are no cards in this deck yet. Start by adding a card above.</p>
      )}

      <DiscardChangesModal show={showDiscardModal} closeModal={closeDiscardCard} deckId={deckId} deckTitle={data.title} />
      <UnsavedChangesModal show={showUnsavedChangesModal} closeModal={closeUnsavedChangesCard} />

    </>
  )
}

export default EditPageBody