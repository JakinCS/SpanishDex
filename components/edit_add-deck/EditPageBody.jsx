'use client'

import BackButton from '@/components/BackButton'
import Button from "react-bootstrap/Button";
import Alert from 'react-bootstrap/Alert';
import UnderlineContainer from '@/components/UnderlineContainer';
import Form from 'react-bootstrap/Form'
import EditCardListItem from '@/components/edit_add-deck/EditCardListItem';
import AddCardArea from '@/components/edit_add-deck/AddCardArea';
import TitleEdit from '@/components/edit_add-deck/TitleEdit';
import { useRef, useState } from 'react';
import DiscardChangesModal from '../modals/DiscardChangesModal';
import MoreButton from './MoreButton';
import { useRouter } from 'next/navigation';
import UnsavedChangesModal from '../modals/UnsavedChangesModal';
import { editDeck } from '@/lib/actions';

const EditPageBody = ({ deckId, initialData }) => {
  const savedData = useRef(initialData); // This is used to keep track of what data is saved.
  const pendingData = useRef(null);

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

  const handleBackButtonClick = (e) => {
    e.preventDefault();

    const changes = getChanges(savedData.current, data);
    if (changes.title || changes.description || changes.deletedCards.length > 0 || changes.addedCards.length > 0 || changes.otherCards.length > 0) {
      openUnsavedChangesModal();
    } else {
      // If there are no changes, just go back
      router.back()
    }
  } 

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


  // This function finds out what has been changed on the page
  const getChanges = (savedData, newData) => {
    let changes = {
      title: savedData.title === newData.title ? undefined : newData.title,
      description: savedData.description === newData.description ? undefined : newData.description,
      deletedCards: [],
      addedCards: [],
      otherCards: []
    }

    changes.deletedCards = savedData.cards.filter((card) => !newData.cards.find((otherCard) => (card._id === otherCard._id)))

    newData.cards.forEach((card) => {
      const findResult = savedData.cards.find((otherCard) => (card._id === otherCard._id))
      if (!findResult) {
        changes.addedCards.push(card)
      } else {
        if (findResult.english !== card.english || findResult.spanish !== card.spanish) {
          changes.otherCards.push(card)
        }
      }
    })

    return changes;
  }

  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState({show: false, error: '', message: ''})

  const handleSaveChanges = async () => {
    const changes = getChanges(savedData.current, data);

    console.log({data, changes})
    console.log('savedData', savedData.current)

    if (!changes.title && !changes.description && changes.deletedCards.length == 0 && changes.addedCards.length == 0 && changes.otherCards.length == 0) {
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
        // Turn off the pending state and show success
        showSaved();
        setIsPending(false)

        // Update the savedData to the current data
        savedData.current = pendingData.current;

        if (result.newCardIds != null) {
          updateCardIds(changes.addedCards, result.newCardIds);
        }
      } else {
        // Handle error in editing deck
        setError({show: true, error: result.error, message: result.message})
        setIsPending(false);
      }
      console.log(result)
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
            {!isPending ? 'Save' : <div style={{padding: '0rem 1.75rem'}}><div className="loader"></div><span className="visually-hidden">Loading...</span></div>}
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

      <div className='mb-50'>
        { data.cards.map((card, index) => {
          return <EditCardListItem key={card._id} number={index + 1} cardId={card._id} spanish={card.spanish} english={card.english} className='mb-15' setState={setData}/>
        })}
      </div>

      { data.cards.length === 0 && (
        <p className='text-center mb-50'>There are no cards in this deck yet. Start by adding a card above.</p>
      )}

      <DiscardChangesModal show={showDiscardModal} closeModal={closeDiscardCard} deckId={deckId} deckTitle={data.title} />
      <UnsavedChangesModal show={showUnsavedChangesModal} closeModal={closeUnsavedChangesCard} />

    </>
  )
}

export default EditPageBody