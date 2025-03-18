import Image from 'next/image';
import Link from 'next/link';

const DashboardDeck = ({deckData, ...props}) => {

  // This function takes a date string and returns a formatted date string.
  // The desired outlooks like: '2 Minutes ago', '1 Day Ago', '10 Months Ago', etc
  const getDateString = (date) => {
    if (date == null) return 'not yet practiced'

    const datePast = new Date(date); // New date object based on the date parameter
    const dateToday = new Date();
    const result = dateToday.getTime() - datePast.getTime(); // Difference in time in milliseconds.

    if (result / 60000 < 2) return 'Just Now'; // Return this string when time is less than 2 minutes
    if (Math.floor(result / 60000) < 60) return `${Math.floor(result / 60000)} Minutes Ago`; // Whenever it is less than 60 minutes
    if (Math.floor(result / 3600000) < 24) { // Whenever it is less than 24 hours
      const calculation = Math.floor(result / 3600000)
      return calculation === 1 ? '1 Hour Ago' : `${calculation} Hours Ago`;
    }
    if (Math.floor(result / (3600000 * 24)) < 30) { // Whenever it is less than 30 days
      const calculation = Math.floor(result / (3600000 * 24));
      return calculation === 1 ? '1 Day Ago' : `${calculation} Days Ago`;
    }
    if (Math.floor(result / (3600000 * 24)) < 366) { // Whenever it is less than 366 days
      const calculation = datePast.getMonth() < dateToday.getMonth() ? dateToday.getMonth() - datePast.getMonth() : 12 - (datePast.getMonth() - dateToday.getMonth())
      return calculation > 11 ? '1 Year Ago' : calculation === 1 ? '1 Month Ago' : `${calculation} Months Ago`;
    }
    const yearsAgo = dateToday.getFullYear() - datePast.getFullYear(); // The last resort is to display the time in years
    return yearsAgo === 1 ? '1 Year Ago' : `${yearsAgo} Years Ago`
  }

  

  return (
    <div {...props}>
      <Link href="#" className='d-block bg-white px-20 py-25 px-xs_sm-30 py-xs_sm-30 dashboard-deck-card rounded mb-15'>
        <h4 className='fw-medium lh-1 mb-40'>{deckData.title}</h4>
        <div className='d-flex gap-25'>
          <span className="d-flex align-items-center gap-2 fs-6 fw-medium">
            <Image className="icon" height={20} width={20} alt={'Flashcard icon'} src={'/icons/cards300.svg'}/>
            <p><span>{deckData.cards}</span> Total Cards</p>
          </span>
          <span className="d-flex align-items-center gap-2 fs-6 fw-medium">
            <Image className="icon" height={20} width={20} alt={'Flashcard icon'} src={'/icons/cards300.svg'}/>
            <p><span>{deckData.weak_cards}</span> Weak Cards</p>
          </span>
        </div>
      </Link>

      <p className='fw-medium fs-6 lh-1'>
        {deckData.display_creation_date ? 
          <>Date Created: <span className='fw-semibold'>{getDateString(deckData.date_created)}</span></>
          : 
          <>Last Practiced: <span className='fw-semibold'>{getDateString(deckData.last_practiced)}</span></> 
        }
      </p>
    </div>
  )
}

export default DashboardDeck