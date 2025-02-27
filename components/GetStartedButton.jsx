'use client'

import Button from 'react-bootstrap/Button'

const GetStartedButton = () => {
  const activateOtherButton = () => {
    const otherButton = document.getElementById('createAccountButton') || document.getElementById('dashboardButton');
    otherButton.click();
  }

  return (
    <Button variant='secondary' onClick={activateOtherButton}>Get Started</Button>
  )
}

export default GetStartedButton