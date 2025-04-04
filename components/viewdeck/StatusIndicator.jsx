'use client'

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

// This function takes a date string and returns a formatted date string.
// The desired outlooks like: '2 Minutes', '1 Day', '10 Months', etc
const getDateString = (date) => {
  if (date == null) return '0 Days'

  const dateFuture = new Date(date); // New date object based on the date parameter
  const dateToday = new Date();
  const result = dateFuture.getTime() - dateToday.getTime(); // Difference in time in milliseconds.

  if (Math.ceil(result / 60000) < 60) { // Whenever it is less than 60 minutes
    const calculation = Math.floor(result / 60000)
    return calculation === 1 ? '1 Minute' : `${calculation} Minutes`;
  }
  if (Math.floor(result / 3600000) < 24) { // Whenever it is less than 24 hours
    const calculation = Math.floor(result / 3600000)
    return calculation === 1 ? '1 Hour' : `${calculation} Hours`;
  }
  if (Math.floor(result / (3600000 * 24)) < 30) { // Whenever it is less than 30 days
    const calculation = Math.floor(result / (3600000 * 24));
    return calculation === 1 ? '1 Day' : `${calculation} Days`;
  }
  if (Math.floor(result / (3600000 * 24)) < 366) { // Whenever it is less than 366 days
    const calculation = datePast.getMonth() < dateToday.getMonth() ? dateToday.getMonth() - datePast.getMonth() : 12 - (datePast.getMonth() - dateToday.getMonth())
    return calculation > 11 ? '1 Year' : calculation === 1 ? '1 Month' : `${calculation} Months`;
  }
  const yearsAgo = dateToday.getFullYear() - datePast.getFullYear(); // The last resort is to display the time in years
  return yearsAgo === 1 ? '1 Year' : `${yearsAgo} Years`
}

const StatusIndicator = ({ isWeak, next_practice_date, ...otherProps }) => {
  const paragraphAttributes = {
    ...otherProps,
    className: `fw-semibold ${isWeak ? 'text-warning' : 'text-green'}`
  }

  // The date string for when to practice again is determined by the `next_practice_date` prop passed in.
  let practiceAgain = '0 Days'
  if (!isWeak) {
    const nextPratice = new Date(next_practice_date)
    practiceAgain = getDateString(nextPratice) // Get the formatted date string for next practice date
  }

  return (
    <>
      {isWeak ?
        <p 
          {...paragraphAttributes}
        >
          Weak
        </p>
        :
        <OverlayTrigger overlay={<Tooltip>Again in {practiceAgain}</Tooltip>} delay={{ show: 1000, hide: 400 }}>
          <p
            {...paragraphAttributes}
          >
            Practiced
          </p>
        </OverlayTrigger>
      }
    </>
  )
}

export default StatusIndicator