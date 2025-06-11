'use client'

import React, { useRef, useState } from 'react';
import PracticeCard from './PracticeCard';
import Link from 'next/link';
import TopButtons from './TopButtons';
import UnderlineContainer from '../utils/UnderlineContainer';
import Button from 'react-bootstrap/Button';
import Card from '../utils/Card';
import SummaryResultCircle from './SummaryResultCircle';
import { practiceCard } from '@/lib/actions';
import SummaryDetailsList from './SummaryDetailsList';
import Alert from 'react-bootstrap/Alert';
import { useRouter } from 'next/navigation';
import ExitPracticeModal from '../modals/ExitPracticeModal';

const PracticePageBody = ({ cards, deckPractice, deckId, ...props }) => {

  const router = useRouter();

  // This state and respective functions handle the show/hide of the exit practice modal
  const [showExitModal, setShowExitModal] = useState(false);
  const openExitModal = () => {setShowExitModal(true)}
  const closeExitModal = () => {setShowExitModal(false)}

  const cardsPracticeInfo = useRef((cards.map((card) => ({_id: card._id, status: null, score: 0}))));
  const updateCardsPracticeInfo = (id, newData) => {
    cardsPracticeInfo.current = cardsPracticeInfo.current.map((c) => {
      if (c._id === id) {
        return {...c, ...newData}
      } else {
        return c
      }
    })
  }

  // Holds an array of cards that have actually been practiced. 
  // (useful when the user exits the practice prematurely and an accurate list of practiced cards needs to be displayed)
  const practicedCards = useRef(null)

  // Returns a card's practice score based on the passed in "id"
  const getScoreById = (id) => {
    const card = cardsPracticeInfo.current.find((c) => c._id === id);
    return card.score;
  }

  // This functions returns the number of cards that scored 5
  const getNumberOf5s = () => cardsPracticeInfo.current.filter((card) => card.score === 5).length;
  // This functions returns the number of cards that scored 4
  const getNumberOf4s = () => cardsPracticeInfo.current.filter((card) => card.score === 4).length;
  // This functions returns the number of cards that scored 3
  const getNumberOf3s = () => cardsPracticeInfo.current.filter((card) => card.score === 3).length;
  // This functions returns the number of cards that scored 2
  const getNumberOf2s = () => cardsPracticeInfo.current.filter((card) => card.score === 2).length;
  // This functions returns the number of cards that scored 1
  const getNumberOf1s = () => cardsPracticeInfo.current.filter((card) => card.score === 1).length;

  // This function gets the % accuracy of the practice session
  const getAccuracy = () => {
    let accuracy = 0;
    practicedCards.current.forEach((card) => {
      accuracy += (card.score - 1) / 4;
    })
    accuracy = accuracy / practicedCards.current.length * 100;

    return Math.round(accuracy);
  }

  const [showSummaryScreen, setShowSummaryScreen] = useState(false);
  const displaySummaryScreen = () => {
    setShowSummaryScreen(true);
    setShowSummaryDetails(false);
    window.scrollTo(0, 0);
  }

  const [showSummaryDetails, setShowSummaryDetails] = useState(false);
  const displaySummaryDetails = () => {
    setShowSummaryScreen(false);
    setShowSummaryDetails(true);
    window.scrollTo(0, 0)
  }

  const [visibleCard, setVisibleCard] = useState(0);
  const incrementVisibleCard = () => {
    setVisibleCard((prev) => (prev === cards.length - 1 ? prev : prev + 1));
  }
  const decrementVisibleCard = () => {
    setVisibleCard((prev) => (prev === 0 ? prev : prev - 1));
  }

  // Whether to show the error on the practice summary page or not.
  const [showError, setShowError] = useState(false);

  // This function contacts the server to update a card's score and practice information
  const sendCardScore = async (id, nextPracticeDate, oldSRAData, score) => {
    
    updateCardsPracticeInfo(id, {status: 'pending'});

    // How late (or early) was this card practiced.
    const lateness = (new Date() - new Date(nextPracticeDate)) / (1000 * 60 * 60 * 24); // in days

    try {
      const practiceResult = await practiceCard(id, oldSRAData, score, lateness);

      if (practiceResult.success) {
        updateCardsPracticeInfo(id, {status: 'success', message: 'Update successful'});

        // Revalidate the cached functions that use the "practice-info" tag.
        revalidatePracticeCache();
      } else {
        updateCardsPracticeInfo(id, {status: 'failure', message: practiceResult.message});
      }
    } catch (error) {
      updateCardsPracticeInfo(id, {status: 'failure', message: error.toString()});
    }

  }

  // This function ensures that the flashcard practice information is saved.
  const ensureDataSaved = async () => {
    const getFailures = () => cardsPracticeInfo.current.filter((card) => card.status === 'failure');
    const getPending = () => cardsPracticeInfo.current.filter((card) => card.status === 'pending');

    const wait500 = async () => (new Promise((resolve, reject) => setTimeout(() => resolve(), 500)));

    return new Promise(async (resolve, reject) => {
      const failedSaves = getFailures();
      let consistentFailures = false;

      if (failedSaves.length > 0) {
        const promises = [];
        failedSaves.forEach((card) => {
          promises.push(sendCardScore(card._id, card.next_practice_date, card.sra, getScoreById(card._id)))
        })
        await Promise.all(promises);

        // Check to see if there are still failures with some cards after this retrying.
        if (getFailures().length > 0) consistentFailures = true;

      }
      if (getPending().length === 0) {
        await wait500();
        resolve({failures: consistentFailures})  
      }
      else {
        await wait500();
        
        while ((getPending()).length > 0)  {
          await wait500();
          continue;
        }
        
        resolve({failures: consistentFailures}); 
      }
    })
  }

  // This function finishes the practice session.
  // First it ensures that all the card practice data has been saved,
  // Then it displays the summary page.
  const finishPractice = async () => {

    const result = await ensureDataSaved();

    if (result.failures) setShowError(true);

    practicedCards.current = cardsPracticeInfo.current.filter((card) => (card.status !== null));

    displaySummaryScreen();
  }

  // This function is run when the back button is clicked. 
  // Then, a modal will be displayed asking the user if he/she wants to truly exit the practice.
  const handleBackButtonClick = (e) => {
    e.preventDefault();

    const cardsPracticed = cardsPracticeInfo.current.filter((card) => (card.status !== null));

    // Open the modal if the user has interacted at all.
    // Otherwise, just go back.
    if (!cardsPracticed.length > 0) {
      if (deckPractice) router.push(`/dashboard/deck/${deckId}`);
      else router.push(`/dashboard`);
    } else {
      openExitModal();
    }

  }

  // Query the special API route to revalidate the cached functions that use the "practice-info" tag.
  const revalidatePracticeCache = async () => {
    const result = await fetch(`/api/revalidate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tags: ['practice-info'],
      }),
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
      {(!showSummaryScreen && !showSummaryDetails) && <TopButtons onClick={handleBackButtonClick} />}
      {!showSummaryScreen && !showSummaryDetails && (
        <>
          <div className='mx-auto' style={{maxWidth: '40.625rem'}}>
            {cards.length > 0 ? (
              <>
                <h1 className='text-center fs-2 mb-20 d-block d-sm-none'>Practice</h1>
                <h1 className='text-center mb-40 d-none d-sm-block'>Practice</h1>
                <section>
                  <p className='mb-10'>{visibleCard + 1} / {cards.length}</p>
                  <div className='d-flex flex-column align-items-center'>
                    <PracticeCard
                      number={visibleCard + 1} 
                      totalCardCount={cards.length} 
                      key={cards[visibleCard]._id} 
                      otherCards={otherCardInfo} 
                      card={{...cards[visibleCard], ...cardsPracticeInfo.current[visibleCard]}} 
                      functions={{next: incrementVisibleCard, back: decrementVisibleCard, finish: finishPractice, updateState: updateCardsPracticeInfo, sendScore: sendCardScore}}
                    />
                  </div>
                </section>
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
          <Alert 
            variant='danger' 
            show={showError} 
            aria-live="polite"
            onClose={() => setShowError(false)} 
            style={{marginTop: '-1rem', marginBottom: '-2.5rem'}} 
            dismissible
          >
            <p className='pe-30'>Some practice results were not able to be saved.</p>
          </Alert>
          <div className='mx-auto' style={{maxWidth: '62.5rem'}}>
            <h1 className='text-center mb-30 mt-70'>Practice Summary</h1>
            <p className='text-center'>Practice complete! You reviewed {practicedCards.current.length} card{practicedCards.current.length > 1 ? 's' : ''} with {getAccuracy()}% accuracy.</p>

            <div className="d-flex justify-content-center">
              <Card xPadding={50} yPadding={30} className='my-50 d-flex flex-wrap gap-30 gap-sm-50 justify-content-center'>
                <SummaryResultCircle score={5} number={getNumberOf5s()}/>
                <SummaryResultCircle score={4} number={getNumberOf4s()}/>
                <SummaryResultCircle score={3} number={getNumberOf3s()}/>
                <SummaryResultCircle score={2} number={getNumberOf2s()}/>
                <SummaryResultCircle score={1} number={getNumberOf1s()}/>
              </Card>
            </div>

            <div className="d-flex flex-column flex-sm-row justify-content-center gap-20 gap-sm-30">
              {deckPractice ? 
                <Link href={`/dashboard/deck/${deckId}`} role="button" className='btn btn-primary' onClick={(e) => {e.preventDefault(); router.push(`/dashboard/deck/${deckId}`)}}>Return to Deck</Link>
                :
                <Link href={`/dashboard`} role="button" className='btn btn-primary' onClick={(e) => {e.preventDefault(); router.push('/dashboard')}}>Return to Dashboard</Link>
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

            <section>
              <UnderlineContainer className='mb-30'>
                <div className='d-flex align-items-center justify-content-between' style={{minHeight: '2.5rem'}}>
                  <h2 className='fw-medium fs-3'>Cards Practiced ({practicedCards.current.length})</h2>
                </div>
              </UnderlineContainer>

              <SummaryDetailsList cards={cards} getScoreById={getScoreById}/>
            </section>

            <div className="d-flex justify-content-center mt-50">
              <Button variant='primary' onClick={displaySummaryScreen}>Back to Summary</Button>
            </div>
          </div>
        </>
      )}

      <ExitPracticeModal show={showExitModal} closeModal={closeExitModal} finishPractice={finishPractice} />
      
    </>
  )
}

export default PracticePageBody