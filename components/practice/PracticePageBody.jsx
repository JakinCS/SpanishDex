'use client'

import React, { useState } from 'react';
import PracticeCard from './PracticeCard';

const PracticePageBody = ({ cards, ...props }) => {

  const [visibleCard, setVisibleCard] = useState(0);
  const incrementVisibleCard = () => {
    setVisibleCard((prev) => {
      if (prev === cards.length - 1) {
        return prev;
      } else {
        return prev + 1;
      }
    });
  }
  const decrementVisibleCard = () => {
    setVisibleCard((prev) => {
      if (prev === 0) {
        return prev;
      } else {
        return prev - 1;
      }
    });
  }

  const otherCardInfo = {
    prev: (visibleCard > 0 ? {
      card: cards[visibleCard - 1]
    } : null),
    next: (visibleCard + 1 < cards.length ? {
      card: cards[visibleCard + 1]
    } : null)
  }

  return (
    <>
      <div className='mx-auto' style={{maxWidth: '40.625rem'}}>
        <h1 className='text-center mb-30 mb-sm-40'>Practice</h1>
        <p className='mb-10'>{visibleCard + 1} / {cards.length}</p>
        <div className='d-flex flex-column align-items-center'>
          <PracticeCard className='mb-30' number={visibleCard + 1} totalCardCount={cards.length} key={cards[visibleCard]._id} otherCards={otherCardInfo} card={cards[visibleCard]} functions={{next: incrementVisibleCard, back: decrementVisibleCard}}/>
        </div>
      </div>
    </>
  )
}

export default PracticePageBody