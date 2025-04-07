'use client'

import Link from 'next/link'
import Button from 'react-bootstrap/Button'

const PageErrorMessage = ({error, buttonType, children, ...otherProps}) => {
  return (
    <div {...otherProps} className={'text-center ' + (otherProps.className ? otherProps.className : '')}>
      <h1 className='mb-4'>Error</h1>
      <p className='mb-20'>{children}</p>
      <p className='visually-hidden'>{error.toString()}</p>
      { buttonType === 'home' ? (
        <Link href='/' role='button' className='btn btn-primary'>Return Home</Link>
      ) : buttonType === 'dashboard' ? (
        <Link href='/dashboard' role='button' className='btn btn-primary'>Go to Dashboard</Link>
      ) : (
        <Button variant='primary' onClick={() => {location.reload()}}>Reload Page</Button>
      )}
    </div>
  )
}

export default PageErrorMessage