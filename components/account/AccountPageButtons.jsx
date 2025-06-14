'use client'

import ButtonWithIcon from "@/components/utils/ButtonWithIcon";
import IconButton from '@/components/utils/IconButton';
import Button from 'react-bootstrap/Button'
import EditUsernameModal from "../modals/EditUsernameModal"
import { useState } from "react"
import EditProfilePictureModal from "../modals/EditProfilePictureModal"
import EditEmailModal from "../modals/EditEmailModal"
import EditPasswordModal from "../modals/EditPasswordModal"
import DeleteAccountModal from "../modals/DeleteAccountModal"
import ResetPasswordModal from "../modals/ResetPasswordModal"

export const EditProfilePictureButton = (props) => {
  const [show, setShow] = useState(false);
  const showModal = () => setShow(true);
  const closeModal = () => setShow(false);

  return (
    <>
      <ButtonWithIcon variant='gray' iconSrc='/icons/edit.svg' iconHeight={24} altTag='' onClick={showModal}>Edit</ButtonWithIcon>
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
      <IconButton variant='light' size='sm' iconSrc={'/icons/edit.svg'} altTag="Edit username icon" onClick={showModal}/>
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
      <IconButton variant='light' size='sm' iconSrc={'/icons/edit.svg'} altTag="Edit email icon" onClick={showModal}/>
      <EditEmailModal show={show} closeModal={closeModal} {...props}/>
    </>
  )
}

export const EditPasswordButton = (props) => {
  const [show, setShow] = useState(false);
  const showModal = () => setShow(true);
  const closeModal = () => setShow(false);

  // Reset Password Modal State
  const [resetPasswordModalOpenState, setResetPasswordModalOpenState] = useState(false);
  const openResetPasswordModal = () => setResetPasswordModalOpenState(true)
  const closeResetPasswordModal = () => setResetPasswordModalOpenState(false)

  return (
    <>
      <IconButton variant='light' size='sm' iconSrc={'/icons/edit.svg'} altTag="Edit password icon" onClick={showModal}/>
      <EditPasswordModal show={show} closeModal={closeModal} openResetPasswordModal={openResetPasswordModal} {...props}/>

      <ResetPasswordModal forAccountPage={true} size='md' handleClose={closeResetPasswordModal} show={resetPasswordModalOpenState} openPreviousModal={showModal}/>
    </>
  )
}

export const DeleteAccountButton = (props) => {
  const [show, setShow] = useState(false);
  const showModal = () => setShow(true);
  const closeModal = () => setShow(false);

  return (
    <>
      <Button className="d-none d-sm-block" variant='outline-danger' onClick={showModal}>Delete Account</Button>
      <Button className="d-block d-sm-none w-100" variant='outline-danger' onClick={showModal}>Delete Account</Button>
      <DeleteAccountModal show={show} closeModal={closeModal} {...props}/>
    </>
  )
}