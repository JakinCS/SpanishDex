import Image from 'next/image'
import React from 'react'

const Icon = ({height, alt, src, ...otherProps}) => {
  return (
    <Image 
      {...otherProps}
      className={otherProps.className ? "icon " + otherProps.className : "icon"}
      height={height} 
      width={height} 
      style={{...otherProps.style, width: `${height / 16}rem`, height: `${height / 16}rem`}} 
      alt={alt} 
      src={src} 
    />
  )
}

export default Icon