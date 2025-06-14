import React from 'react'

const UnderlineContainer = ({children, ...props}) => {
  return (
    <div {...props} className={"py-15 border-bottom border-gray-150 border-2" + (props.className ? ` ${props.className}` : '')}>
      { children }
    </div>
  )
}

export default UnderlineContainer