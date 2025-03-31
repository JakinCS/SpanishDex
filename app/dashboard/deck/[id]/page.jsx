import BackButton from '@/components/BackButton'
import ButtonWithIcon from '@/components/ButtonWithIcon'
import CardListItem from '@/components/CardListItem'
import DashboardCard from '@/components/dashboard/DashboardCard'
import Icon from '@/components/Icon'
import IconButton from '@/components/IconButton'
import UnderlineContainer from '@/components/UnderlineContainer'
import MoreButton from '@/components/viewdeck/MoreButton'
import Link from 'next/link'
import Button from 'react-bootstrap/Button'


const DeckPage = () => {

  const sampleCardInfo = [
    {
      english: 'To Eat',
      spanish: 'Comer',
      weak: false,
    },
    {
      english: 'To Run',
      spanish: 'Correr',
      weak: false,
    },
    {
      english: 'To Do',
      spanish: 'Hacer',
      weak: true,
    },
    {
      english: 'To Choose',
      spanish: 'Elegir',
      weak: false,
    },
    {
      english: 'To Die',
      spanish: 'Morir',
      weak: false,
    },
    {
      english: 'To Say',
      spanish: 'Decir',
      weak: false,
    },
    {
      english: 'To Walk',
      spanish: 'Caminar',
      weak: false,
    },
    {
      english: 'To Think',
      spanish: 'Pensar',
      weak: true,
    },
    {
      english: 'To Believe',
      spanish: 'Creer',
      weak: true,
    },
    {
      english: 'To Have',
      spanish: 'Tener',
      weak: false,
    },
  ]
  return (
    <>
      <div className='d-flex justify-content-between align-items-center mb-40'>
        <BackButton />
        <div className='d-flex'>
          <ButtonWithIcon isLinkButton={true} className="btn btn-gray me-10" href="#" iconSrc='/icons/edit.svg' iconHeight={24} altTag='Edit icon'>Edit Deck</ButtonWithIcon>
          <MoreButton /> 
        </div>
      </div>
      <h1 className='mb-25'>Common Verbs</h1>
      <p>This is a deck of common Spanish verbs</p>
      <DashboardCard xPadding={30} yPadding={35} className="mt-50" style={{maxWidth: '31.25rem'}}>
        <h3 className="fw-medium heading-underline-blue-100 lh-1 mb-40">Deck Info</h3>
        <div className='d-flex gap-30'>
          <span className="d-flex align-items-center gap-3 mx-2 mx-sm-0 fw-medium">
            <Icon height={24} alt={'Card icon'} src={'/icons/cards300.svg'}/>
            <p><span>18</span> Total Cards</p>
          </span>
          <span className="d-flex align-items-center gap-3 mx-2 mx-sm-0 fw-medium">
            <Icon height={24} alt={'Card icon'} src={'/icons/cards300.svg'}/>
            <p><span>3</span> Weak Cards</p>
          </span>
        </div>
        <hr className='my-20'/>
        <span className="d-flex align-items-center gap-2 mx-2 mx-sm-0">
          <Icon height={24} alt={'Date icon'} src={'/icons/calendar.svg'}/>
          <p><span className='me-3 fw-medium'>Created:</span> {'June 14, 2024'}</p>
        </span>
        <hr className='my-20'/>
        <span className="d-flex align-items-center gap-2 mx-2 mx-sm-0">
          <Icon height={24} alt={'Clock icon'} src={'/icons/clock.svg'}/>
          <p><span className='me-3 fw-medium'>Last Practiced:</span> {'September 23, 2024'}</p>
        </span>
      </DashboardCard>
      <div className='mt-50 mb-60'>
        <Link href="#" role="button" className='btn btn-primary me-30'>Review All Cards</Link>
        <Link href="#" role="button" className='btn btn-secondary'>Review Weak Cards</Link>
      </div>

      <UnderlineContainer className='mb-30'>
        <div className="d-flex align-items-center justify-content-between">
          <h3 className='fw-medium'>All Cards (18)</h3>
          <ButtonWithIcon isLinkButton={true} className="btn btn-primary" href="#" iconSrc='/icons/add_3.svg' iconHeight={16} altTag='Add icon' iconFillColor="white">Add Cards</ButtonWithIcon>
        </div>
      </UnderlineContainer>

      <div className='mb-30'>
        {
          sampleCardInfo.map((card, index) => {
            const key = index + 1;
            return (
              <CardListItem 
                key={key} 
                number={key} 
                cardInfo={card}
                className="mb-10"
              />
            )
          })
        }

      </div>
    </>
  )
}

export default DeckPage