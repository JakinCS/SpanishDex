'use client'

import Form from 'react-bootstrap/Form'
import ButtonWithIcon from '@/components/ButtonWithIcon';
import ExtraLetters from './ExtraLetters';
import { useEffect, useRef, useState } from 'react';

const AddCardArea = ({ setState }) => {
  const spanishInputRef = useRef(null) // A reference to the input field for the spanish word

  // The state holding the value of the english word input field.
  const [englishWord, setEnglishWord] = useState('')
  const updateEnglishWord = (e) => { setEnglishWord(e.target.value) } // Updater function for the englishWord state
  
  // The state holding the value of the spanish word input field.
  const [spanishWord, setSpanishWord] = useState('')
  const updateSpanishWord = (e) => { setSpanishWord(e.target.value) } // Updater function for the spanishWord state

  // This state is used to add a special class named 'focus' on the spanish word input field
  // This state is updated when the input is 'focused' but also when the user clicks on an approved element (see useEffect)
  const [showSpanishFocus, setShowSpanishFocus] = useState(false);

  // State whether to show/hide an error for the input fields.
  const [showInputErrors, setShowInputErrors] = useState({english: false, spanish: false})

  // This useEffect adds an event listener for the 'mousedown' event.
  useEffect(() => {
    // Update the showSpanishFocus state (for adding 'focus' class) whenever you click on the
    // Spanish input or similar associated elements (like the spanish char buttons)
    const toggleFocus = (e) => {
      var clickedElement = e.target;
      if (clickedElement.matches(`.flashcard-add-list-item .spanish-flex .add-word-input`) ||
          clickedElement.matches(`.flashcard-add-list-item .spanish-flex`) ||
          document.querySelector(`.flashcard-add-list-item .spanish-flex`).contains(clickedElement) ) {
        setShowSpanishFocus(true);
      } else {
        setShowSpanishFocus(false)
      }
    }

    document.addEventListener('mousedown', toggleFocus);

    return () => {
      document.removeEventListener('mousedown', toggleFocus)
    }
  }, [])

  // This function validates the inputs for adding a card. It ensures that the fields are not empty
  const validateInputs = () => {
    const englishCheck = englishWord.trim().length === 0;
    const spanishCheck = spanishWord.trim().length === 0;

    setShowInputErrors({english: englishCheck, spanish: spanishCheck})

    return {valid: (!englishCheck && !spanishCheck)}
  }

  const handleAddCard = () => {
    // Do a check on the validity of the inputs
    const result = validateInputs();
    if (!result.valid) return;

    // Add the card to the page's state's card array.
    setState((prevState) => {
      return {...prevState, cards: [...prevState.cards, {id: `${Math.round(Math.random() * 100000000)}`, english: englishWord, spanish: spanishWord}]}
    })

    // Reset the field values
    setEnglishWord('');
    setSpanishWord('');
  }

  return (
    <div>
      <p className={'text-danger fw-semibold lh-1 mb-3 fs-5' + (showInputErrors.english || showInputErrors.spanish ? ' d-block' : ' d-none')} style={{marginTop: '-1rem'}}>Both fields must not be empty</p>
      <div className='flashcard-add-list-item d-flex align-items-center'>
        <div className='d-flex align-items-start gap-15 me-30 w-100'>
          <div className="word-flex d-flex w-100">
            <Form.Group className='w-100'>
              <Form.Control 
                value={englishWord} 
                onChange={updateEnglishWord} 
                className={'add-word-input' + (showInputErrors.english ? ' is-invalid' : '')}
                name='english' 
                type="text" 
                placeholder="Type English word" 
                onFocus={() => {setShowSpanishFocus(false)}}
              />
            </Form.Group>
          </div>

          <div className={"word-flex spanish-flex d-flex flex-column w-100" + (showSpanishFocus ? ' focus' : '')}>
            <Form.Control 
              value={spanishWord} 
              onChange={updateSpanishWord} 
              onFocus={() => {setShowSpanishFocus(true)}}
              ref={spanishInputRef} 
              className={'add-word-input' + (showInputErrors.spanish ? ' is-invalid' : '')} 
              name='spanish' 
              type="text" 
              placeholder="Type Spanish word"
            />
            <ExtraLetters updateState={setSpanishWord} inputRef={spanishInputRef}/>
          </div>
        </div>
        <ButtonWithIcon 
          variant='primary' 
          iconSrc='/icons/add_3.svg' 
          altTag='add icon' 
          iconHeight={16} 
          iconFillColor={'white'} 
          className='flex-shrink-0' 
          onFocus={() => {setShowSpanishFocus(false)}}
          onClick={handleAddCard}
        >
          Add Card
        </ButtonWithIcon>
      </div>
    </div>
    
  )
}

export default AddCardArea