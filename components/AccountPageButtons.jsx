'use client'

import ButtonWithIcon from "./ButtonWithIcon"
import IconButton from "./IconButton"
import Button from 'react-bootstrap/Button'
import EditUsernameModal from "./modals/EditUsernameModal"
import { useState } from "react"
import EditProfilePictureModal from "./modals/EditProfilePictureModal"
import EditEmailModal from "./modals/EditEmailModal"
import EditPasswordModal from "./modals/EditPasswordModal"
import DeleteAccountModal from "./modals/DeleteAccountModal"

export const EditProfilePictureButton = (props) => {
  const [show, setShow] = useState(false);
  const showModal = () => setShow(true);
  const closeModal = () => setShow(false);

  return (
    <>
      <ButtonWithIcon variant='gray' iconSrc='/icons/edit.svg' altTag='Edit icon' onClick={showModal}>Edit</ButtonWithIcon>
      <EditProfilePictureModal show={show} closeModal={closeModal} {...props}/>
    </>
  )
}

export const EditUsernameButton = (props) => {
  const [show, setShow] = useState(false);
  const showModal = () => setShow(true);
  const closeModal = () => setShow(false);

  return (
    <>
      <IconButton variant='light' size={2} iconSrc={'/icons/edit.svg'} altTag={'edit icon'} onClick={showModal}/>
      <EditUsernameModal show={show} closeModal={closeModal} {...props} />
    </>
  )
}

export const EditEmailButton = (props) => {
  const [show, setShow] = useState(false);
  const showModal = () => setShow(true);
  const closeModal = () => setShow(false);

  return (
    <>
      <IconButton variant='light' size={2} iconSrc={'/icons/edit.svg'} altTag={'edit icon'} onClick={showModal}/>
      <EditEmailModal show={show} closeModal={closeModal} {...props}/>
    </>
  )
}

export const EditPasswordButton = (props) => {
  const [show, setShow] = useState(false);
  const showModal = () => setShow(true);
  const closeModal = () => setShow(false);

  return (
    <>
      <IconButton variant='light' size={2} iconSrc={'/icons/edit.svg'} altTag={'edit icon'} onClick={showModal}/>
      <EditPasswordModal show={show} closeModal={closeModal} {...props}/>
    </>
  )
}

export const DeleteAccountButton = () => {
  const [show, setShow] = useState(false);
  const showModal = () => setShow(true);
  const closeModal = () => setShow(false);

  return (
    <>
      <Button variant='outline-danger' onClick={showModal}>Delete Account</Button>
      <DeleteAccountModal show={show} closeModal={closeModal} />
    </>
  )
}