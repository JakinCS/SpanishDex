import React from 'react'
import EditPageBody from '@/components/edit_add-deck/EditPageBody';
import PageErrorMessage from '@/components/miscellaneous/PageErrorMessage';
import { notFound } from 'next/navigation'
import { getEditDeckInfo } from '@/lib/actions'
import { auth } from '@/auth';

export const metadata = {
  title: "Edit Deck - SpanishDex",
};

const EditDeckPage = async ({ params }) => {

  const { id } = await params
  // Ensure the id is a valid ObjectId format before proceeding
  if ( !(/^[0-9a-fA-F]+$/.test(id)) || id.length !== 24) {
    notFound() // Trigger the 404 page in Next.js if the id is invalid
  }

  let errorInfo = {isError: false, message: '', hiddenMsg: ''};
  let initialData = undefined;

  try {
    const retrievalResult = await getEditDeckInfo(id)

    if (retrievalResult.success === false) {
      // If there was an error in retrieving the deck, return the error message
      errorInfo.isError = true;
      errorInfo.message = retrievalResult.message || 'Unable to load deck information. Please try again.';
      errorInfo.hiddenMsg = retrievalResult.error;
    }
    
    initialData = JSON.parse(JSON.stringify(retrievalResult?.deck)); // This will be the deck object returned from the getDeck function

  } catch (error) {
    errorInfo.isError = true;
    errorInfo.message = errorInfo?.message || 'Unable to load deck information. Unexpected error occurred.';
    errorInfo.hiddenMsg = error;
  }

  if (initialData === null) {
    // If deck is null, trigger the 404 page in Next.js
    notFound()
  }

  if (errorInfo.isError) {
    return (
      <PageErrorMessage buttonType={errorInfo.message.includes('Unauthorized') ? 'dashboard' : 'reload'} error={errorInfo.hiddenMsg}>{errorInfo.message}</PageErrorMessage>
    )
  }

  return (
    <EditPageBody deckId={id} initialData={initialData}/>
  )
}

export default EditDeckPage