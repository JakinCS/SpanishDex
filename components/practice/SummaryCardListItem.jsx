import React from 'react'

const SummaryCardListItem = ({ cardInfo, number, score, ...otherProps }) => {

  let borderStyle = '';
  let scoreIndicatorColor = '';
  switch (score) {
    case 1:
      borderStyle = ' border-danger';
      scoreIndicatorColor = 'red-300';
      break;
    case 2:
      borderStyle = ' border-warning';
      scoreIndicatorColor = 'yellow-300';
      break;
    case 3:
      borderStyle = ' border-green-yellow';
      scoreIndicatorColor = 'green-yellow-300';
      break;
    case 4:
      borderStyle = ' border-yellow-green';
      scoreIndicatorColor = 'yellow-green-300';
      break;
    case 5:
      borderStyle = ' border-success';
      scoreIndicatorColor = 'green-300';
      break;
    default:
      borderStyle = ' border-gray-150';
      scoreIndicatorColor = 'gray-150';
  }

  // const borderStyle = ' border-warning';

  return (
    <>
      <div {...otherProps} className={'d-none d-md-flex align-items-center' + (otherProps.className ? ` ${otherProps.className}` : '')} style={{...otherProps.style, minHeight: '2.8125rem', cursor: 'default'}}>
        <div className='d-flex justify-content-start align-items-center' style={{height: '2.5rem', width: '2.5rem'}}>
          <p>{number}.</p>
        </div>
        <div className={'d-flex bg-white rounded border border-1point5 w-100 h-100' + borderStyle} style={{minHeight: '2.5rem', overflow: 'hidden'}}>
          <div className='d-flex align-items-center border-end border-1point5 border-gray-150' style={{width: '50%'}}>
            <p className='mx-20 py-3 text-break lh-sm'>{cardInfo.spanish}</p>
          </div>
          <div className='d-flex align-items-center' style={{width: '50%'}}>
            <p className='mx-20 py-3 text-break lh-sm'>{cardInfo.english}</p>
          </div>
        </div>
        <div className={'d-flex align-items-center justify-content-center rounded ms-15' + ` bg-${scoreIndicatorColor}`} style={{minHeight: '2.1875rem', minWidth: '2.1875rem'}}>
          <span className='fw-semibold lh-1'>{score}</span>
        </div>
      </div>
      <div {...otherProps} className={'d-flex d-md-none flex-column align-items-center' + (otherProps.className ? ` ${otherProps.className}` : '')} style={{...otherProps.style, minHeight: '2.8125rem', cursor: 'default'}}>
        <div className='d-flex align-items-center justify-content-between w-100'>
          <p className='ps-2'>{number}.</p>      
          <div className='d-flex align-items-center'>        
            <div className={'d-flex align-items-center justify-content-center rounded my-2' + ` bg-${scoreIndicatorColor}`} style={{minHeight: '1.875rem', minWidth: '1.875rem'}}>
              <span className='fw-semibold lh-1'>{score}</span>
            </div>    
          </div>
        </div>
        <div className={'d-flex flex-column flex-sm-row bg-white rounded border border-1point5 w-100' + borderStyle}>
          <div className='d-none d-sm-flex align-items-center border-end border-1point5 border-gray-150 w-100 w-sm-50'>
            <p className='mx-20 py-3 text-break lh-sm'>{cardInfo.spanish}</p>
          </div>
          <div className='d-flex d-sm-none align-items-center border-bottom border-1point5 border-gray-150 w-100 w-sm-50'>
            <p className='mx-20 py-3 text-break lh-sm'>{cardInfo.spanish}</p>
          </div>
          <div className='d-flex align-items-center w-100 w-sm-50'>
            <p className='mx-20 py-3 text-break lh-sm'>{cardInfo.english}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default SummaryCardListItem