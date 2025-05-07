'use client'

import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import ButtonWithIcon from '../ButtonWithIcon'
import IconButton from '../IconButton'

const PracticeCard = ({ card }) => {
  const [showSide, setShowSide] = useState('front')
  const flipCard = (e) => {
    // Prevent the buttons from triggering the card flip
    if (e.target.matches('.practice-flashcard .button-parent') || e.target.matches('.practice-flashcard .button-parent *')) return

    setShowSide((prev) => (prev === 'front' ? 'back' : 'front'))
  }

  const [selectedScore, setSelectedScore] = useState(0)

  // console.log(card)

  return (
    <>
      <div className='w-100 rounded bg-white practice-flashcard mb-30' onClick={flipCard}>
        {showSide === 'front' ? 
          (
            <div className='h-100 d-flex align-items-center justify-content-center'>
              <p className='fs-2'>{card.english}</p>   
            </div>         
          ) 
          :
          (
            <div className='h-100 d-flex flex-column align-items-center justify-content-between'>
              <p className='w-100 text-end lh-1 fs-5 pt-30 pe-30' style={{minHeight: '6.5rem'}}>{card.parent_deck_title}</p>
              <p className='fs-2'>{card.spanish}</p>
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
        {/* <Button variant='gray'>
          <span>Back</span>
        </Button> */}
        {/* <ButtonWithIcon variant='gray' iconSrc='/icons/arrow_back.svg' iconHeight={24} altTag='Back icon'>Back</ButtonWithIcon> */}
        <IconButton variant='gray' iconSrc='/icons/arrow_back.svg' altTag='Back icon' size='sm' />
        <Button variant='secondary' onClick={flipCard}>
          <span className='d-block d-xs_sm-none'>Flip</span>
          <span className='d-none d-xs_sm-block'>Flip Card</span>
        </Button>
        {/* <Button variant='gray'>
          <span>Next</span>
        </Button> */}
        {/* <ButtonWithIcon variant='gray' iconSrc='/icons/arrow_forward.svg' iconHeight={24} altTag='Next icon'>Next</ButtonWithIcon> */}
        <IconButton variant='gray' iconSrc='/icons/arrow_forward.svg' altTag='Next icon' size='sm' />
      </div>
    </>
  )
}

export default PracticeCard