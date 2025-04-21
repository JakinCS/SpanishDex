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
      } 
      // Set the focus to false. (But ONLY if the element clicked is not the 'add' button. It's necessary for the add button to do this itself)
      else if (!clickedElement.matches('.flashcard-add-list-item .btn') && !clickedElement.matches('.flashcard-add-list-item .btn *')) {
        setShowSpanishFocus(false)
      }
    }

    document.addEventListener('mousedown', toggleFocus);

    // This function is used to turn off the focus of the spanish input when the user presses 'Tab' on the case changer button.
    const caseChangerFunction = (e) => {
      if (e.key == 'Tab') {
        setShowSpanishFocus(false)
      }
    }

    document.querySelectorAll(".flashcard-add-list-item .word-flex .case-changer")[0].addEventListener('keydown', caseChangerFunction)
    document.querySelectorAll(".flashcard-add-list-item .word-flex .case-changer")[1].addEventListener('keydown', caseChangerFunction)

    return () => {
      document.removeEventListener('mousedown', toggleFocus);
      if (document.querySelectorAll(".flashcard-add-list-item .word-flex .case-changer").length > 0) {
        document.querySelectorAll(".flashcard-add-list-item .word-flex .case-changer")[0].removeEventListener('keydown', caseChangerFunction)
        document.querySelectorAll(".flashcard-add-list-item .word-flex .case-changer")[1].removeEventListener('keydown', caseChangerFunction)
      }
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
    // Turn off the focus of the spanish input
    setShowSpanishFocus(false)

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
      <div className='flashcard-add-list-item d-flex flex-column flex-sm_md-row align-items-center'>
        <div className='d-flex flex-column flex-lg-row align-items-start gap-15 me-sm_md-30 w-100'>
          <div className="word-flex d-flex w-100 w-lg-50">
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

          <div className={"word-flex spanish-flex d-flex flex-column w-100 w-lg-50" + (showSpanishFocus ? ' focus' : '')}>
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
            <div className="d-none d-sm_md-flex">
              <ExtraLetters updateState={setSpanishWord} inputRef={spanishInputRef} style={{marginBottom: "-2.5rem"}}/>
            </div>
            <div className='d-flex d-sm_md-none'>
              <ExtraLetters updateState={setSpanishWord} inputRef={spanishInputRef}/>
            </div>
          </div>
        </div>
        <ButtonWithIcon 
          variant='primary' 
          iconSrc='/icons/add_3.svg' 
          altTag='add icon' 
          iconHeight={16} 
          iconFillColor={'white'} 
          className='flex-shrink-0 d-block d-sm_md-none mt-20 w-100' 
          onClick={handleAddCard}
        >
          Add Card
        </ButtonWithIcon>
        <ButtonWithIcon 
          variant='primary' 
          iconSrc='/icons/add_3.svg' 
          altTag='add icon' 
          iconHeight={16} 
          iconFillColor={'white'} 
          className='flex-shrink-0 d-none d-sm_md-block ms-0 ms-md-60 ms-md_lg-120 ms-lg-0' 
          onClick={handleAddCard}
        >
          Add Card
        </ButtonWithIcon>
      </div>
    </div>
    
  )
}

export default AddCardArea