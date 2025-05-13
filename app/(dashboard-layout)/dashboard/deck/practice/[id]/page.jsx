import React from 'react'
import { notFound } from 'next/navigation'
import TopButtons from '@/components/practice/TopButtons';
import { getDeckPracticeInfo } from '@/lib/actions';
import PracticePageBody from '@/components/practice/PracticePageBody';
import PageErrorMessage from '@/components/PageErrorMessage';
import { shuffleArray } from '@/lib/utils';

const page = async ({ params, searchParams }) => {

  const { id } = await params;
  const queryParams = await searchParams;

  // Ensure the id is a valid ObjectId format before proceeding
  if ( !(/^[0-9a-fA-F]+$/.test(id)) || id.length !== 24) {
    notFound() // Trigger the 404 page in Next.js if the id is invalid
  }

  let errorInfo = {isError: false, message: '', hiddenMsg: ''};
  let deck = undefined;

  try {
    // Get card data for practicing
    const retrievalResult = await getDeckPracticeInfo(id, queryParams.weak === 'true')

    if (retrievalResult.success === false) {
      // If there was an error in retrieving the deck, return the error message
      errorInfo.isError = true;
      errorInfo.message = retrievalResult.message || 'Unable to load page. Please try again.';
      errorInfo.hiddenMsg = retrievalResult.error;
    }
    
    deck = retrievalResult?.deck; // This will be the deck and cards object returned from the function

  } catch (error) {
    errorInfo.isError = true;
    errorInfo.message = errorInfo?.message || 'Unable to load page. Unexpected error occurred.';
    errorInfo.hiddenMsg = error;
  }

  if (deck === null) {
    // If deck is null, trigger the 404 page in Next.js
    notFound()
  }

  if (errorInfo.isError) {
    return (
      <PageErrorMessage buttonType={errorInfo.message.includes('Unauthorized') ? 'dashboard' : 'reload'} error={errorInfo.hiddenMsg}>{errorInfo.message}</PageErrorMessage>
    )
  }

  const deckCards = deck.cards.map((card) => {
    // Convert to plain object
    return JSON.parse(JSON.stringify(card))
  })

  shuffleArray(deckCards)

  return (
    <>
      <TopButtons />
      <PracticePageBody cards={deckCards} />
    </>
  )
}

export default page