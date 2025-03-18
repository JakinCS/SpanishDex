'use client'

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Image from 'next/image';
import IconButton from '../IconButton';
import { useState } from 'react';

const DeckSearch = () => {
  const [showSearch, setShowSearch] = useState(false);
  const toggleShowSearch = () => setShowSearch(prev => !prev)

  return (
    <>
      <IconButton variant='light' iconSrc='/icons/search.svg' altTag={'Search icon'} size='sm' className={'d-block d-sm_md-none sort-search-button ' + (showSearch && 'selected')} onClick={toggleShowSearch}/>
      <Form className='d-none d-sm_md-block'>
        <InputGroup className='search-input-group'>
          <InputGroup.Text><Image className="icon" height={24} width={24} alt={'Search icon'} src={'/icons/search.svg'} /></InputGroup.Text>
          <Form.Control name="search" type="text" placeholder="Search for a deck"/>
        
        </InputGroup>
      </Form>
      <Form className={!showSearch ? 'd-none' : 'd-block d-sm_md-none px-25 px-sm-50 position-absolute start-0 mt-50 w-100'} style={!showSearch ? {display: 'none'} : {display: 'block'}}>
        <InputGroup className='search-input-group w-100'>
          <InputGroup.Text className='px-10'></InputGroup.Text>
          <Form.Control name="search" type="text" placeholder="Search for a deck"/>
        
        </InputGroup>
      </Form>
    </>
  )
}

export default DeckSearch