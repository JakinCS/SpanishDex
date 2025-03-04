'use client'

import { useState } from "react"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { EditEmailButton, EditProfilePictureButton, EditUsernameButton } from "./AccountPageButtons"
import ProfileCircle from "./ProfileCircle"


export const ProfilePictureEditSection = (props) => {
  const [profilePicture, setProfilePicture] = useState(props.pictureInfo.profilePicture)

  return (
    <>
      <Container className="px-0" fluid>
        <Row className="profilePictureRow1 gap-30">
          <Col className="d-flex align-items-center">
            <div>
              <h3 className="mb-30">Profile Picture</h3>
              <EditProfilePictureButton pictureInfo={props.pictureInfo} pictureState={profilePicture} setPictureState={setProfilePicture} userId={props.userId} />
            </div>
          </Col>
          <Col xs='auto' className="d-flex align-items-center">
            <ProfileCircle
              className="d-none d-sm-flex"
              height={120}
              profilePicture={profilePicture}
              profileColors={props.pictureInfo.profileColors}
              firstLetter={props.pictureInfo.firstLetter}
            />
            <ProfileCircle
              className="d-flex d-sm-none"
              height={100}
              profilePicture={profilePicture}
              profileColors={props.pictureInfo.profileColors}
              firstLetter={props.pictureInfo.firstLetter}
            />
          </Col>
        </Row>

        <Row className="profilePictureRow2 gap-30">
          <Col className="d-flex justify-content-center" xs='12'><h3>Profile Picture</h3></Col>
          <Col xs='12' className="d-flex justify-content-center">
            <ProfileCircle
              height={120}
              profilePicture={profilePicture}
              profileColors={props.pictureInfo.profileColors}
              firstLetter={props.pictureInfo.firstLetter}
            />
          </Col>
          <Col>
            <div className="d-flex justify-content-center w-100">
              <EditProfilePictureButton pictureInfo={props.pictureInfo} pictureState={profilePicture} setPictureState={setProfilePicture} userId={props.userId} />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export const UsernameEditSection = (props) => {
  const [usernameValue, setUsernameValue] = useState(props.initialValue || '')

  return (
    <>
      <div className="me-2">
        <p className="fw-medium mb-3">Username</p>
        <p className="text-break">{usernameValue}</p>
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
      <div className="me-2">
        <p className="fw-medium mb-3">Email</p>
        <p className="text-break">{emailValue === '' ? <span className="fst-italic">No email provided yet</span> : emailValue}</p>
      </div>
      <div>
        <EditEmailButton initialValue={emailValue} setEmail={setEmailValue} userId={props.userId}/>
      </div>
    </>
  )
}

