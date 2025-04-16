'use client'

import { useEffect, useRef, useState } from 'react';
import IconButton from '@/components/IconButton';
import Form from 'react-bootstrap/Form'
import ExtraLetters from './ExtraLetters';
import DeleteCardModal from '../modals/DeleteCardModal';

const EditCardListItem = ({ number, cardId, english, spanish, setState, ...props }) => {
  // The show/hide state of the delete card modal.
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const openDeleteCard = () => {setShowDeleteModal(true)}  // Handles setting the state to show the modal
  const closeDeleteCard = () => {setShowDeleteModal(false)} // Handles setting the state to hide the modal

  const spanishInputRef = useRef(null) // A reference to the input field for the spanish word

  // The state for the value of the english input field
  const [englishWord, setEnglishWord] = useState(english || '')
  // This function is run when the user makes a change on the english word input field
  const updateEnglishWord = (e) => { 
    // Updates the englishWord state with the new input value.
    setEnglishWord(e.target.value) 

    // Finds this card's information in the main page's state's list of cards and updates it.
    setState((prevState) => {
      const newCardsArray = prevState.cards.map((card) => {
        if (card.id === cardId) {
          return {id: card.id, english: e.target.value, spanish: spanishWord}
        } else {
          return card
        }
      })

      return {...prevState, cards: newCardsArray};
    })
  }

  // The state for the value of the spanish input field
  const [spanishWord, setSpanishWord] = useState(spanish || '')
  // This function is run when the user makes a change on the spanish word input field
  const updateSpanishWord = (e) => { 
    // Updates the spanishWord state with the new input value.
    setSpanishWord(e.target.value) 

    // Finds this card's information in the main page's state's list of cards and updates it.
    setState((prevState) => {      
      const newCardsArray = prevState.cards.map((card) => {
        if (card.id === cardId) {
          return {id: card.id, english: englishWord, spanish: e.target.value}
        } else {
          return card
        }
      })

      return {...prevState, cards: newCardsArray};
    })
  }

  // This state fulfills the special need to have a class named 'focus' on the spanish word input
  // This state is updated when the input is 'focused' but also when the user clicks on an OK element (see useEffect)
  const [showSpanishFocus, setShowSpanishFocus] = useState(false);

  // These hold the values of the inputs before they are changed. 
  // They are updated after the blur event. (or for the spanish whenever the 'showSpanishFocus' state changes)
  const englishBeforeChanges = useRef(english || '')
  const spanishBeforeChanges = useRef(spanish || '')

  // These functions are run after the respective input field is 'blurred' 
  // or, for the spanish input field, whenever the showSpanishFocus state changes.
  const ensureEnglishValidity = () => {
    // Change the englishWord state back to the previous value (englishBeforeChanges)
    if (englishWord.trim().length === 0) setEnglishWord(englishBeforeChanges.current);
    // Update the englishBeforeChanges value.
    else englishBeforeChanges.current = englishWord;      
  }
  const ensureSpanishValidity = () => {
    // Change the spanishWord state back to the previous value (spanishBeforeChanges)
    if (spanishWord.trim().length === 0) setSpanishWord(spanishBeforeChanges.current);
    // Update the spanishBeforeChanges value.
    else spanishBeforeChanges.current = spanishWord;      
  }

  // Run the ensureSpanishValidity() function on change of the showSpanishFocus state
  useEffect(() => {
    ensureSpanishValidity();
  }, [showSpanishFocus])

  // Run via the delete card modal. 
  // Finds the respective card in the pages state and removes it.
  const deleteCard = () => {
    setState((prev) => {
      const newCardsArray = prev.cards.filter((card) => {
        return card.id !== cardId
      })

      return {...prev, cards: newCardsArray};
    })
  }

  // This useEffect adds an event listener for the 'mousedown' event.
  useEffect(() => {

    // Update the showSpanishFocus state (adds 'focus') whenever you click on the
    // Spanish input or similar associated elements (like the spanish char buttons)
    const toggleFocus = (e) => {
      if (document.querySelector(`.spanish-flex.number${number}`)) {
        let clickedElement = e.target;
        if (clickedElement.matches(`.edit-word-input.number${number}`) || 
            clickedElement.matches(`.spanish-flex.number${number}`) ||
            document.querySelector(`.spanish-flex.number${number}`).contains(clickedElement) ) {
          setShowSpanishFocus(true);
        } else {
          setShowSpanishFocus(false);
        }
      }
    }

    document.addEventListener('mousedown', toggleFocus);

    return () => {
      document.removeEventListener('mousedown', toggleFocus)
    }
  }, [])

  return (
    <div {...props} className={"flashcard-edit-list-item d-flex align-items-start" + (props.className ? ` ${props.className}` : '')}>
      <div className='number d-flex justify-content-start align-items-center'>
        <p>{number}.</p>
      </div>

      <div className={'flashcard-words-flex d-flex align-items-start bg-white rounded w-100 h-100'}>
        <div className='word-flex english-flex d-flex flex-column justify-content-center px-15'>
          <p className='fs-6 text-secondary fw-semibold lh-1 mb-10'>English</p>
          <Form.Control 
            className='edit-word-input' 
            name='english_1' 
            type="text" 
            placeholder="English word" 
            value={englishWord} 
            onChange={updateEnglishWord}
            onFocus={() => setShowSpanishFocus(false)}
            onBlur={ensureEnglishValidity}
          />
        </div>

        <div className='separator bg-gray-150 my-15 flex-grow-0'></div>

        <div className={`number${number} ` + 'word-flex spanish-flex d-flex flex-column justify-content-center px-15' + (showSpanishFocus ? ' focus' : '')}>
          <p className='fs-6 text-secondary fw-semibold lh-1 mb-10'>Spanish</p>
          <Form.Control 
            ref={spanishInputRef} 
            className={'edit-word-input' + ` number${number}`} 
            name='spanish_1' 
            type="text" 
            placeholder="Spanish word" 
            value={spanishWord} 
            onChange={updateSpanishWord}
            onFocus={() => {setShowSpanishFocus(true)}}
          />
          <ExtraLetters updateState={setSpanishWord} inputRef={spanishInputRef}/>
        </div>
      </div>

      <IconButton className="mt-2 ms-10" variant='light' danger={true} size='md' iconSrc='/icons/delete.svg' altTag='Delete icon' onClick={openDeleteCard} onFocus={() => setShowSpanishFocus(false)}/>
    
      <DeleteCardModal show={showDeleteModal} closeModal={closeDeleteCard} deleteCard={deleteCard} englishWord={englishWord} spanishWord={spanishWord}/>
    </div>
  )
}

export default EditCardListItem