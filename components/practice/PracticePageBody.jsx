import React from 'react'
import PracticeCard from './PracticeCard'

const PracticePageBody = ({ cards, ...props }) => {
  return (
    <>
      <div className='mx-auto' style={{maxWidth: '40.625rem'}}>
        <h1 className='text-center mb-30 mb-sm-40'>Practice</h1>
        <p className='mb-10'>1 / {cards.length}</p>
        <div className='d-flex flex-column align-items-center'>
          <PracticeCard key={cards[0]._id} card={JSON.parse(JSON.stringify(cards[0]))}/>
        </div>
      </div>
    </>
  )
}

export default PracticePageBody