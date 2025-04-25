import React from 'react'
import IconButton from '../IconButton';

const MoreMenuToggler = ({ onClick }, ref) => {
  return (
    <IconButton ref={ref} onClick={ (e) => {e.preventDefault(); onClick(e)} } className={'moreButtonToggler'} variant='light' size="sm" iconSrc={'/icons/more.svg'} altTag={'more icon'}/>
  )
}

export default MoreMenuToggler