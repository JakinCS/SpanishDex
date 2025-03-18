'use client'

import FilterButton from "./FilterButton";
import DeckSearch from "./DeckSearch";
import DashboardDeck from "./DashboardDeck";
import Link from "next/link";
import { useState } from "react";

const DecksArea = ({decks}) => {

  const [deckList, setDeckList] = useState({decks: decks, filter: 'recent', prevFilter: null, reversed: false})
  
  return (
    <>
      <div className="filter-search-container d-flex align-items-center justify-content-between py-15 mb-40 border-bottom border-gray-150 border-2">
        <h3 className="fw-medium">All Decks</h3> 
        <div className="d-flex">
          <FilterButton className='me-15' deckList={deckList} setDeckList={setDeckList}>
            {deckList.filter === 'recent' ? 'Recent' : (deckList.filter === 'creation_date' ? 'Date Created' : (deckList.reversed ? 'Z - A' : 'A - Z')) }
          </FilterButton>
          <DeckSearch />
        </div>
      </div>

      <div className="container-fluid p-0">
        <div className="row" style={{margin: '-1.25rem'}}>

          {
            deckList.decks.map((deck) => {
              let deckData = {
                id: deck._id,
                title: deck.title,
                cards: deck.cards,
                weak_cards: deck.weak_cards,
                date_created: deck.date_created,
                last_practiced: deck.last_practiced,
                display_creation_date: deckList.filter === 'creation_date' || (deckList.prevFilter === 'creation_date' && deckList.filter === 'alphabetical')
              }
              /* NOTE: The display_creation_date property indicates whether the card should display the 'date_created' value or the 'last_practiced' value. */

              return (
                <div key={deck._id} className="col-12 col-md-6 col-lg_xl-4 px-0" style={{minWidth: '18.7519525rem'}}>
                  <DashboardDeck className='p-20' deckData={deckData}/> 
                </div>
              )
            })
          }

          {/* Display this section whenever the user has no decks */}
          { deckList.decks.length === 0 && 
            <div className="col mt-4">
              <p className="text-center mb-4">You currently have no flashcard decks.</p>
              <div className="d-flex justify-content-center">
                <Link href="#" role="button" className="btn btn-outline-primary">Create a Deck</Link>
              </div>
            </div>
          }

        </div>
      </div>
    </>
  )
}

export default DecksArea