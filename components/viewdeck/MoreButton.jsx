'use client'

import Dropdown from 'react-bootstrap/Dropdown'
import MoreMenuToggler from './MoreMenuToggler'
import { useState } from 'react'
import DeleteDeckModal from '../modals/DeleteDeckModal'
import Link from 'next/link'

const MoreButton = ({deck, children, ...otherProps}) => {
  // Log Out Modal State
  const [deleteDeckOpenState, setDeleteDeckOpenState] = useState(false);

  const openDeleteDeck = () => {
    setDeleteDeckOpenState(true);
  }
  const closeDeleteDeck = () => {
    setDeleteDeckOpenState(false);
  }

  return (
    <>
      <Dropdown {...otherProps}>    
        <Dropdown.Toggle as={MoreMenuToggler}>
          {children}
        </Dropdown.Toggle>

        <Dropdown.Menu className='mt-10' style={{right: '0'}}>
          <Link href={`/dashboard/deck/edit/${deck.id}`} className='dropdown-item mb-2'>Edit Deck</Link>
          <Link href={`/dashboard/deck/practice/${deck.id}`} className='dropdown-item mb-2'>Practice All Cards</Link>
          <Link href={`/dashboard/deck/practice/${deck.id}?weak=true`} className='dropdown-item mb-2'>Practice Weak Cards</Link>
          <Dropdown.Item eventKey="4" className='danger-item' onClick={openDeleteDeck}>Delete Deck</Dropdown.Item>
        </Dropdown.Menu>

      </Dropdown>

      <DeleteDeckModal deck={deck} closeModal={closeDeleteDeck} show={deleteDeckOpenState}/>
    </>

  )
}

export default MoreButton