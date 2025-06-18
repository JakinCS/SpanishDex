'use client'

import Button from 'react-bootstrap/Button'

const GetStartedButton = () => {
  const activateOtherButton = () => {
    const otherButton = document.getElementById('createAccountButton') || document.getElementById('dashboardButton');
    if (otherButton != null) otherButton.click();
  }

  return (
    <Button variant='secondary' onClick={activateOtherButton}>Start Now For Free</Button>
  )
}

export default GetStartedButton