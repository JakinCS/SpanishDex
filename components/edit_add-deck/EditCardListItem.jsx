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
    // This function can be used without an event (so check for that)
    if (!e.target) setEnglishWord(e)
    else setEnglishWord(e.target.value) 

    // Finds this card's information in the main page's state's list of cards and updates it.
    setState((prevState) => {
      const newCardsArray = prevState.cards.map((card) => {
        if (card._id === cardId) {
          return {_id: card._id, english: (!e.target ? e : e.target.value), spanish: spanishWord}
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
    // This function can be used without an event (so check for that)
    if (!e.target) setSpanishWord(e)
    else setSpanishWord(e.target.value) 

    // Finds this card's information in the main page's state's list of cards and updates it.
    setState((prevState) => {      
      const newCardsArray = prevState.cards.map((card) => {
        if (card._id === cardId) {
          return {_id: card._id, english: englishWord, spanish: (!e.target ? e : e.target.value)}
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

  // This state fulfills the special need to have a class named 'focus' on the english word input
  // This state is updated when the input is 'focused' but also when the user clicks on an OK element (see useEffect)
  const [showEnglishFocus, setShowEnglishFocus] = useState(false);

  // These hold the values of the inputs before they are changed. 
  // They are updated after the blur event. (or for the spanish whenever the 'showSpanishFocus' state changes)
  const englishBeforeChanges = useRef(english || '')
  const spanishBeforeChanges = useRef(spanish || '')

  // These functions are run after the respective input field is 'blurred' 
  // or, for the spanish input field, whenever the showSpanishFocus state changes.
  const ensureEnglishValidity = () => {
    // Change the englishWord state back to the previous value (englishBeforeChanges)
    if (englishWord.trim().length === 0) updateEnglishWord(englishBeforeChanges.current);
    // Update the englishBeforeChanges value.
    // Update the englishWord state to include no extra spaces before or after
    else {
      englishBeforeChanges.current = englishWord.trim();
      updateEnglishWord(englishWord.trim())
    }      
  }
  const ensureSpanishValidity = () => {
    // Change the spanishWord state back to the previous value (spanishBeforeChanges)
    if (spanishWord.trim().length === 0) updateSpanishWord(spanishBeforeChanges.current);
    // Update the spanishBeforeChanges value. 
    // Update the spanishWord state to include no extra spaces before or after
    else {
      spanishBeforeChanges.current = spanishWord.trim();
      updateSpanishWord(spanishWord.trim())
    };      
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
        return card._id !== cardId
      })

      return {...prev, cards: newCardsArray};
    })
  }

  // This useEffect adds an event listener for the 'mousedown' event.
  useEffect(() => {

    // Update the showSpanishFocus state (adds 'focus') whenever you click on the
    // Spanish input or similar associated elements (like the spanish char buttons)
    const toggleFocus = (e) => {
      if (document.querySelector(`.number${cardId} .spanish-flex`)) {
        let clickedElement = e.target;
        if (!clickedElement.matches(`.edit-word-input.number${cardId}`) && 
            !clickedElement.matches(`.number${cardId} .spanish-flex`) &&
            !document.querySelector(`.number${cardId} .spanish-flex`).contains(clickedElement) &&
            !clickedElement.matches('.flashcard-edit-list-item .btn.danger') &&
            !clickedElement.matches('.flashcard-edit-list-item .btn.danger *')
           ) {
          setShowSpanishFocus(false);
        }
        if (!clickedElement.matches(`.number${cardId} .english-flex .edit-word-input`) && 
            !clickedElement.matches(`.number${cardId} .english-flex`) &&
            !document.querySelector(`.number${cardId} .english-flex`).contains(clickedElement) &&
            !clickedElement.matches('.flashcard-edit-list-item .btn.danger') &&
            !clickedElement.matches('.flashcard-edit-list-item .btn.danger *')
           ) {
          setShowEnglishFocus(false);
        }
      }
    }

    document.addEventListener('mousedown', toggleFocus);

    // This function will remove the focus from the spanish input field when any delete button is clicked, 
    // not just on mouse down (which is problematic)
    const checkDeleteButtonClicked = (e) => {
      if (document.querySelector(`.number${cardId} .spanish-flex`)) {
        let clickedElement = e.target;
        if (clickedElement.matches('.flashcard-edit-list-item .btn.danger') ||
            clickedElement.matches('.flashcard-edit-list-item .btn.danger *')
           ) {
          setShowSpanishFocus(false);
          setShowEnglishFocus(false);
        }
      }
    }

    document.addEventListener('click', checkDeleteButtonClicked)

    // If the tab key is pressed, then remove the focus from the spanish input field
    const caseChangerFunction = (e) => {
      if (e.key == 'Tab' && e.shiftKey == false) {
        setShowSpanishFocus(false)
      }
    }

    document.querySelectorAll(`.flashcard-edit-list-item.number${cardId} .spanish-flex .case-changer`)[0].addEventListener('keydown', caseChangerFunction)

    // If the tab key and shift key are pressed when on the english word input field, then remove the focus from the english input field
    const englishInputFieldFunction = (e) => {
      if (e.key == 'Tab' && e.shiftKey == true) {
        setShowEnglishFocus(false)
      }
    }
    document.querySelectorAll(`.flashcard-edit-list-item.number${cardId} .english-flex .edit-word-input`)[0].addEventListener('keydown', englishInputFieldFunction)

    return () => {
      document.removeEventListener('mousedown', toggleFocus)
      if (document.querySelectorAll(`.flashcard-edit-list-item.number${cardId} .spanish-flex .case-changer`)[0]) {
        document.querySelectorAll(`.flashcard-edit-list-item.number${cardId} .spanish-flex .case-changer`)[0].removeEventListener('keydown', caseChangerFunction)
      }
      if (document.querySelectorAll(`.flashcard-edit-list-item.number${cardId} .english-flex .edit-word-input`)[0]) {
        document.querySelectorAll(`.flashcard-edit-list-item.number${cardId} .english-flex .edit-word-input`)[0].removeEventListener('keydown', englishInputFieldFunction)
      }
      document.removeEventListener('click', checkDeleteButtonClicked)
    }
  }, [])

  return (
    <div {...props} className={`number${cardId} ` + "flashcard-edit-list-item d-flex flex-column flex-xs_sm-row align-items-start" + (props.className ? ` ${props.className}` : '')}>
      
      <div className='number d-none d-xs_sm-flex justify-content-start align-items-center'>
        <p>{number}.</p>
      </div>

      <div className='d-flex d-xs_sm-none justify-content-between align-items-center w-100'>
        <div className='number d-flex justify-content-start align-items-center ps-2'>
          <p>{number}.</p>
        </div>
        <IconButton className="ms-10" variant='light' danger={true} size='md' iconSrc='/icons/delete.svg' altTag='Delete icon' onClick={openDeleteCard}/>
      </div>

      <div className={'flashcard-words-flex d-flex flex-column flex-md-row align-items-start bg-white rounded w-100 h-100'}>
        <div className={'word-flex english-flex d-flex flex-column justify-content-center px-15 w-100 w-md-50' + (showEnglishFocus ? ' focus' : '')}>
          <p className='fs-6 text-secondary fw-semibold lh-1 mb-10'>English</p>
          <Form.Control 
            className='edit-word-input' 
            name='english_1' 
            type="text" 
            placeholder="English word" 
            value={englishWord} 
            onChange={updateEnglishWord}
            onFocus={() => {setShowSpanishFocus(false); setShowEnglishFocus(true)}}
            onBlur={ensureEnglishValidity}
          />
        </div>

        <div className='separator bg-gray-150 my-15 flex-grow-0 d-none d-md-block'></div>
        <div className='separator2 bg-gray-150 mx-auto flex-grow-0 d-block d-md-none'></div>

        <div className={'word-flex spanish-flex d-flex flex-column justify-content-center px-15 w-100 w-md-50' + (showSpanishFocus ? ' focus' : '')}>
          <p className='fs-6 text-secondary fw-semibold lh-1 mb-10'>Spanish</p>
          <Form.Control 
            ref={spanishInputRef} 
            className={'edit-word-input' + ` number${cardId}`} 
            name='spanish_1' 
            type="text" 
            placeholder="Spanish word" 
            value={spanishWord} 
            onChange={updateSpanishWord}
            onFocus={() => {setShowSpanishFocus(true); setShowEnglishFocus(false)}}
          />
          <ExtraLetters updateInputValue={updateSpanishWord} inputValue={spanishWord} inputRef={spanishInputRef}/>
        </div>
      </div>

      <IconButton className="mt-2 ms-10 d-none d-xs_sm-block" variant='light' danger={true} size='md' iconSrc='/icons/delete.svg' altTag='Delete icon' onClick={openDeleteCard} />
    
      <DeleteCardModal show={showDeleteModal} closeModal={closeDeleteCard} deleteCard={deleteCard} englishWord={englishWord} spanishWord={spanishWord}/>
    </div>
  )
}

export default EditCardListItem