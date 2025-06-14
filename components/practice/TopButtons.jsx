import React from 'react'
import BackButton from '@/components/miscellaneous/BackButton';
import CloseButton from '../miscellaneous/CloseButton';

const TopButtons = ({ exit = false, onClick }) => {
  return (
    <div className='d-flex justify-content-between mb-20 mb-sm-40'>
      {exit ? 
        <CloseButton onClick={onClick} /> 
        : 
        <BackButton onClick={onClick} />
      }     
      
    </div>
  )
}

export default TopButtons