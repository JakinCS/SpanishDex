'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import Button from 'react-bootstrap/Button'
import IconButton from '../IconButton'

const PracticeCard = ({ card, otherCards, number, totalCardCount, functions, ...props }) => {

  const flashcardRef = useRef(null)

  // The current displayed data on the card. (Changes when the user clicks the next or back buttons)
  const [displayedCardData, setDisplayedCardData] = useState({number, card})

  // Whether to show the ending screen or not
  const [showFinal, setShowFinal] = useState({inProgress: false, completed: false});

  const [finishing, setFinishing] = useState(false)

  // Which score is selected by the user. (by default nothing)
  const [selectedScore, setSelectedScore] = useState(card.score || 0)
  const updateScoreViaKeyPress = (newScore) => {
    setSelectedScore(newScore);
    document.querySelector(`.score-button.score-${newScore}`).focus();
  }

  // State to hold data about whether the card transition is underway or not
  const transitioning = useRef(false);

  const [showSide, setShowSide] = useState('front')
  const isFlipping = useRef(false);

  const flipCard = useCallback((e) => {

    if (isFlipping.current) return // Prevent flipping if already animating

    if (showFinal.inProgress || showFinal.completed || transitioning.current) return; // Don't flip

    // Prevent the buttons from triggering the card flip
    if (e) {
      if (e.target.matches('.practice-flashcard .button-parent') || e.target.matches('.practice-flashcard .button-parent *')) return
    }

    isFlipping.current = true; // The flipping state is true
    flashcardRef.current.classList.add('animate-flip');
    setTimeout(() => {
      setShowSide((prev) => (prev === 'front' ? 'back' : 'front'))
    }, 250);
    setTimeout(() => {
      flashcardRef.current.classList.remove('animate-flip');
    }, 500); // Matches match the CSS animation duration
    setTimeout(() => {
      isFlipping.current = false; // Previous operation might take time to execute
    }, 525);

  }, [showFinal])

  // This function helps with animating the card to move.
  // It also updates transition state 
  const moveCard = (direction) => {

    // Update the state to indicate that the transition is currently underway
    transitioning.current = true;

    const animationDuration = 500

    // Update the displayed card data state to indicate the new current card number 
    // (This helps determine whether to show/hide the next & previous buttons)
    setDisplayedCardData((prev) => ({ ...prev, number: prev.number + (direction === 'left' ? 1 : -1) }))

    // Animate the flashcard to move from the center
    flashcardRef.current.classList.add(`slide-${direction}-from-center`)
    setTimeout(() => {
      // After 500ms, move the flashcard back to the center from the other side
      flashcardRef.current.classList.replace(`slide-${direction}-from-center`, `slide-${direction}`);
    }, animationDuration / 2);
    
    // This runs right after the flashcard disappears from view
    setTimeout(() => {
      // Hide the flashcard. This is temporary and prevents the card from
      // being seen during a potential visibility at the 500ms mark.
      flashcardRef.current.classList.add('opacity-0', 'disabled')

      // Make sure the flashcard is flipped on the front side
      setShowSide('front');
    }, animationDuration / 2 - 50);

    // This runs right before the flashcard re-appears
    setTimeout(() => {
      // Show the flashcard again
      flashcardRef.current.classList.remove('opacity-0', 'disabled');      
      
      // Update the displayed card data state to mark that the new card's data needs to be shown      
      setDisplayedCardData((prev) => ({ ...prev, card: direction === 'left' ? otherCards.next.card : otherCards.prev.card }))
    }, animationDuration / 2 + 50);

    // After everything is completed, run the parent component's state updater function to 
    // officially update which card is displayed.
    setTimeout(() => {
      if (direction === 'left') functions.next()
      else functions.back()
    }, animationDuration);
  }

  // Function run when the user clicks the back button
  const handleBack = () => {
    if (displayedCardData.number === 1 || transitioning.current || showFinal.inProgress) return;
    
    if (!showFinal.inProgress && !showFinal.completed) moveCard('right');
    else {
      setShowSide('front')
      setShowFinal((prev) => ({...prev, inProgress: true}));
      
      transitioning.current = true;

      flashcardRef.current.classList.add(`slide-right`)

      setTimeout(() => {
        setShowFinal((prev) => ({...prev, inProgress: false, completed: false}));
        transitioning.current = false;
      }, 225);
    }

    functions.updateState(card._id, {score: selectedScore})
  }

  // Function run when the user wants to go on to the next card
  const handleNext = () => {
    if ((showFinal.inProgress || showFinal.completed) || selectedScore === 0 || transitioning.current) return;

    if (displayedCardData.number < totalCardCount) moveCard('left');
    else {
      setShowFinal((prev) => ({...prev, inProgress: true}));

      flashcardRef.current.classList.add(`slide-left-from-center`);

      setTimeout(() => {
        setShowFinal((prev) => ({...prev, inProgress: false, completed: true}))
      }, 200);
    }

    if (selectedScore !== displayedCardData.card.score || displayedCardData.card.status === null) {
      functions.sendScore(card._id, card.next_practice_date, card.sra, selectedScore);
      setDisplayedCardData((prev) => ({...prev, card: {...prev.card, score: selectedScore, status: 'not_null'}}))
    }

    functions.updateState(card._id, {score: selectedScore});
  }

  // This function is run when the user is done practicing and is about to go to the summary page.
  const finishPractice = () => {
    setFinishing(true);

    functions.finish();
  }


  useEffect(() => {
    const handleKeyDown = (event) => {
      // Flip the card when the spacebar is pressed
      if (event.key === ' ') {
        event.preventDefault(); // Prevent scrolling from happening
        flipCard()
      };

      // Run the handleNext() function if the right arrow key is pressed
      if (event.key === 'ArrowRight' || event.key === 'Enter') {
        document.getElementById('flashcard-next-button').click();
      }

      // Run the handleBack() function if the left arrow key is pressed
      if (event.key === 'ArrowLeft') {
        document.getElementById('flashcard-prev-button').click();
      }

      if (event.key === '1' || event.key === '2' || event.key === '3' || event.key === '4' || event.key === '5') {
        if (!transitioning.current && !isFlipping.current && showSide === 'back') {
          // setSelectedScore(parseInt(event.key));
          updateScoreViaKeyPress(parseInt(event.key));
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedScore, showSide, showFinal, flipCard])


  return (
    <>
      <div 
        {...props} 
        ref={flashcardRef} 
        className={'w-100 rounded bg-white practice-flashcard px-30 mb-30' + (showFinal.completed ? ' make-hidden' : '') + (props.className ? ` ${props.className}` : '')} 
        onClick={flipCard}
      >
        {showSide === 'front' ? 
          (
            <div className='h-100 d-flex flex-column align-items-center justify-content-between'>
              <p className='w-100 text-end lh-1 fs-5 pt-25'>{displayedCardData.card.parent_deck_title}</p>
              <p className='flashcard-word fs-2 text-center'>{displayedCardData.card.english}</p>   
              <div style={{height: '2.4375rem'}}></div>
            </div>         
          ) 
          :
          (
            <div className='h-100 d-flex flex-column align-items-center justify-content-between'>
              <p className='w-100 text-end lh-1 fs-5 pt-25' style={{minHeight: '6.1875rem'}}>{displayedCardData.card.parent_deck_title}</p>
              <p className='flashcard-word fs-2 text-center'>{displayedCardData.card.spanish}</p>
              <div>
                <p className='fw-medium text-center lh-1 fs-6 mb-2'>Did you get it right?</p>
                <div className='mb-25 p-2 button-parent'>
                  <div className='d-flex justify-content-between px-2 pb-2'>
                    <p className='lh-1 fs-6'>No</p>
                    <p className='lh-1 fs-6'>Yes</p>
                  </div>
                  <div className="d-flex score-button-flex gap-10 gap-sm-15">
                    <div className='d-flex flex-column align-items-center'>
                      <Button variant='info' className={'score-button score-1' + (selectedScore === 1 ? ' selected' : '')} onClick={ () => { setSelectedScore(1) } }>1</Button>
                      <p className='score-description position-absolute fs-6 mt-35'>I had no idea</p>
                    </div>
                    <div className='d-flex flex-column align-items-center'>
                      <Button variant='info' className={'score-button score-2' + (selectedScore === 2 ? ' selected' : '')} onClick={ () => { setSelectedScore(2) } }>2</Button>
                      <p className='score-description position-absolute fs-6 mt-35'>I got it wrong</p>
                    </div>
                    <div className='d-flex flex-column align-items-center'>
                      <Button variant='info' className={'score-button score-3' + (selectedScore === 3 ? ' selected' : '')} onClick={ () => { setSelectedScore(3) } }>3</Button>
                      <p className='score-description position-absolute fs-6 mt-35'>Phew, I got it right</p>
                    </div>
                    <div className='d-flex flex-column align-items-center'>
                      <Button variant='info' className={'score-button score-4' + (selectedScore === 4 ? ' selected' : '')} onClick={ () => { setSelectedScore(4) } }>4</Button>
                      <p className='score-description position-absolute fs-6 mt-35'>Not too bad</p>
                    </div>
                    <div className='d-flex flex-column align-items-center'>
                      <Button variant='info' className={'score-button score-5' + (selectedScore === 5 ? ' selected' : '')} onClick={ () => { setSelectedScore(5) } }>5</Button>
                      <p className='score-description position-absolute fs-6 mt-35'>That was easy</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        }
      </div>
      
      {(showFinal.inProgress || showFinal.completed) &&
        <div style={{zIndex: (!showFinal.inProgress && showFinal.completed ? '0' : '-1')}} className='w-100 flashcard-end-screen px-25 px-sm-50'>
          <div className={'w-100 h-100 rounded bg-white border border-gray-150 border-1point5' + (props.className ? ` ${props.className}` : '')}>
            <div className='h-100 d-flex flex-column justify-content-center'>
              <h2 className='text-center mb-40'>Practice Complete</h2>
              <Button className='d-block mx-auto' variant='primary' onClick={finishPractice} disabled={finishing}>
                {finishing ? <div style={{padding: '0rem 2.125rem'}}><div className="loader"></div><span className="visually-hidden">Loading...</span></div> : 'View Results'}
              </Button>
            </div> 
          </div>
        </div>        
      }
      <div className='d-flex justify-content-between w-100'>
        <IconButton 
          id='flashcard-prev-button'
          className={displayedCardData.number === 1 ? 'opacity-0' : ''} 
          disabled={displayedCardData.number === 1 || finishing} 
          variant='gray' 
          iconSrc='/icons/arrow_back.svg' 
          altTag='Back icon' 
          size='sm' 
          onClick={handleBack}
        />
        <Button variant='secondary' onClick={flipCard} className={(showFinal.inProgress || showFinal.completed ? 'opacity-50' : '')} disabled={showFinal.inProgress || showFinal.completed}>
          <span className='d-block d-xs_sm-none'>Flip</span>
          <span className='d-none d-xs_sm-block'>Flip Card</span>
        </Button>
        <IconButton 
          id='flashcard-next-button'
          className={(showFinal.inProgress || showFinal.completed ? 'opacity-0' : '')} 
          disabled={(showFinal.inProgress || showFinal.completed) || selectedScore === 0} 
          variant='gray' 
          iconSrc='/icons/arrow_forward.svg' 
          altTag='Next icon' 
          size='sm' 
          onClick={handleNext}
        />
      </div>      
    </>
  )
}

export default PracticeCard