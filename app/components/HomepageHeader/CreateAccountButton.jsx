'use client'

import Button from 'react-bootstrap/Button'

function CreateAccountButton(props) {
    return (
      <>
        <Button className="ms-auto" variant="outline-primary" onClick={props.openModal}>
          Create Account
        </Button>        
      </>
    );
}

export default CreateAccountButton;