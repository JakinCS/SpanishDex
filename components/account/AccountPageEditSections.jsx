'use client'

import { useState } from "react"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { EditEmailButton, EditProfilePictureButton, EditUsernameButton } from "./AccountPageButtons"
import ProfileCircle from "../ProfileCircle"
import ButtonWithIcon from "../ButtonWithIcon";
import IconButton from "../IconButton";


export const ProfilePictureEditSection = ({isLoading, ...props}) => {
  const [profilePicture, setProfilePicture] = useState(props.pictureInfo?.profilePicture)

  return (
    <>
      <Container className="px-0" fluid>
        <Row className="gap-30 d-none d-xs_sm-flex">
          <Col className="d-flex align-items-center">
            <div>
              <h2 className="fs-3 mb-30">Profile Picture</h2>
              {!isLoading ? 
                <EditProfilePictureButton pictureInfo={props.pictureInfo} pictureState={profilePicture} setPictureState={setProfilePicture} userId={props.userId} />
              :
                <ButtonWithIcon variant='gray' iconSrc='/icons/edit.svg' iconHeight={24} altTag='' disabled={true}>Edit</ButtonWithIcon>
              }
            </div>
          </Col>
          <Col xs='auto' className="d-flex align-items-center">
            {!isLoading ? 
              <>
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
              </>
              :
              <div className='placeholder-glow'>
                <span className='placeholder bg-gray-150 rounded rounded-circle d-none d-sm-flex' style={{height: '7.5rem', width: '7.5rem' }}></span>
                <span className='placeholder bg-gray-150 rounded rounded-circle d-flex d-sm-none' style={{height: '6.25rem', width: '6.25rem' }}></span>
              </div>
            }            
          </Col>
        </Row>

        <Row className="gap-30 d-flex d-xs_sm-none">
          <Col className="d-flex justify-content-center" xs='12'><h2 className="fs-3">Profile Picture</h2></Col>
          <Col xs='12' className="d-flex justify-content-center">
            {!isLoading ?
              <ProfileCircle
                height={120}
                profilePicture={profilePicture}
                profileColors={props.pictureInfo.profileColors}
                firstLetter={props.pictureInfo.firstLetter}
              />
              :
              <div className='placeholder-glow'>
                <span className='placeholder bg-gray-150 rounded rounded-circle' style={{height: '7.5rem', width: '7.5rem' }}></span>
              </div>
            }            
          </Col>
          <Col>
            <div className="d-flex justify-content-center w-100">
              {!isLoading ? 
                <EditProfilePictureButton pictureInfo={props.pictureInfo} pictureState={profilePicture} setPictureState={setProfilePicture} userId={props.userId} />
              :
                <ButtonWithIcon variant='gray' iconSrc='/icons/edit.svg' iconHeight={24} altTag='' disabled={true}>Edit</ButtonWithIcon>
              }
            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export const UsernameEditSection = ({isLoading, ...props}) => {
  const [usernameValue, setUsernameValue] = useState(props.initialValue || '')

  return (
    <>
      <div className="me-2">
        <h3 className="fw-medium fs-4 mb-3">Username</h3>
        {!isLoading ? 
          <p className="text-break">{usernameValue}</p>
          :
          <div className='placeholder-glow'>
            <span className='placeholder bg-gray-150 rounded' style={{height: '1rem', width: '6.25rem' }}></span>
          </div>
        }
      </div>
      <div>
        {!isLoading ? 
          <EditUsernameButton initialValue={usernameValue} setUsername={setUsernameValue} userId={props.userId}/>
        :
          <IconButton variant='light' size='sm' iconSrc={'/icons/edit.svg'} altTag="" disabled={true}/>
        }
      </div>
    </>
  )
}

export const EmailEditSection = ({isLoading, ...props}) => {
  const [emailValue, setEmailValue] = useState(props.initialValue || '')

  return (
    <>
      <div className="me-2">
        <h3 className="fw-medium fs-4 mb-3">Email</h3>
        {!isLoading ? 
          <p className="text-break">{emailValue === '' ? <span className="fst-italic">No email provided yet</span> : emailValue}</p>
          :
          <div className='placeholder-glow'>
            <span className='placeholder bg-gray-150 rounded' style={{height: '1rem', width: '12.5rem' }}></span>
          </div>
        }
      </div>
      <div>
        {!isLoading ?
          <EditEmailButton initialValue={emailValue} setEmail={setEmailValue} userId={props.userId}/>
        :
          <IconButton variant='light' size='sm' iconSrc={'/icons/edit.svg'} altTag="" disabled={true}/>
        }
      </div>
    </>
  )
}

