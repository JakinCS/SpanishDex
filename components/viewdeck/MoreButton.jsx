'use client'

import Dropdown from 'react-bootstrap/Dropdown'
import MoreMenuToggler from './MoreMenuToggler'
import { useState } from 'react'
import DeleteDeckModal from '../modals/DeleteDeckModal'

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
          <Dropdown.Item eventKey="1">Edit Deck</Dropdown.Item>
          <Dropdown.Item eventKey="2">Practice All Cards</Dropdown.Item>
          <Dropdown.Item eventKey="3">Practice Weak Cards</Dropdown.Item>
          <Dropdown.Item eventKey="4" className='danger-item' onClick={openDeleteDeck}>Delete Deck</Dropdown.Item>
        </Dropdown.Menu>

      </Dropdown>

      <DeleteDeckModal deck={deck} closeModal={closeDeleteDeck} show={deleteDeckOpenState}/>
    </>

  )
}

export default MoreButton