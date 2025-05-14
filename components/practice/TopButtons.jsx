import React from 'react'
import BackButton from '@/components/BackButton';
import CloseButton from '../CloseButton';

const TopButtons = ({ exit = false, onClick }) => {
  return (
    <div className='d-flex justify-content-between mb-30 mb-sm-40'>
      {exit ? 
        <CloseButton onClick={onClick} /> 
        : 
        <BackButton onClick={onClick} />
      }     
      
    </div>
  )
}

export default TopButtons