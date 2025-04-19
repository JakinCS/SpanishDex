'use client'

import Dropdown from 'react-bootstrap/Dropdown'
import MoreMenuToggler from './MoreMenuToggler'

const MoreButton = ({openModal, children, ...otherProps}) => {

  return (
    <>
      <Dropdown {...otherProps}>    
        <Dropdown.Toggle as={MoreMenuToggler}>
          {children}
        </Dropdown.Toggle>

        <Dropdown.Menu className='mt-10 p-2' style={{right: '0'}}>
          <Dropdown.Item eventKey="4" className='danger-item' onClick={openModal}>Discard Changes</Dropdown.Item>
        </Dropdown.Menu>

      </Dropdown>
    </>

  )
}

export default MoreButton