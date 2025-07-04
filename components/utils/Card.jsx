import React from 'react'

const Card = ({ xPadding, yPadding, children, ...otherProps}) => {
  const styles = {
    ...otherProps.style,
    padding: `${(yPadding / 16)}rem ${(xPadding / 16)}rem`,
  }

  return (
    <section {...otherProps} style={styles} className={`bg-white rounded border border-1point5 border-gray-150 ${otherProps.className || ''}`}>
      {children}
    </section>
  )
}

export default Card