import React from 'react'
import IconButton from './IconButton'
import StatusIndicator from './viewdeck/StatusIndicator'

const CardListItem = ({number, cardInfo, ...otherProps}) => {
  const borderStyle = cardInfo.weak ? ' border-warning' : ' border-gray-150'

  return (
    <div {...otherProps} className={'d-flex align-items-center' + (otherProps.className ? ` ${otherProps.className}` : '')} style={{...otherProps.style, height: '2.8125rem', cursor: 'default'}}>
      <div className='d-flex justify-content-start align-items-center' style={{height: '2.5rem', width: '2.5rem'}}>
        <p>{number}.</p>
      </div>
      <div className={'d-flex bg-white rounded border border-1point5 w-100 h-100' + borderStyle} style={{overflow: 'hidden'}}>
        <div className='d-flex align-items-center border-end border-1point5 border-gray-150' style={{width: '50%'}}>
          <p className='ms-20'>{cardInfo.english}</p>
        </div>
        <div className='d-flex align-items-center' style={{width: '50%'}}>
          <p className='ms-20'>{cardInfo.spanish}</p>
        </div>
      </div>
      <IconButton className="mx-10" variant='light' size='sm' iconSrc='/icons/listen.svg' altTag='Listen icon'/>
      <StatusIndicator isWeak={cardInfo.weak}/>
    </div>
  )
}

export default CardListItem