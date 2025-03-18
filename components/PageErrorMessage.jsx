'use client'

import Button from 'react-bootstrap/Button'

const PageErrorMessage = ({error, children, ...otherProps}) => {
  return (
    <div {...otherProps} className={'text-center ' + (otherProps.className ? otherProps.className : '')}>
      <h1 className='mb-4'>Error</h1>
      <p className='mb-20'>{children}</p>
      <p className='visually-hidden'>{error.toString()}</p>
      <Button variant='primary' onClick={() => {location.reload()}}>Reload Page</Button>
    </div>
  )
}

export default PageErrorMessage