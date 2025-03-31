'use client'

import Dropdown from 'react-bootstrap/Dropdown'
import MoreMenuToggler from './MoreMenuToggler'

const MoreButton = ({children, ...otherProps}) => {
  return (
    <Dropdown {...otherProps}>    
      <Dropdown.Toggle as={MoreMenuToggler}>
        {children}
      </Dropdown.Toggle>

      <Dropdown.Menu className='mt-10' style={{right: '0'}}>
        <Dropdown.Item eventKey="1">Edit Deck</Dropdown.Item>
        <Dropdown.Item eventKey="2">Practice All Cards</Dropdown.Item>
        <Dropdown.Item eventKey="3">Practice Weak Cards</Dropdown.Item>
        <Dropdown.Item eventKey="4" className='danger-item'>Delete Deck</Dropdown.Item>
      </Dropdown.Menu>

    </Dropdown>
  )
}

export default MoreButton