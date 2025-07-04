import React from 'react'
import StatusIndicator from './StatusIndicator'

const CardListItem = ({number, cardInfo, ...otherProps}) => {
  const borderStyle = cardInfo.weak ? ' border-warning' : ' border-gray-150'

  return (
    <>
      <li {...otherProps} className={'d-none d-md-flex align-items-center' + (otherProps.className ? ` ${otherProps.className}` : '')} style={{...otherProps.style, minHeight: '2.8125rem', cursor: 'default'}}>
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
        {/* <IconButton className="ms-10" variant='light' size='sm' iconSrc='/icons/listen.svg' altTag='Listen to pronunciation icon'/> Possible future feature */}
        <StatusIndicator className='ms-20' next_practice_date={cardInfo.next_practice_date} isWeak={cardInfo.weak} style={{minWidth: '5rem'}}/>
      </li>
      <li {...otherProps} className={'d-flex d-md-none flex-column align-items-center' + (otherProps.className ? ` ${otherProps.className}` : '')} style={{...otherProps.style, minHeight: '2.8125rem', cursor: 'default'}}>
        <div className='d-flex align-items-center justify-content-between w-100'>
          <p className='ps-2'>{number}.</p>      
          <div className='d-flex align-items-center'>
            <StatusIndicator className='py-2' next_practice_date={cardInfo.next_practice_date} isWeak={cardInfo.weak} />
            {/* <IconButton className="ms-10" variant='light' size='sm' iconSrc='/icons/listen.svg' altTag='Listen to pronuncation icon'/> */} {/* Possible future feature */}
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
      </li>
    </>
  )
}

export default CardListItem