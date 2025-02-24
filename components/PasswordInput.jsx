"use client"

import { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Form from "react-bootstrap/Form"
import IconButton from './IconButton'

const PasswordInput = (props) => {
  // State for the visibility of the password value
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  }

  return (
    <Container className="d-flex gap-3 p-0">
      <div className="w-100">
        <Form.Control {...props} type={showPassword ? 'text' : 'password'}/>
      </div>
      <div className="d-flex align-items-center">
        <IconButton variant='light' size={'1'} iconSrc={showPassword ? '/icons/hide.svg' : '/icons/show.svg'} altTag={showPassword ? 'hide icon' : 'show icon'} onClick={togglePasswordVisibility}/>           
      </div>
    </Container>
  )
}

export default PasswordInput