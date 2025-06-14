'use client'

import Form from 'react-bootstrap/Form'
import ButtonWithIcon from "@/components/utils/ButtonWithIcon";
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

    // This function will check to see if the shift and tab key are pressed on the spanish input field.
    const handleOnKeyDown = (e) => {
      if (e.key === 'Tab' && e.shiftKey) {
        // Remove the focus class from the spanish input field
        setShowSpanishFocus(false);
      }
    }

    document.querySelector(".flashcard-add-list-item .spanish-flex .add-word-input").addEventListener('keydown', handleOnKeyDown);

    return () => {
      document.removeEventListener('mousedown', toggleFocus);
      if (document.querySelector(".flashcard-add-list-item .spanish-flex .add-word-input")) {
        document.querySelector(".flashcard-add-list-item .spanish-flex .add-word-input").removeEventListener('keydown', handleOnKeyDown);
      }
    }
  }, [])

  // This function validates the inputs for adding a card. It ensures that the fields are not empty
  const validateInputs = () => {
    const englishCheck = englishWord.trim().length === 0;
    const spanishCheck = spanishWord.trim().length === 0;
    return {valid: (!englishCheck && !spanishCheck)}
  }
  
  // These functions are run on the 'blur' of the spanish and english word inputs. They get rid of extra spaces.
  const formatEnglishWord = () => {
    setEnglishWord((prev) => prev.trim())
  }
  const formatSpanishWord = () => {
    setSpanishWord((prev) => prev.trim())
  }

  const handleAddCard = () => {
    // Turn off the focus of the spanish input
    setShowSpanishFocus(false)

    // Do a check on the validity of the inputs
    const result = validateInputs();
    if (!result.valid) return;

    // Add the card to the page's state's card array.
    setState((prevState) => {
      return {...prevState, cards: [...prevState.cards, {_id: `${Math.round(Math.random() * 100000000)}`, english: englishWord.trim(), spanish: spanishWord.trim()}]}
    })

    // Reset the field values
    setEnglishWord('');
    setSpanishWord('');
  }

  return (
    <div>
      <div className='flashcard-add-list-item d-flex flex-column flex-sm_md-row align-items-center align-items-lg-start'>
        <div className={'d-flex flex-column flex-lg-row align-items-start gap-15 me-sm_md-40 w-100'}>
          <div className={"word-flex spanish-flex d-flex flex-column w-100 w-lg-50" + (showSpanishFocus ? ' focus' : '')}>
            <p className='fs-5 text-primary fw-semibold lh-1 mb-10'>Spanish</p>
            <Form.Control 
              value={spanishWord} 
              onChange={updateSpanishWord} 
              onFocus={() => {setShowSpanishFocus(true)}}
              ref={spanishInputRef} 
              className={'add-word-input'} 
              name='spanish' 
              aria-label='Spanish word'
              type="text" 
              placeholder="Type Spanish word"
              onKeyDown={(e) => {
                if (e.key === 'Tab' && e.shiftKey) setShowSpanishFocus(false);
              }}
              onBlur={formatSpanishWord}
            />
            <div className="d-none d-lg-flex">
              <ExtraLetters updateInputValue={setSpanishWord} inputValue={spanishWord} inputRef={spanishInputRef} style={{marginBottom: "-2.5rem"}}/>
            </div>
            <div className='d-flex d-lg-none'>
              <ExtraLetters updateInputValue={setSpanishWord} inputValue={spanishWord} inputRef={spanishInputRef}/>
            </div>
          </div>

          <div className="word-flex d-flex flex-column w-100 w-lg-50">
            <p className='fs-5 text-primary fw-semibold lh-1 mb-10'>English</p>
            <Form.Group className='w-100'>
              <Form.Control 
                value={englishWord} 
                onChange={updateEnglishWord} 
                className={'add-word-input'}
                name='english' 
                aria-label='English word'
                type="text" 
                placeholder="Type English word" 
                onFocus={() => {setShowSpanishFocus(false)}}
                onBlur={formatEnglishWord}
              />
            </Form.Group>
          </div>
        </div>
        <ButtonWithIcon 
          variant='primary' 
          iconSrc='/icons/add_3.svg' 
          altTag='' 
          iconHeight={16} 
          iconFillColor={'white'} 
          className='flex-shrink-0 d-block d-sm_md-none mt-40 w-100' 
          onClick={handleAddCard}
          disabled={!(englishWord.trim() && spanishWord.trim())}
        >
          Add Card
        </ButtonWithIcon>
        <ButtonWithIcon 
          variant='primary' 
          iconSrc='/icons/add_3.svg' 
          altTag='' 
          iconHeight={16} 
          iconFillColor={'white'} 
          className='flex-shrink-0 d-none d-sm_md-block ms-0 ms-md-60 ms-md_lg-120 ms-lg-0' 
          onClick={handleAddCard}     
          disabled={!(englishWord.trim() && spanishWord.trim())} 
        >
          Add Card
        </ButtonWithIcon>
      </div>
    </div>
    
  )
}

export default AddCardArea