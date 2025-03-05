import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Stack from 'react-bootstrap/Stack';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { useActionState, useEffect, useRef, useState } from 'react';
import ProfileCircle from '../ProfileCircle';
import ButtonWithIcon from '../ButtonWithIcon';
import ProfilePictureInput from '../ProfilePictureInput';
import { uploadImage } from '@/lib/actions';
import { useSession } from 'next-auth/react';

const EditProfilePictureModal = (props) => {
  const {session, update} = useSession();

  // References the input field for the file upload
  const fileInput = useRef(null)

  // State for keeping track of the profile picture value and whether it is valid or not.
  const [profilePicture, setProfilePicture] = useState({value: props.pictureState, name: '', valid: null, message: '' })

  // Function for resetting the state of the form (useful when triggered on 'modal open')
  const resetState = () => {
    setProfilePicture({value: props.pictureState, name: '', valid: null, message: ''})
  }

  // Whether or not the error banner should be displayed. Useful for being able to close the error banner.
  const [showError, setShowError] = useState(false);

  // The function that runs when the form is submitted
  const handleFormSubmit = async (prevState, fieldValues) => {

    if (props.pictureState === profilePicture.value) {
      props.closeModal();
      return {status: 'SUCCESS', error: '', hiddenError: ''}
    }

    try {
      const response = await uploadImage(props.userId, {value: profilePicture.value, name: profilePicture.name}, props.pictureState);
      
      if (!response.success) {
        setShowError(true)
        return {status: "ERROR", error: response.message, hiddenError: response?.error.toString()}

      } else if (response.success) {
        setShowError(false)

        update({image: response.data})

        props.setPictureState(response.data)

        props.closeModal();

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

            <Container className='pt-10 pb-20 px-0 mb-30' fluid>
              <Row className='d-flex align-items-center justify-content-between'>
                <Col xs={{ order: 1 }} sm={{ order: 0 }}>
                  <p className='mb-20 text-center text-sm-start'>Upload or delete your profile picture. <br /> The image size cannot be larger than 4.5MB.</p>
                  <div className='d-flex justify-content-center justify-content-sm-start'>
                    <ButtonWithIcon size='sm' variant='secondary' iconSrc='/icons/upload.svg' iconHeight={16} altTag='Upload icon' className='me-20' onClick={() => {fileInput.current.click()}}>Upload</ButtonWithIcon>
                    <ButtonWithIcon size='sm' variant='danger' iconSrc='/icons/close.svg' iconHeight={16} iconFillColor={'white'} altTag='Close icon' onClick={() => {setProfilePicture({valid: null, name: '', value: null, message: ''})}}>Delete</ButtonWithIcon>
                  </div>
                  <p className={(profilePicture.valid === false ? 'd-block' : 'd-none') + ' mt-15 fw-medium text-danger text-center text-sm-start'}>{profilePicture.message}</p>
                </Col>
                <Col xs={{ order: 0 }} sm={{ span: 'auto', order: 1 }} className='d-flex justify-content-center mb-25 mb-sm-0'>
                  <ProfileCircle
                    height={120}
                    profilePicture={profilePicture.value}
                    profileColors={props.pictureInfo.profileColors}
                    firstLetter={props.pictureInfo.firstLetter}
                  />
                </Col>
              </Row>
            </Container>            
            
            <ProfilePictureInput fileInputRef={fileInput} profilePicture={profilePicture} setProfilePicture={setProfilePicture}/>

            
            <Container fluid className="d-flex gap-4 justify-content-end p-0">            
              <Button variant="gray" onClick={props.closeModal} className='d-none d-sm-block' disabled={isPending}>
                Cancel
              </Button>
              <Button variant="primary" type='submit' className='d-none d-sm-block' disabled={isPending}>
                {isPending ? <div style={{padding: '0rem 1rem'}}><div className="loader"></div><span className="visually-hidden">Loading...</span></div> : 'Save'}
              </Button>
              <Button variant="primary" type='submit' className='w-100 d-sm-none' disabled={isPending}>
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