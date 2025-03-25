'use client'

import DashboardDeck from "./DashboardDeck";
import Link from "next/link";
import { useState } from "react";
import FilterSearchSection from "./FilterSearchSection";

const DecksArea = ({ decks, indicateLoading }) => {

  const [deckList, setDeckList] = useState({decks: decks, searchResults: null, filter: 'recent', prevFilter: null, reversed: false})

  
  return (
    <>
      <FilterSearchSection deckList={deckList} setDeckList={setDeckList}/>

      { indicateLoading ?
        <div className="col mt-4">
          <p className="text-center fw-medium mb-4">Loading flashcard decks . . .</p>
        </div>
        :

        <div className="container-fluid p-0">
          <div className="row" style={{margin: '-1.25rem'}}>

            {deckList.searchResults != null ?
              deckList.searchResults.map((deck) => {
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
              :
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
              <div className="col mt-4 mb-40 mb-sm-0">
                <p className="text-center mb-4">You currently have no flashcard decks.</p>
                <div className="d-flex justify-content-center">
                  <Link href="#" role="button" className="btn btn-outline-primary">Create a Deck</Link>
                </div>
              </div>
            }

          </div>
        </div>
      }
      
    </>
  )
}

export default DecksArea