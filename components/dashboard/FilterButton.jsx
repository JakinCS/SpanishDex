"use client"

import Dropdown from 'react-bootstrap/Dropdown'
import FilterMenuToggler from './FilterMenuToggler'

const FilterButton = ({setDeckList, children, ...otherProps}) => {

  // Reverses the order of the list of decks. Indicates the reversal state. 
  const reverseDeck = () => {
    setDeckList((prev) => {
      let newSearchResultsList = null;
      if (prev.searchResults != null) {
        newSearchResultsList = prev.searchResults.toReversed();
      }

      return {
        ...prev, 
        decks: prev.decks.toReversed(), 
        searchResults: newSearchResultsList, 
        reversed: !prev.reversed
      }
    })
  };
  // Orders the decks in descending order by the date of creation. Indicates in the state the filter type and the reversal status. 
  const filterDateCreated = () => setDeckList((prev) => {
    let newDeckList = prev.decks.toSorted((a, b) => (new Date(b.date_created)).getTime() - (new Date(a.date_created)).getTime());
    
    let newSearchResultsList = null
    if (prev.searchResults != null) {
      newSearchResultsList = prev.searchResults.toSorted((a, b) => (new Date(b.date_created)).getTime() - (new Date(a.date_created)).getTime());
    }
    return {
      decks: newDeckList, 
      searchResults: newSearchResultsList,
      filter: 'creation_date', 
      prevFilter: (prev.filter === 'creation_date' ? prev.prevFilter : prev.filter), 
      reversed: false
    }
  })
  // Orders the decks in descending order by the date of last practice. Indicates in the state the filter type and the reversal status. 
  const filterRecent = () => setDeckList((prev) => {
    let newDeckList = prev.decks.toSorted((a, b) => (new Date(b.last_practiced)).getTime() - (new Date(a.last_practiced)).getTime());

    let newSearchResultsList = null
    if (prev.searchResults != null) {
       prev.searchResults.toSorted((a, b) => (new Date(b.last_practiced)).getTime() - (new Date(a.last_practiced)).getTime());
    }
    return {
      decks: newDeckList, 
      searchResults: newSearchResultsList,
      filter: 'recent', 
      prevFilter: (prev.filter === 'recent' ? prev.prevFilter : prev.filter), 
      reversed: false
    }
  })
  // Orders the decks in ascending order alphabetically. Indicates in the state the filter type and the reversal status. 
  const filterAlphabetical = () => setDeckList((prev) => {
    let newDeckList = prev.decks.toSorted((a, b) => (a.title.toLowerCase() > b.title.toLowerCase()) - (a.title.toLowerCase() < b.title.toLowerCase()) );
    
    let newSearchResultsList = null
    if (prev.searchResults != null) {
      newSearchResultsList = prev.searchResults.toSorted((a, b) => (a.title.toLowerCase() > b.title.toLowerCase()) - (a.title.toLowerCase() < b.title.toLowerCase()) );
    }
    return {
      decks: newDeckList, 
      searchResults: newSearchResultsList,
      filter: 'alphabetical', 
      prevFilter: (prev.filter === 'alphabetical' ? prev.prevFilter : prev.filter), 
      reversed: false
    }
  })
  

  return (
    <Dropdown {...otherProps}>    
      <Dropdown.Toggle as={FilterMenuToggler} id="dropdown-custom-components">
        {children}
      </Dropdown.Toggle>

      <Dropdown.Menu className='mt-10' align={{ sm_md: 'start' }}>
        <h4 className='text-center fw-medium py-2'>Sort By</h4>
        <Dropdown.Divider />
        <Dropdown.Item eventKey="1" onClick={filterRecent}>Recent</Dropdown.Item>
        <Dropdown.Item eventKey="2" onClick={filterDateCreated}>Date Created</Dropdown.Item>
        <Dropdown.Item eventKey="3" onClick={filterAlphabetical}>A - Z</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item eventKey="4" onClick={reverseDeck}>Reverse Order</Dropdown.Item>
      </Dropdown.Menu>

    </Dropdown>
  )
}

export default FilterButton