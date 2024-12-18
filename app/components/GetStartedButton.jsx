'use client'

import Button from 'react-bootstrap/Button'

const GetStartedButton = () => {
  const activateCreateAccountButton = () => {
    const createAccountButton = document.getElementById('createAccountButton')
    createAccountButton.click();
  }

  return (
    <Button variant='secondary' onClick={activateCreateAccountButton}>Get Started</Button>
  )
}

export default GetStartedButton