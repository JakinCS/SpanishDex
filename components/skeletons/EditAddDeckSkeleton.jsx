'use client'

import BackButton from '@/components/BackButton'
import Button from "react-bootstrap/Button";
import UnderlineContainer from '@/components/UnderlineContainer';
import Form from 'react-bootstrap/Form'
import IconButton from '../IconButton';
import ButtonWithIcon from '../ButtonWithIcon';

const EditAddDeckSkeleton = () => {

  return (
    <>
      <div className='d-flex justify-content-between align-items-center mb-40'>
        <BackButton />
        <div className='d-flex'>
          <Button variant='outline-danger' className='d-none d-sm_md-block me-15 disabled'>Discard Changes</Button>
          <Button variant='primary' className='d-none d-xs_sm-block disabled'>Save Deck</Button>
          <Button variant='primary' className='d-block d-xs_sm-none disabled'>Save</Button>
          <IconButton variant='light' className='d-block d-sm_md-none ms-10 disabled' iconSrc='/icons/more.svg' altTag='More options icon' size='sm' />
        </div>
      </div>
      
      <p>Title</p>
      <div className='d-flex align-items-center'>
        <div className='placeholder-glow'>
          <span className='placeholder bg-gray-150 rounded' style={{height: '2rem', width: '12rem' }}></span>
        </div>
        <IconButton className='ms-2 disabled' variant='light' iconSrc={'/icons/edit.svg'} altTag='Edit title icon' size='sm'/>
      </div>

      <p className='mt-30 mb-10'>Description</p>
      <div className='placeholder-glow'>
        <span className='placeholder bg-gray-150 rounded' style={{height: '10rem', width: '100%', maxWidth: '31.25rem' }}></span>
      </div>

      <UnderlineContainer className='mt-40 mb-30'>
        <div className='d-flex align-items-center' style={{minHeight: '2.5rem'}}>
          <h3 className='fw-medium'>Add a Card</h3>
        </div>
      </UnderlineContainer>

      <div className='flashcard-add-list-item d-flex flex-column flex-sm_md-row align-items-center'>
        <div className='d-flex flex-column flex-lg-row align-items-start gap-15 me-sm_md-30 w-100'>
          <div className="word-flex d-flex w-100 w-lg-50">
            <Form.Group className='w-100'>
              <Form.Control 
                className={'add-word-input'}
                name='english' 
                type="text" 
                placeholder="Type English word" 
              />
            </Form.Group>
          </div>

          <div className={"word-flex spanish-flex d-flex flex-column w-100 w-lg-50"}>
            <Form.Control 
              className={'add-word-input'} 
              name='spanish' 
              type="text" 
              placeholder="Type Spanish word"
            />
          </div>
        </div>
        <ButtonWithIcon 
          variant='primary' 
          iconSrc='/icons/add_3.svg' 
          altTag='' 
          iconHeight={16} 
          iconFillColor={'white'} 
          className='flex-shrink-0 d-block d-sm_md-none mt-20 w-100 disabled' 
        >
          Add Card
        </ButtonWithIcon>
        <ButtonWithIcon 
          variant='primary' 
          iconSrc='/icons/add_3.svg' 
          altTag='' 
          iconHeight={16} 
          iconFillColor={'white'} 
          className='flex-shrink-0 d-none d-sm_md-block ms-0 ms-md-60 ms-md_lg-120 ms-lg-0 disabled' 
        >
          Add Card
        </ButtonWithIcon>
      </div>

      <UnderlineContainer className='mt-50 mb-30'>
        <div className='d-flex align-items-center' style={{minHeight: '2.5rem'}}>
          <h3 className='fw-medium'>All Cards 
            <div className='d-inline ms-3 placeholder-glow'><span className='placeholder bg-gray-150 rounded' style={{height: '1.75rem', width: '2rem' }}></span></div>
          </h3>
        </div>
      </UnderlineContainer>

      <p className='text-center mb-50'>Loading . . .</p>

    </>
  )
}

export default EditAddDeckSkeleton