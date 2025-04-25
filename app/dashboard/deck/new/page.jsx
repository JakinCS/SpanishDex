import AddPageBody from '@/components/edit_add-deck/AddPageBody'
import React from 'react'

const NewDeckPage = () => {

  const initialData = {
    title: 'New Deck',
    description: '',
    cards: []
  }

  return (
    <AddPageBody initialData={initialData}/>
  )
}

export default NewDeckPage