"use client"

import Icon from "./Icon";

const CloseButton = ({onClick, ...props}) => {
  return (
    <div {...props} className={"d-flex align-items-center" + (props.className ? ` ${props.className}` : '')} style={{...props.style, height: '2.5rem'}}>
      <a href='#' onClick={onClick} className="back-button d-flex align-items-center pe-10 ps-10"  style={{marginLeft: '-0.625rem'}}>
        <Icon height={24} alt="" src={'/icons/close.svg'} className='me-2'/>
        <span>Close</span>
      </a>
    </div>
  )
}

export default CloseButton