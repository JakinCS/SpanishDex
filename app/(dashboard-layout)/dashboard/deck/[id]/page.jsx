import BackButton from '@/components/miscellaneous/BackButton'
import ButtonWithIcon from "@/components/utils/ButtonWithIcon";
import CardListItem from '@/components/viewdeck/CardListItem'
import Icon from '@/components/utils/Icon'
import IconButton from '@/components/utils/IconButton';
import UnderlineContainer from '@/components/utils/UnderlineContainer'
import MoreButton from '@/components/viewdeck/MoreButton'
import Link from 'next/link'
import PageErrorMessage from '@/components/miscellaneous/PageErrorMessage'
import { notFound } from 'next/navigation'
import { getDeckInfo } from '@/lib/actions'
import React from 'react'
import Card from '@/components/utils/Card';

export const metadata = {
  title: "View Deck - SpanishDex",
};

const DeckPage = async ({ params }) => {

  const { id } = await params

  // Ensure the id is a valid ObjectId format before proceeding
  if ( !(/^[0-9a-fA-F]+$/.test(id)) || id.length !== 24) {
    notFound() // Trigger the 404 page in Next.js if the id is invalid
  }

  let errorInfo = {isError: false, message: '', hiddenMsg: ''};
  let deck = undefined;

  try {
    const retrievalResult = await getDeckInfo(id)

    if (retrievalResult.success === false) {
      // If there was an error in retrieving the deck, return the error message
      errorInfo.isError = true;
      errorInfo.message = retrievalResult.message || 'Unable to load deck. Please try again.';
      errorInfo.hiddenMsg = retrievalResult.error;
    }
    
    deck = retrievalResult?.deck; // This will be the deck object returned from the getDeck function

  } catch (error) {
    errorInfo.isError = true;
    errorInfo.message = errorInfo?.message || 'Unable to load deck. Unexpected error occurred.';
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

  const dateCreated = new Date(deck.date_created);
  // Format the date to a readable format
  const formattedDateCreated = `${dateCreated.toLocaleString('default', { month: 'long' })} ${dateCreated.getDate()}, ${dateCreated.getFullYear()}`;
  
  const lastPracticed = new Date(deck.last_practiced);
  // Format the date to a readable format
  const formattedLastPracticed = `${lastPracticed.toLocaleString('default', { month: 'long' })} ${lastPracticed.getDate()}, ${lastPracticed.getFullYear()}`;

  

  return (
    <>
      <div className='d-flex justify-content-between align-items-center mb-40'>
        <BackButton url='/dashboard'/>
        <div className='d-flex'>
          <ButtonWithIcon isLinkButton={true} className="btn btn-gray d-none d-xs_sm-block me-10" href={`/dashboard/deck/edit/${id}`} iconSrc='/icons/edit.svg' iconHeight={24} altTag=''>Edit Deck</ButtonWithIcon>
          <IconButton className={'btn btn-gray d-block d-xs_sm-none me-10'} isLinkButton={true} href={`/dashboard/deck/edit/${id}`} iconSrc='/icons/edit.svg' altTag='Edit deck icon' size='sm' />
          <MoreButton deck={{id: deck._id.toString(), title: deck.title}}/> 
        </div>
      </div>

      <section>
        <h1 className='mb-25'>{deck.title}</h1>
        <p>{deck.description != '' ? deck.description : <span className='fst-italic'>No description for this deck</span>}</p>
        <Card xPadding={30} yPadding={35} className="mt-50" style={{maxWidth: '31.25rem'}}>
          <h2 className="fw-medium fs-3 text-center text-xs_sm-start heading-underline-blue-100 lh-1 mb-40">Deck Information</h2>
          <div className='d-flex flex-column flex-xs_sm-row gap-15 gap-xs_sm-30'>
            <span className="d-flex align-items-center justify-content-center gap-3 mx-2 mx-sm-0 fw-medium">
              <Icon height={24} alt="" src={'/icons/cards300.svg'}/>
              <p><span>{deck.cards.length}</span> Total Cards</p>
            </span>
            <span className="d-flex align-items-center justify-content-center gap-3 mx-2 mx-sm-0 fw-medium">
              <Icon height={24} alt="" src={'/icons/cards300.svg'}/>
              <p><span>{deck.weak_cards}</span> Weak Cards</p>
            </span>
          </div>
          <hr className='my-20'/>
          <span className="d-flex flex-wrap justify-content-center justify-content-xs_sm-start gap-2 mx-2 mx-sm-0">
            <p className='d-flex align-items-center'><Icon height={24} alt="" src={'/icons/calendar.svg'}/><span className='ms-2 me-3 fw-medium'>Created:</span></p>
            <p>{formattedDateCreated}</p>
          </span>
          <hr className='my-20'/>
          <span className="d-flex flex-wrap justify-content-center justify-content-xs_sm-start gap-2 mx-2 mx-sm-0">
            <p className='d-flex align-items-center'><Icon height={24} alt="" src={'/icons/clock.svg'}/><span className='ms-2 me-3 fw-medium'>Last Practiced:</span></p>
            <p>{formattedLastPracticed}</p>
          </span>
          {deck.cards.length > 0 && (
            <>
              <hr className='my-20'/>
              <Link href={`/dashboard/deck/practice/${id}`} role="button" className='btn btn-primary d-block d-sm-inline-block mt-30 mt-sm-10'>Review All Cards</Link>            
            </>
          )}
        </Card>

        
        {deck.weak_cards > 0 && (
          <section style={{maxWidth: '31.25rem'}} className='mt-30 px-30 py-35 bg-white rounded border border-2 border-secondary'>
            <h2 className="fw-medium fs-3 text-center text-xs_sm-start lh-1 mb-20">Review Weak Cards</h2>
            <p className='text-center text-xs_sm-start'>You have {deck.weak_cards} weak cards to review. Practice them now to keep them fresh.</p>
            <Link href={`/dashboard/deck/practice/${id}?weak=true`} role="button" className='btn btn-secondary mt-20 d-block d-sm-inline-block'>Review Now</Link>
          </section>
        )}
      </section>
      

      <section>
        <UnderlineContainer className='mt-50 mb-30'>
          <div className="d-flex align-items-center justify-content-between">
            <h2 className='fw-medium fs-3'>All Cards ({deck.cards.length})</h2>
            <ButtonWithIcon isLinkButton={true} className="btn btn-primary d-none d-xs_sm-block" href={`/dashboard/deck/edit/${id}`} iconSrc='/icons/add_3.svg' iconHeight={16} altTag='' iconFillColor="white">Add Cards</ButtonWithIcon>
            <IconButton className={'btn btn-primary d-block d-xs_sm-none'} isLinkButton={true} href={`/dashboard/deck/edit/${id}`} iconFillColor="white" iconSrc='/icons/add.svg' altTag='Add cards icon' size='md' />
          </div>
        </UnderlineContainer>

        <ul style={{marginBottom: 0, paddingLeft: 0}}>
          {
            deck.cards.map((card, index) => {
              const key = index + 1;

              const weak = (new Date(card.next_practice_date)).getTime() <= (new Date()).getTime()

              return (
                <CardListItem 
                  key={key} 
                  number={key} 
                  cardInfo={{...card, weak}}
                  className="mb-20 mb-sm-15 mb-md-10"
                />
              )
            })
          }

          {deck.cards.length === 0 && (
            <p className='text-center'>No cards found in this deck. <br /> Add cards using the button above.</p>
          )}

        </ul>
      </section>     

    </>
  )
}

export default DeckPage