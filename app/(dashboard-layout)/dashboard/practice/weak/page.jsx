import { getWeakCardsInfo } from '@/lib/actions';
import React from 'react';
import BackButton from '@/components/BackButton';
import PracticePageBody from '@/components/practice/PracticePageBody';


const page = async () => {

  let errorInfo = {isError: false, message: '', hiddenMsg: ''};
  let cards = undefined;

  try {
    // Get card data for practicing
    const retrievalResult = await getWeakCardsInfo()
    

    if (retrievalResult.success === false) {
      // If there was an error in retrieving the deck, return the error message
      errorInfo.isError = true;
      errorInfo.message = retrievalResult.message || 'Unable to load practice. Please try again.';
      errorInfo.hiddenMsg = retrievalResult.error;
    }
    
    cards = retrievalResult?.cards; // This will be the cards array returned from the function

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

  return (
    <>
      <BackButton className='mb-30 mb-sm-40'/>
      <PracticePageBody cards={cards} />
    </>
  )
}

export default page