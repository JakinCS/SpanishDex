import FilterButton from "./FilterButton";
import { useState } from "react";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import IconButton from '@/components/utils/IconButton';
import Icon from "../utils/Icon";
import UnderlineContainer from "../utils/UnderlineContainer";

const FilterSearchSection = ({ deckList, setDeckList }) => {
  // The show/hide state of the search input field for mobile layouts
  const [showSearch, setShowSearch] = useState(false);
  const toggleShowSearch = () => setShowSearch(prev => !prev)

  // Keeps track of the search field value
  const [search, setSearch] = useState({value: ''})

  // Updates the search field value and runs a function to filter the list
  const updateValueAndSubmit = (e) => {
    setSearch((prev) => ({...prev, value: e.target.value}))

    completeSearch(e.target.value);
  }

  // Filters the deck list based on the search value. The search is case insensitive.
  const completeSearch = (searchValue) => {
    if (searchValue === '') {
      setDeckList((prev) => ({...prev, searchResults: null}))
      return
    }
    
    setDeckList((prev) => {
      return {
        ...prev, 
        searchResults: prev.decks.filter( (deck) => deck.title.toLowerCase().includes(searchValue.toLowerCase()) )
      }
    })


  }

  // Clears the search field and resets the deck list to the original state
  const clearSearch = () => {
    setSearch({value: ''});
    setDeckList((prev) => ({...prev, searchResults: null}))
  }

  const searchBody = (
    <>
      <InputGroup.Text className='px-10 px-sm_md-15'>
        <Icon className="d-none d-sm_md-block" height={24} src='/icons/search.svg' alt="" />
      </InputGroup.Text>
      <Form.Control name="search" value={search.value} onChange={updateValueAndSubmit} type="text" placeholder="Search for a deck"/>
      <InputGroup.Text>
        <button className={'clear-search ' + (search.value === '' ? 'd-none' : 'd-flex')} onClick={clearSearch}>
          <Icon height={24} alt="Cancel search" src="/icons/cancel.svg"/>
        </button>
      </InputGroup.Text>
    </>
  )


  return (
    <UnderlineContainer className="filter-search-container mb-40">
      <div className="d-flex align-items-center justify-content-between gap-3">
        <h2 className="fw-medium fs-3" aria-live="polite">{deckList.searchResults == null ? 'All Decks' : (deckList.searchResults.length === 1 ? `1 Result for '${search.value}'` : `${deckList.searchResults.length} Results for '${search.value}'`)}</h2>
        <div className="d-flex">
          <FilterButton className='me-15' setDeckList={setDeckList}>
            {deckList.filter === 'recent' ? 'Recent' : (deckList.filter === 'creation_date' ? 'Date Created' : (deckList.reversed ? 'Z - A' : 'A - Z')) }
          </FilterButton>
        
          <IconButton variant='light' iconSrc='/icons/search.svg' altTag={'Search for a deck icon'} size='sm' className={'d-block d-sm_md-none sort-search-button ' + (showSearch && 'selected')} onClick={toggleShowSearch}/>
          <Form onSubmit={(e) => e.preventDefault()} className='d-none d-sm_md-block'>
            <InputGroup className='search-input-group'>
              {searchBody}
            </InputGroup>
          </Form>
        </div>
      </div>
      <Form onSubmit={(e) => e.preventDefault()} className={'mt-3 ' + (!showSearch ? 'd-none' : 'd-block d-sm_md-none')}>
        <InputGroup className='search-input-group w-100'>
          {searchBody}
        </InputGroup>
      </Form>
    </UnderlineContainer>
  )
}

export default FilterSearchSection