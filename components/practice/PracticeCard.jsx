'use client'

import React, { useEffect, useRef, useState } from 'react'
import Button from 'react-bootstrap/Button'
import IconButton from '../IconButton'

const PracticeCard = ({ card, otherCards, number, totalCardCount, functions, ...props }) => {

  const flashcardRef = useRef(null)

  const [showSide, setShowSide] = useState('front')
  const isFlipping = useRef(false);
  const flipCard = (e) => {
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

  const [selectedScore, setSelectedScore] = useState(0)

  const [transition, setTransition] = useState({isTransitioning: false, showNewData: false, newData: null});

  // This function helps with animating the card to move.
  // It also updates transition state 
  const moveCard = (direction) => {
    // Update the state to indicate that the transition is currently underway
    setTransition((prev) => ({ ...prev, isTransitioning: true }))

    // Animate the flashcard to move from the center
    flashcardRef.current.classList.add(`slide-${direction}-from-center`)
    setTimeout(() => {
      // After 500ms, move the flashcard back to the center from the other side
      flashcardRef.current.classList.replace(`slide-${direction}-from-center`, `slide-${direction}`);
    }, 500);
    
    // This runs right after the flashcard disappears from view
    setTimeout(() => {
      // Hide the flashcard. This is temporary and prevents the card from
      // being seen during a potential visibility at the 500ms mark.
      flashcardRef.current.classList.add('opacity-0', 'disabled')

      // Make sure the flashcard is flipped on the front side
      setShowSide('front');
    }, 450);

    // This runs right before the flashcard re-appears
    setTimeout(() => {
      // Show the flashcard again
      flashcardRef.current.classList.remove('opacity-0', 'disabled');      
      
      // Set the transition state to mark that the new card's data needs to be shown      
      setTransition((prev) => ({...prev, showNewData: true, newData: direction === 'left' ? otherCards.next.card : otherCards.prev.card}))
    }, 550);

    // After everything is completed, run the parent component's state updater function to 
    // officially update which card is displayed.
    setTimeout(() => {
      if (direction === 'left') functions.next()
      else functions.back()
    }, 1000);
  }

  // Function run when the user clicks the back button
  const handleBack = () => {
    moveCard('right');
  }

  // Function run when the user wants to go on to the next card
  const handleNext = () => {
    moveCard('left');
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
      <div {...props} ref={flashcardRef} className={'w-100 rounded bg-white practice-flashcard' + (props.className ? ` ${props.className}` : '')} onClick={flipCard}>
        {showSide === 'front' ? 
          (
            <div className='h-100 d-flex flex-column align-items-center justify-content-between'>
              <p className='w-100 text-end lh-1 fs-5 pt-30 pe-30'>{(transition.showNewData ? transition.newData.parent_deck_title : card.parent_deck_title)}</p>
              <p className='fs-2'>{(transition.showNewData ? transition.newData.english : card.english)}</p>   
              <div style={{height: '2.75rem'}}></div>
            </div>         
          ) 
          :
          (
            <div className='h-100 d-flex flex-column align-items-center justify-content-between'>
              <p className='w-100 text-end lh-1 fs-5 pt-30 pe-30' style={{minHeight: '6.5rem'}}>{(transition.showNewData ? transition.newData.parent_deck_title : card.parent_deck_title)}</p>
              <p className='fs-2'>{(transition.showNewData ? transition.newData.spanish : card.spanish)}</p>
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
      <div className='d-flex justify-content-between w-100'>
        <IconButton className={number === 1 ? 'opacity-0' : ''} disabled={number === 1 || transition.isTransitioning} variant='gray' iconSrc='/icons/arrow_back.svg' altTag='Back icon' size='sm' onClick={handleBack}/>
        <Button variant='secondary' onClick={flipCard}>
          <span className='d-block d-xs_sm-none'>Flip</span>
          <span className='d-none d-xs_sm-block'>Flip Card</span>
        </Button>
        <IconButton className={(number === totalCardCount || selectedScore === 0 || transition.isTransitioning ? 'disabled' : '') + (number === totalCardCount ? ' opacity-0' : (selectedScore === 0 ? ' opacity-50' : ''))} variant='gray' iconSrc='/icons/arrow_forward.svg' altTag='Next icon' size='sm' onClick={handleNext}/>
      </div>      
    </>
  )
}

export default PracticeCard