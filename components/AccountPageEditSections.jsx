'use client'

import { useState } from "react"
import { EditEmailButton, EditProfilePictureButton, EditUsernameButton } from "./AccountPageButtons"
import ProfileCircle from "./ProfileCircle"


export const ProfilePictureEditSection = (props) => {
  const [profilePicture, setProfilePicture] = useState(props.pictureInfo.profilePicture)

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h3 className="mb-30">Profile Picture</h3>
          <EditProfilePictureButton pictureInfo={props.pictureInfo} pictureState={profilePicture} setProfilePicture={setProfilePicture} userId={props.userId} />
        </div>
        <ProfileCircle
          height={120}
          profilePicture={profilePicture}
          profileColors={props.pictureInfo.profileColors}
          firstLetter={props.pictureInfo.firstLetter}
        />
      </div>
    </>
  )
}

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

