import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { useActionState, useEffect, useRef, useState } from 'react';
import ProfileCircle from '../ProfileCircle';
import ButtonWithIcon from '../ButtonWithIcon';
import Image from 'next/image';
// import ReactCrop from 'react-image-crop';
import ProfilePictureInput from '../ProfilePictureInput';

const EditProfilePictureModal = (props) => {

  // References the input field for the file upload
  const fileInput = useRef(null)

  // State for storing the values of the form
  const [picture, setPicture] = useState({value: props.pictureState, valid: null, message: ''})

  const [profilePicture, setProfilePicture] = useState(null)

  // Function for resetting the state of the form (useful when triggered on 'modal open')
  const resetState = () => {
    // setProfilePicture(null)
    setPicture({value: props.pictureState, valid: null, message: ''});
  }

  // Whether or not the error banner should be displayed. Useful for being able to close the error banner.
  const [showError, setShowError] = useState(false);

  // The function that runs when the form is submitted
  const handleFormSubmit = async (prevState, fieldValues) => {
    const pictureValue = fieldValues.get('picture');

    try {
      // const response = await (Do server action call)

      const response = {success: true}
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() < 0.5) resolve();
          reject('error')
        }, 1000);
      })
      
      if (!response.success) {
        setShowError(true)
        return {status: "ERROR", error: response.message, hiddenError: response?.error.toString()}

      } else if (response.success) {
        setShowError(false)
        // props.closeModal();
        return {status: 'SUCCESS', error: '', hiddenError: ''}
      }

    } catch (error) {
      setShowError(true);
      return {status: 'ERROR', error: 'Unexpected error occurred. Please try again later.', hiddenError: error.toString()}
    }
  }

  const [formState, formAction, isPending] = useActionState(handleFormSubmit, {status: 'INITIAL', error: '', hiddenError: ''})

  // Use effect hook for disabling the modal close button (when the form is being submitted)
  // This effect hook is necessary because the button code is not accessible in this JSX file.
  useEffect(() => {
    if (document.querySelector('#editProfilePictureModal .btn-close') !== null) {
      if (isPending) {
        document.querySelector('#editProfilePictureModal .btn-close').disabled = true;
      } else {
        document.querySelector('#editProfilePictureModal .btn-close').disabled = false;
      }
    }
  }, [isPending])

  return (
    <Modal id='editProfilePictureModal' show={props.show} backdrop="static" onExited={() => setShowError(false)} onEnter={resetState} onHide={props.closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title as='h2'>Edit Profile Picture</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack gap={5}>
          <Alert variant="danger" show={formState.status === "ERROR" && !isPending && showError} onClose={() => setShowError(false)} dismissible>
            <Alert.Heading>Error</Alert.Heading>
            {formState.error}
          </Alert>
          <p className="d-none text-break hiddenError">{formState.hiddenError}</p>
          <Form action={formAction}>

            <div className='d-flex align-items-center justify-content-between pt-10 pb-20 mb-30'>
              <div>
                <p className='mb-20'>Upload or remove your profile picture. <br /> The Image size cannot be larger than _MB.</p>
                <ButtonWithIcon size='sm' variant='secondary' iconSrc='/icons/upload.svg' iconHeight={16} altTag='Upload icon' className='me-20' onClick={() => {fileInput.current.click()}}>Upload</ButtonWithIcon>
                <ButtonWithIcon size='sm' variant='gray' iconSrc='/icons/close.svg' iconHeight={16} altTag='Close icon' onClick={() => {setProfilePicture(null)}}>Remove</ButtonWithIcon>
              </div>
              <div>
                {/* <ProfileCircle
                  height={120}
                  profilePicture={picture.value}
                  profileColors={props.pictureInfo.profileColors}
                  firstLetter={props.pictureInfo.firstLetter}
                /> */}

                {profilePicture ? 
                         
                  <Image
                    src={profilePicture}
                    height={120}
                    width={120}
                    className="profile-circle rounded-circle"
                    alt="profile picture"
                    style={{ width: `${120 / 16}rem`, height: `${120 / 16}rem` }}
                  />
                  :
                  <div className="profile-circle rounded-circle d-flex align-items-center justify-content-center" style={{ backgroundColor: props.pictureInfo.profileColors[0], width: `${120 / 16}rem`, height: `${120 / 16}rem` }}>
                    <span style={{
                      color: props.pictureInfo.profileColors[1],
                      fontSize: `${1.5 * (120 / 40)}rem`,
                      fontWeight: "500",
                      WebkitUserSelect: "none",
                      msUserSelect: "none",
                      userSelect: "none"
                    }}>
                      {props.pictureInfo.firstLetter}
                    </span>
                  </div>
                }

              </div>
            </div>
            
            
            <ProfilePictureInput fileInputRef={fileInput} profilePicture={profilePicture} setProfilePicture={setProfilePicture}/>

            

            <Container fluid className="d-flex gap-4 justify-content-end p-0">            
              <Button variant="gray" onClick={props.closeModal} disabled={isPending}>
                Cancel
              </Button>
              <Button variant="primary" type='submit' disabled={isPending}>
                {isPending ? <div style={{padding: '0rem 1rem'}}><div className="loader"></div><span className="visually-hidden">Loading...</span></div> : 'Save'}
              </Button>
            </Container>
          </Form>
        </Stack>
      </Modal.Body>
    </Modal>
  )
}

export default EditProfilePictureModal