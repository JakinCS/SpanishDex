import BackButton from '@/components/BackButton'
import ButtonWithIcon from '@/components/ButtonWithIcon'
import CardListItem from '@/components/viewdeck/CardListItem'
import DashboardCard from '@/components/dashboard/DashboardCard'
import Icon from '@/components/Icon'
import IconButton from '@/components/IconButton'
import UnderlineContainer from '@/components/UnderlineContainer'
import MoreButton from '@/components/viewdeck/MoreButton'
import Link from 'next/link'
import PageErrorMessage from '@/components/PageErrorMessage'
import { notFound } from 'next/navigation'
import BackToTopButton from '@/components/BackToTopButton'
import { getDeck } from '@/lib/actions'


const DeckPage = async ({ params }) => {

  const { id } = await params

  // Ensure the id is a valid ObjectId format before proceeding
  if ( !(/^[0-9a-fA-F]+$/.test(id)) || id.length !== 24) {
    notFound() // Trigger the 404 page in Next.js if the id is invalid
  }

  let errorInfo = {isError: false, message: '', hiddenMsg: ''};
  let deck = undefined;

  try {
    const retrievalResult = await getDeck(id)

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
        <BackButton />
        <div className='d-flex'>
          <ButtonWithIcon isLinkButton={true} className="btn btn-gray d-none d-xs_sm-block me-10" href={`/dashboard/deck/edit/${id}`} iconSrc='/icons/edit.svg' iconHeight={24} altTag='Edit icon'>Edit Deck</ButtonWithIcon>
          <IconButton className={'btn btn-gray d-block d-xs_sm-none me-10'} isLinkButton={true} href={`/dashboard/deck/edit/${id}`} iconSrc='/icons/edit.svg' altTag='Edit icon' size='sm' />
          <MoreButton deck={{id: deck._id.toString(), title: deck.title}}/> 
        </div>
      </div>
      <h1 className='mb-25'>{deck.title}</h1>
      <p>{deck.description != '' ? deck.description : <span className='fst-italic'>No description for this deck</span>}</p>
      <DashboardCard xPadding={30} yPadding={35} className="my-50" style={{maxWidth: '31.25rem'}}>
        <h3 className="fw-medium text-center text-xs_sm-start heading-underline-blue-100 lh-1 mb-40">Deck Information</h3>
        <div className='d-flex flex-column flex-xs_sm-row gap-15 gap-xs_sm-30'>
          <span className="d-flex align-items-center justify-content-center gap-3 mx-2 mx-sm-0 fw-medium">
            <Icon height={24} alt={'Card icon'} src={'/icons/cards300.svg'}/>
            <p><span>{deck.cards.length}</span> Total Cards</p>
          </span>
          <span className="d-flex align-items-center justify-content-center gap-3 mx-2 mx-sm-0 fw-medium">
            <Icon height={24} alt={'Card icon'} src={'/icons/cards300.svg'}/>
            <p><span>{deck.weak_cards}</span> Weak Cards</p>
          </span>
        </div>
        <hr className='my-20'/>
        <span className="d-flex flex-wrap justify-content-center justify-content-xs_sm-start gap-2 mx-2 mx-sm-0">
          <p className='d-flex align-items-center'><Icon height={24} alt={'Date icon'} src={'/icons/calendar.svg'}/><span className='ms-2 me-3 fw-medium'>Created:</span></p>
          <p>{formattedDateCreated}</p>
        </span>
        <hr className='my-20'/>
        <span className="d-flex flex-wrap justify-content-center justify-content-xs_sm-start gap-2 mx-2 mx-sm-0">
          <p className='d-flex align-items-center'><Icon height={24} alt={'Clock icon'} src={'/icons/clock.svg'}/><span className='ms-2 me-3 fw-medium'>Last Practiced:</span></p>
          <p>{formattedLastPracticed}</p>
        </span>
      </DashboardCard>

      {deck.cards.length > 0 && (
        <>
          <UnderlineContainer className='d-block d-sm-none mb-30'>
          <div className="d-flex align-items-center justify-content-between">
            <h3 className='fw-medium'>Review Cards</h3>
          </div>
          </UnderlineContainer>
          <div className='mb-60 d-flex justify-content-center justify-content-xs_sm-start d-sm-none flex-wrap gap-20'>
            <Link href={`/dashboard/deck/practice/${id}`} role="button" className='btn btn-primary w-100'>All Cards</Link>
            <Link href={`/dashboard/deck/practice/${id}?weak=true`} role="button" className='btn btn-secondary w-100'>Weak Cards</Link>
          </div>
          <div className='mb-60 d-none d-sm-flex flex-wrap gap-20'>
            <Link href={`/dashboard/deck/practice/${id}`} role="button" className='btn btn-primary'>Review All Cards</Link>
            <Link href={`/dashboard/deck/practice/${id}?weak=true`} role="button" className='btn btn-secondary'>Review Weak Cards</Link>
          </div>
        </>
      )}      

      <UnderlineContainer className='mb-30'>
        <div className="d-flex align-items-center justify-content-between">
          <h3 className='fw-medium'>All Cards ({deck.cards.length})</h3>
          <ButtonWithIcon isLinkButton={true} className="btn btn-primary d-none d-xs_sm-block" href={`/dashboard/deck/edit/${id}`} iconSrc='/icons/add_3.svg' iconHeight={16} altTag='Add icon' iconFillColor="white">Add Cards</ButtonWithIcon>
          <IconButton className={'btn btn-primary d-block d-xs_sm-none'} isLinkButton={true} href={`/dashboard/deck/edit/${id}`} iconFillColor="white" iconSrc='/icons/add.svg' altTag='Add icon' size='md' />
        </div>
      </UnderlineContainer>

      <div>
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

      </div>

      <BackToTopButton />

    </>
  )
}

export default DeckPage