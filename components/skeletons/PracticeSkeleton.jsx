import React from 'react'
import Button from 'react-bootstrap/Button';
import IconButton from '../IconButton';
import BackButton from '../BackButton';

const PracticeSkeleton = () => {
  return (
    <>
      <div className='mb-20 mb-sm-40'>
        <BackButton />        
      </div>
      <div className='mx-auto' style={{maxWidth: '40.625rem'}}>
        <h2 className='text-center mb-20 d-block d-sm-none'>Practice</h2>
        <h1 className='text-center mb-40 d-none d-sm-block'>Practice</h1>
        
        <div className='placeholder-glow mb-10'>
          <span className='placeholder bg-gray-150 rounded' style={{height: '1.75rem', width: '2.5rem' }}></span>
        </div>
        <div className='placeholder-glow mb-30'>
          <span className='placeholder bg-gray-150 rounded d-block d-sm-none' style={{height: '22.5rem', width: '100%' }}></span>
          <span className='placeholder bg-gray-150 rounded d-none d-sm-block' style={{height: '25rem', width: '100%' }}></span>
        </div>
        <div className='d-flex justify-content-between w-100'>
          <IconButton 
            className='opacity-0'
            disabled={true} 
            variant='gray' 
            iconSrc='/icons/arrow_back.svg' 
            altTag='Back icon' 
            size='sm'
          />
          <Button variant='secondary' disabled={true}>
            <span className='d-block d-xs_sm-none'>Flip</span>
            <span className='d-none d-xs_sm-block'>Flip Card</span>
          </Button>
          <IconButton 
            disabled={true} 
            variant='gray' 
            iconSrc='/icons/arrow_forward.svg' 
            altTag='Next icon' 
            size='sm'
          />
        </div> 
      </div>      
    </>
  )
}

export default PracticeSkeleton