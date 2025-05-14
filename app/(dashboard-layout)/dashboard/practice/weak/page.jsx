import { getWeakCardsInfo } from '@/lib/actions';
import React from 'react';
import PracticePageBody from '@/components/practice/PracticePageBody';
import PageErrorMessage from '@/components/PageErrorMessage';
import { shuffleArray } from '@/lib/utils';


const page = async () => {

  let errorInfo = {isError: false, message: '', hiddenMsg: ''};
  let cards = [];

  try {
    // Get card data for practicing
    const retrievalResult = await getWeakCardsInfo()
    

    if (retrievalResult.success === false) {
      // If there was an error in retrieving the deck, return the error message
      errorInfo.isError = true;
      errorInfo.message = retrievalResult.message || 'Unable to load practice. Please try again.';
      errorInfo.hiddenMsg = retrievalResult.error;
    }

    if (retrievalResult.cards) {
      retrievalResult.cards.forEach((card) => {
        // Convert to plain object
        cards.push(JSON.parse(JSON.stringify(card)));
      })
    }

  } catch (error) {
    errorInfo.isError = true;
    errorInfo.message = errorInfo?.message || 'Unable to load practice. Unexpected error occurred.';
    errorInfo.hiddenMsg = error;
  }

  if (errorInfo.isError) {
    return (
      <PageErrorMessage buttonType={'reload'} error={errorInfo.hiddenMsg}>{errorInfo.message}</PageErrorMessage>
    )
  }

  shuffleArray(cards)

  return (
    <>
      <PracticePageBody cards={cards} deckPractice={false}/>
    </>
  )
}

export default page