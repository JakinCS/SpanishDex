'use client'

import React, { useEffect, useRef, useState } from 'react'
import Button from 'react-bootstrap/Button'
import IconButton from '../IconButton'

const PracticeCard = ({ card, otherCards, number, totalCardCount, functions, ...props }) => {

  const flashcardRef = useRef(null)

  // The current displayed data on the card. (Changes when the user clicks the next or back buttons)
  const [displayedCardData, setDisplayedCardData] = useState({number, card})

  // Whether to show the ending screen or not
  const [showFinal, setShowFinal] = useState({inProgress: false, completed: false})

  // Which score is selected by the user. (by default nothing)
  const [selectedScore, setSelectedScore] = useState(0)

  // State to hold data about whether the card transition is underway or not
  const [transitioning, setTransitioning] = useState(false);

  const [showSide, setShowSide] = useState('front')
  const isFlipping = useRef(false);

  const flipCard = (e) => {
    if (showFinal.inProgress || showFinal.completed || transitioning) return; // Don't flip

    // Prevent the buttons from triggering the card flip
    if (e) {
      if (e.target.matches('.practice-flashcard .button-parent') || e.target.matches('.practice-flashcard .button-parent *')) return
    }

    if (isFlipping.current) return // Prevent flipping if already animating

    isFlipping.current = true; // The flipping state is true
    flashcardRef.current.classList.add('animate-flip');
    setTimeout(() => {
      setShowSide((prev) => (prev === 'front' ? 'back' : 'front'))
    }, 250);
    setTimeout(() => {
      flashcardRef.current.classList.remove('animate-flip');
      isFlipping.current = false; // The flipping state is false
    }, 500); // Matches match the CSS animation duration

  }

  // This function helps with animating the card to move.
  // It also updates transition state 
  const moveCard = (direction) => {
    const animationDuration = 500

    // Update the displayed card data state to indicate the new current card number 
    // (This helps determine whether to show/hide the next & previous buttons)
    setDisplayedCardData((prev) => ({ ...prev, number: prev.number + (direction === 'left' ? 1 : -1) }))

    // Update the state to indicate that the transition is currently underway
    setTransitioning(true)

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
    if (transitioning) return;
    
    if (!showFinal.inProgress && !showFinal.completed) moveCard('right');
    else {
      setShowFinal((prev) => ({...prev, inProgress: true}));
      
      setTransitioning(true);

      flashcardRef.current.classList.add(`slide-right`)

      setTimeout(() => {
        setShowFinal((prev) => ({...prev, inProgress: false, completed: false}));
        setTransitioning(false)
      }, 235);
    }
  }

  // Function run when the user wants to go on to the next card
  const handleNext = () => {
    if (transitioning) return;
    
    if (displayedCardData.number < totalCardCount) moveCard('left');
    else {
      setShowFinal((prev) => ({...prev, inProgress: true}));

      flashcardRef.current.classList.add(`slide-left-from-center`)

      setTimeout(() => {
        setShowFinal((prev) => ({...prev, inProgress: false, completed: true}))
      }, 200);
    }
  }


  useEffect(() => {
    // Flip the card when the spacebar is pressed
    const handleKeyDown = (event) => {
      if (event.key === ' ') flipCard()
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])


  return (
    <>
      <div 
        {...props} 
        ref={flashcardRef} 
        className={'w-100 rounded bg-white practice-flashcard' + (showFinal.completed ? ' make-hidden' : '') + (props.className ? ` ${props.className}` : '')} 
        onClick={flipCard}
      >
        {showSide === 'front' ? 
          (
            <div className='h-100 d-flex flex-column align-items-center justify-content-between'>
              <p className='w-100 text-end lh-1 fs-5 pt-30 pe-30'>{displayedCardData.card.parent_deck_title}</p>
              <p className='fs-2'>{displayedCardData.card.english}</p>   
              <div style={{height: '2.75rem'}}></div>
            </div>         
          ) 
          :
          (
            <div className='h-100 d-flex flex-column align-items-center justify-content-between'>
              <p className='w-100 text-end lh-1 fs-5 pt-30 pe-30' style={{minHeight: '6.5rem'}}>{displayedCardData.card.parent_deck_title}</p>
              <p className='fs-2'>{displayedCardData.card.spanish}</p>
              <div>
                <p className='fw-medium text-center lh-1 fs-6 mb-2'>Did you get it right?</p>
                <div className='mb-30 p-2 button-parent'>
                  <div className='d-flex justify-content-between px-2 pb-2'>
                    <p className='lh-1 fs-6'>No</p>
                    <p className='lh-1 fs-6'>Yes</p>
                  </div>
                  <div className="d-flex score-button-flex gap-10 gap-sm-15">
                    <div className='d-flex flex-column align-items-center'>
                      <Button className={'score-button score-1' + (selectedScore === 1 ? ' selected' : '')} onClick={ () => { setSelectedScore(1) } }>1</Button>
                      <p className='score-description position-absolute fs-6 mt-35'>I had no idea</p>
                    </div>
                    <div className='d-flex flex-column align-items-center'>
                      <Button className={'score-button score-2' + (selectedScore === 2 ? ' selected' : '')} onClick={ () => { setSelectedScore(2) } }>2</Button>
                      <p className='score-description position-absolute fs-6 mt-35'>I got it wrong</p>
                    </div>
                    <div className='d-flex flex-column align-items-center'>
                      <Button className={'score-button score-3' + (selectedScore === 3 ? ' selected' : '')} onClick={ () => { setSelectedScore(3) } }>3</Button>
                      <p className='score-description position-absolute fs-6 mt-35'>Phew, I got it right</p>
                    </div>
                    <div className='d-flex flex-column align-items-center'>
                      <Button className={'score-button score-4' + (selectedScore === 4 ? ' selected' : '')} onClick={ () => { setSelectedScore(4) } }>4</Button>
                      <p className='score-description position-absolute fs-6 mt-35'>Not too bad</p>
                    </div>
                    <div className='d-flex flex-column align-items-center'>
                      <Button className={'score-button score-5' + (selectedScore === 5 ? ' selected' : '')} onClick={ () => { setSelectedScore(5) } }>5</Button>
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
        <div style={{zIndex: (!showFinal.inProgress && showFinal.completed ? '0' : '-1')}} className={'w-100 rounded bg-white border border-gray-150 border-1point5 flashcard-end-screen' + (props.className ? ` ${props.className}` : '')}>
          <div className='h-100 d-flex flex-column justify-content-center'>
            <h2 className='text-center mb-40'>Practice Complete</h2>
            <Button className='d-block mx-auto' variant='primary'>View Results</Button>
          </div> 
        </div>
      }
      <div className='d-flex justify-content-between w-100'>
        <IconButton 
          className={displayedCardData.number === 1 ? 'opacity-0' : ''} 
          disabled={displayedCardData.number === 1} 
          variant='gray' 
          iconSrc='/icons/arrow_back.svg' 
          altTag='Back icon' 
          size='sm' 
          onClick={handleBack}
        />
        <Button variant='secondary' onClick={flipCard} className={(showFinal.inProgress || showFinal.completed ? 'opacity-75' : '')} disabled={showFinal.inProgress || showFinal.completed}>
          <span className='d-block d-xs_sm-none'>Flip</span>
          <span className='d-none d-xs_sm-block'>Flip Card</span>
        </Button>
        <IconButton 
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