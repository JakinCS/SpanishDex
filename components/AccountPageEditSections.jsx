'use client'

import { useState } from "react"
import { EditEmailButton, EditUsernameButton } from "./AccountPageButtons"

export const UsernameEditSection = (props) => {
  const [usernameValue, setUsernameValue] = useState(props.initialValue || '')

  return (
    <>
      <div>
        <p className="fw-medium mb-3">Username</p>
        <p>{usernameValue}</p>
      </div>
      <div>
        <EditUsernameButton initialValue={usernameValue} setUsername={setUsernameValue} userId={props.userId}/>
      </div>
    </>
  )
}

export const EmailEditSection = (props) => {
  const [emailValue, setEmailValue] = useState(props.initialValue || '')

  return (
    <>
      <div>
        <p className="fw-medium mb-3">Email</p>
        <p>{emailValue === '' ? <span className="fst-italic">No email provided yet</span> : emailValue}</p>
      </div>
      <div>
        <EditEmailButton initialValue={emailValue} setEmail={setEmailValue} userId={props.userId}/>
      </div>
    </>
  )
}

