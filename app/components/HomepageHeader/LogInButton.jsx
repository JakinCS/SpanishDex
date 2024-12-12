'use client'

import Button from 'react-bootstrap/Button'

function LogInButton(props) {
    return (
      <>
        <Button className="ms-auto" variant="primary" onClick={props.openModal}>
          Log In
        </Button>
      </>
    );
}

export default LogInButton;