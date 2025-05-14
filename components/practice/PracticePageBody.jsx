'use client'

import React, { useState } from 'react';
import PracticeCard from './PracticeCard';
import Link from 'next/link';
import TopButtons from './TopButtons';
import UnderlineContainer from '../UnderlineContainer';
import SummaryCardListItem from './SummaryCardListItem';
import Button from 'react-bootstrap/Button';
import Card from '../Card';
import SummaryResultCircle from './SummaryResultCircle';

const PracticePageBody = ({ cards, deckPractice, deckId, ...props }) => {

  const [showSummaryScreen, setShowSummaryScreen] = useState(false);
  const displaySummaryScreen = () => {
    setShowSummaryScreen(true);
    setShowSummaryDetails(false);
    window.scrollTo(0, 0)
  }

  const [showSummaryDetails, setShowSummaryDetails] = useState(false);
  const displaySummaryDetails = () => {
    setShowSummaryScreen(false);
    setShowSummaryDetails(true);
    window.scrollTo(0, 0)
  }

  const [visibleCard, setVisibleCard] = useState(0);
  const incrementVisibleCard = () => {
    setVisibleCard((prev) => {
      if (prev === cards.length - 1) {
        return prev;
      } else {
        return prev + 1;
      }
    });
  }
  const decrementVisibleCard = () => {
    setVisibleCard((prev) => {
      if (prev === 0) {
        return prev;
      } else {
        return prev - 1;
      }
    });
  }

  const otherCardInfo = {
    prev: (visibleCard > 0 ? {
      card: cards[visibleCard - 1]
    } : null),
    next: (visibleCard + 1 < cards.length ? {
      card: cards[visibleCard + 1]
    } : null)
  }

  return (
    <>
      {showSummaryDetails && <TopButtons exit={true} onClick={displaySummaryScreen}/>}
      {(!showSummaryScreen && !showSummaryDetails) && <TopButtons />}
      {!showSummaryScreen && !showSummaryDetails && (
        <>
          <div className='mx-auto' style={{maxWidth: '40.625rem'}}>
            {cards.length > 0 ? (
              <>
                <h1 className='text-center mb-30 mb-sm-40'>Practice</h1>
                <p className='mb-10'>{visibleCard + 1} / {cards.length}</p>
                <div className='d-flex flex-column align-items-center'>
                  <PracticeCard className='mb-30' number={visibleCard + 1} totalCardCount={cards.length} key={cards[visibleCard]._id} otherCards={otherCardInfo} card={cards[visibleCard]} functions={{next: incrementVisibleCard, back: decrementVisibleCard, finish: displaySummaryScreen}}/>
                </div>
              </>
            ) : (
              <>
                <h1 className='text-center mb-30 mb-sm-40'>No Cards to Practice!</h1>
                <div className="d-flex justify-content-center">
                  {deckPractice ? 
                    <Link href={`/dashboard/deck/${deckId}`} role="button" className='btn btn-primary'>Return to Deck</Link>
                    :
                    <Link href={`/dashboard`} role="button" className='btn btn-primary'>Return to Dashboard</Link>
                  }
                </div>
              </>
            )}        
          </div>
        </>
      )} 
      {showSummaryScreen && (
        <>
          <div className='mx-auto' style={{maxWidth: '62.5rem'}}>
            <h1 className='text-center mb-30 mt-70'>Practice Summary</h1>
            <p className='text-center'>Practice complete! You reviewed {cards.length} card{cards.length > 1 ? 's' : ''}.</p>

            <div className="d-flex justify-content-center">
              <Card xPadding={50} yPadding={30} className='my-50 d-flex flex-wrap gap-30 gap-sm-50 justify-content-center'>
                <SummaryResultCircle score={5} number={3}/>
                <SummaryResultCircle score={4} number={0}/>
                <SummaryResultCircle score={3} number={17}/>
                <SummaryResultCircle score={2} number={2}/>
                <SummaryResultCircle score={1} number={4}/>
              </Card>
            </div>

            <div className="d-none d-sm-flex justify-content-center">
              {deckPractice ? 
                <Link href={`/dashboard/deck/${deckId}`} role="button" className='btn btn-primary'>Return to Deck</Link>
                :
                <Link href={`/dashboard`} role="button" className='btn btn-primary'>Return to Dashboard</Link>
              }
              <Button variant='outline-primary ms-30' onClick={displaySummaryDetails}>View Practice Details</Button>
            </div>
            <div className='d-flex d-sm-none flex-column gap-20'>
                {deckPractice ? 
                  <Link href={`/dashboard/deck/${deckId}`} role="button" className='btn btn-primary'>Return to Deck</Link>
                  :
                  <Link href={`/dashboard`} role="button" className='btn btn-primary'>Return to Dashboard</Link>
                }
                <Button variant='outline-primary' onClick={displaySummaryDetails}>View Practice Details</Button>
            </div>
          </div>
        </>
      )}
      {showSummaryDetails && (
        <>
          <div className='mx-auto' style={{maxWidth: '62.5rem'}}>
            <h1 className='text-center mb-30'>Practice Details</h1>
            <UnderlineContainer className='mb-30'>
              <div className='d-flex align-items-center justify-content-between' style={{minHeight: '2.5rem'}}>
                <h3 className='fw-medium'>Cards Practiced ({cards.length})</h3>
              </div>
            </UnderlineContainer>

            <SummaryCardListItem className='mb-10' number='1' score={3} cardInfo={{spanish: 'hola', english: 'hello'}}/>
            <SummaryCardListItem className='mb-10' number='2' score={3} cardInfo={{spanish: 'hola', english: 'hello'}}/>
            <SummaryCardListItem className='mb-10' number='3' score={3} cardInfo={{spanish: 'hola', english: 'hello'}}/>
            <SummaryCardListItem className='mb-10' number='4' score={3} cardInfo={{spanish: 'hola', english: 'hello'}}/>
            <SummaryCardListItem className='mb-10' number='5' score={3} cardInfo={{spanish: 'hola', english: 'hello'}}/>
            <SummaryCardListItem className='mb-10' number='6' score={3} cardInfo={{spanish: 'hola', english: 'hello'}}/>
            <SummaryCardListItem className='mb-10' number='7' score={3} cardInfo={{spanish: 'hola', english: 'hello'}}/>
            <SummaryCardListItem className='mb-10' number='8' score={3} cardInfo={{spanish: 'hola', english: 'hello'}}/>
            <SummaryCardListItem className='mb-10' number='9' score={3} cardInfo={{spanish: 'hola', english: 'hello'}}/>
            <SummaryCardListItem className='mb-10' number='10' score={3} cardInfo={{spanish: 'hola', english: 'hello'}}/>
            <SummaryCardListItem className='mb-10' number='11' score={3} cardInfo={{spanish: 'hola', english: 'hello'}}/>
            <SummaryCardListItem className='mb-10' number='12' score={3} cardInfo={{spanish: 'hola', english: 'hello'}}/>
            <SummaryCardListItem className='mb-10' number='13' score={3} cardInfo={{spanish: 'hola', english: 'hello'}}/>
            <SummaryCardListItem className='mb-10' number='14' score={3} cardInfo={{spanish: 'hola', english: 'hello'}}/>
            <SummaryCardListItem className='mb-10' number='15' score={3} cardInfo={{spanish: 'hola', english: 'hello'}}/>

            <div className="d-flex justify-content-center mt-50">
              <Button variant='primary ms-30' onClick={displaySummaryScreen}>Back to Summary</Button>
            </div>
          </div>
        </>
      )}
      
    </>
  )
}

export default PracticePageBody