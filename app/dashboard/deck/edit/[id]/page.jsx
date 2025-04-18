import React from 'react'
import EditPageBody from '@/components/edit_add-deck/EditPageBody';

const EditDeckPage = async ({ params }) => {
  const { id } = await params
  console.log(id)

  // const initialData = {
  //   title: 'Spanish Verbs',
  //   description: 'This is a deck to learn the common Spanish verbs',
  //   cards: [
  //     { id: '67d5a739d8732601f8496ef5', english: 'To Eat', spanish: 'Comer' },
  //     { id: '67d4a24ad8732601f8496eb0', english: 'To Drink', spanish: 'Beber' },
  //     { id: '67d4a56cd8732601f8496eb7', english: 'To Run', spanish: 'Correr' },
  //     { id: '67d5987ad8732601f8496edf', english: 'To Walk', spanish: 'Caminar' },
  //     { id: '67d5a715d8732601f8496ef4', english: 'To Swim', spanish: 'Nadar' },
  //   ]
  // }
  const initialData = {
    title: 'Spanish Verbs',
    description: 'This is a deck to learn the common Spanish verbs',
    cards: [    ]
  }

  return (
    <EditPageBody deckId={id} initialData={initialData}/>
  )
}

export default EditDeckPage