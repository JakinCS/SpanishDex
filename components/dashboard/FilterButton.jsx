"use client"

import Dropdown from 'react-bootstrap/Dropdown'
import FilterMenuToggler from './FilterMenuToggler'

const FilterButton = ({children, ...otherProps}) => {
  return (
    <Dropdown {...otherProps}>    
      <Dropdown.Toggle as={FilterMenuToggler} id="dropdown-custom-components">
        {children}
      </Dropdown.Toggle>

      <Dropdown.Menu className='mt-10' align={{ sm_md: 'start' }}>
        <h4 className='text-center fw-medium py-2'>Sort By</h4>
        <Dropdown.Divider />
        <Dropdown.Item eventKey="1">Recent</Dropdown.Item>
        <Dropdown.Item eventKey="2">Date Created</Dropdown.Item>
        <Dropdown.Item eventKey="3">A - Z</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item eventKey="4">Reverse Order</Dropdown.Item>
      </Dropdown.Menu>

    </Dropdown>
  )
}

export default FilterButton