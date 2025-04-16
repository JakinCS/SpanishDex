'use client'

import BackButton from '@/components/BackButton'
import Button from "react-bootstrap/Button";
import UnderlineContainer from '@/components/UnderlineContainer';
import Form from 'react-bootstrap/Form'
import EditCardListItem from '@/components/edit_add-deck/EditCardListItem';
import AddCardArea from '@/components/edit_add-deck/AddCardArea';
import TitleEdit from '@/components/edit_add-deck/TitleEdit';
import { useState } from 'react';
import DiscardChangesModal from '../modals/DiscardChangesModal';

const EditPageBody = ({ deckId, initialData }) => {

  // This state and respective functions handle the show/hide of the discard changes modal
  const [showDiscardModal, setShowDiscardModal] = useState(false);
  const openDiscardModal = () => {setShowDiscardModal(true)}
  const closeDiscardCard = () => {setShowDiscardModal(false)}

  // This is the state for all of the data associated with this deck.
  const [data, setData] = useState(initialData)

  const handleSaveChanges = () => {
    let changes = {
      title: initialData.title === data.title ? undefined : data.title,
      description: initialData.description === data.description ? undefined : data.description,
      deletedCards: [],
      addedCards: [],
      otherCards: []
    }

    changes.deletedCards = initialData.cards.filter((card) => !data.cards.find((otherCard) => (card.id === otherCard.id)))

    data.cards.forEach((card) => {
      const findResult = initialData.cards.find((otherCard) => (card.id === otherCard.id))
      if (!findResult) {
        changes.addedCards.push(card)
      } else {
        if (findResult.english !== card.english || findResult.spanish !== card.spanish) {
          changes.otherCards.push(card)
        }
      }
    })

    console.log({data, changes})
  }

  return (
    <>
      <div className='d-flex justify-content-between align-items-center mb-40'>
        <BackButton />
        <div className='d-flex'>
          <Button variant='outline-danger' className='me-15' onClick={openDiscardModal}>Discard Changes</Button>
          <Button variant='primary' onClick={handleSaveChanges}>Save Deck</Button>
        </div>
      </div>
      
      <p>Title</p>
      <TitleEdit setState={setData} titleValue={data.title} initialTitle={data.title}/>

      <p className='mt-30 mb-10'>Description</p>
      <Form.Control 
        className={data.description.length != 0 ? 'fw-normal' : ''}
        name='description' 
        as='textarea' 
        rows='5' 
        placeholder="Enter a description of your deck." 
        style={{maxWidth: '31.25rem'}}
        value={data.description}
        onChange={(e) => { setData(prev => ({...prev, description: e.target.value})) }}
      />

      <UnderlineContainer className='mt-40 mb-30'>
        <div className='d-flex align-items-center' style={{minHeight: '2.5rem'}}>
          <h3 className='fw-medium'>Add a Card</h3>
        </div>
      </UnderlineContainer>

      <AddCardArea setState={setData}/>

      <UnderlineContainer className='mt-50 mb-30'>
        <div className='d-flex align-items-center' style={{minHeight: '2.5rem'}}>
          <h3 className='fw-medium'>All Cards ({data.cards.length})</h3>
        </div>
      </UnderlineContainer>

      { data.cards.map((card, index) => {
        return <EditCardListItem key={card.id} number={index + 1} cardId={card.id} spanish={card.spanish} english={card.english} className='mb-15' setState={setData}/>
      })}

      <DiscardChangesModal show={showDiscardModal} closeModal={closeDiscardCard} deckId={deckId} deckTitle={data.title} />

    </>
  )
}

export default EditPageBody