import React from 'react'

const SummaryResultCircle = ({ number, score, ...otherProps }) => {

  let color = '';
  let text = '';

  switch (score) {
    case 5:
      color = 'success';
      text = 'Easy';
      break;
    case 4:
      color = 'yellow-green';
      text = 'Good';
      break;
    case 3:
      color = 'green-yellow';
      text = 'Normal';
      break;
    case 2:
      color = 'warning';
      text = 'Difficult';
      break;
    case 1:
      color = 'danger';
      text = 'Hard';
      break;
    default:
      color = 'gray-150';
      text = 'no score'
      break;
  }

  return (
    <div className=''>
      <p className={`fw-semibold fs-3 lh-1 mb-10 text-center text-${color}`}>{text}</p>
      <div className={`d-flex align-items-center justify-content-center rounded-circle border border-5 border-${color}`} style={{width: '6.25rem', height: '6.25rem'}}>
        <span className='fw-medium' style={{fontSize: '2.25rem'}}>{number}</span>
      </div>
    </div>
  )
}

export default SummaryResultCircle