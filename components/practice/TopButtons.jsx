import React from 'react'
import BackButton from '@/components/BackButton';
import Button from 'react-bootstrap/Button'

const TopButtons = ({ quitButton }) => {
  return (
    <div className='d-flex justify-content-between mb-30 mb-sm-40'>
      <BackButton/>
      {quitButton && (
        <Button variant='outline-danger'>Quit</Button>
      )}
    </div>
  )
}

export default TopButtons