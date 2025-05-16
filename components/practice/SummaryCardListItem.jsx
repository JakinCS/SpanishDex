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

  return (
    <>
      <div {...otherProps} className={'d-flex flex-column flex-sm-row bg-white rounded border border-1point5 w-100' + borderStyle + (otherProps.className ? ` ${otherProps.className}` : '')} style={{...otherProps.style, minHeight: '2.8125rem', cursor: 'default'}}>
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
    </>
  )
}

export default SummaryCardListItem