import Cropper from 'react-easy-crop'
import { getCroppedImg } from '@/lib/utils';
import { useState, useRef } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import IconButton from './IconButton';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ProfilePictureInput = ({profilePicture, setProfilePicture, ...otherProps}) => {

  const sliderInput = useRef(null)

  // State for the crop dialog to work properly
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)

  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

  const updateCroppedArea = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }
  
  // Holds information about the image originially selected by the user.
  // Contains the url version of the image and the file name
  const [originalPic, setOriginalPic] = useState({
    url: undefined,
    name: undefined,
  })

  // Whether to show/hide the dialog for cropping the image
  const [showCropDialog, setShowCropDialog] = useState(false);

  const handleCloseCropDialog = () => {
    // Hide the crop dialog
    setShowCropDialog(false);

    // Reset the crop dialog values for next time it is opened.
    setZoom(1)
    setCrop({ x: 0, y: 0 })

    // Remove the image from the form input 
    // (allows the user to select the same image again and still trigger the onChange event)
    otherProps.fileInputRef.current.value = '';
  }


  // This function is run when the user clicks the upload button.
  const onFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if ( !(/^(image\/)+.*/.test(file.type)) ) {
      setProfilePicture((prevState) => ( {...prevState, valid: false, message: 'You must select an image. The file you selected was not an image.'} ))
      return;
    }

    if (file.size > 4718592) {
      setProfilePicture((prevState) => ( {...prevState, valid: false, message: 'Image too large. The size must be below 4.5MB'} ))
      return;
    } else {
      setProfilePicture((prevState) => ( {...prevState, valid: true, message: ''} ))
    };

    const reader = new FileReader();
    reader.addEventListener('load', () => {
      const imageUrl = reader.result?.toString() || '';
      setOriginalPic({name: file.name, url: imageUrl})
      setShowCropDialog(true);
    });

    reader.readAsDataURL(file);
  }

  // This function is run when the user is done cropping their image.
  // It generates a new image based on the cropping of the user. 
  const confirmCroppedArea = async () => {
    // Generate an image based on the original and the cropped area pixel information
    const croppedImage = await getCroppedImg(
      originalPic.url,
      croppedAreaPixels
    )

    // Set the result of the user's cropping of the image
    setProfilePicture(prevState => ({...prevState, value: croppedImage, name: originalPic.name}))

    // Hide the crop dialog
    handleCloseCropDialog();
  }

  return (
    <>
      <Form.Control ref={otherProps.fileInputRef} type="file" className='visually-hidden' onChange={onFileUpload} accept="image/*"/>  

      {(originalPic.url && showCropDialog) &&
        <div className='position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center'>
          <div style={{width: '650px', height: '80vh'}} className='mx-10 bg-white rounded d-flex flex-column justify-content-between'>
            <div className='d-flex ps-20 pe-10 py-10 align-items-center justify-content-between'>
              <h3>Crop Image</h3>
              <IconButton variant='light' size='sm' iconSrc={'/icons/close.svg'} altTag={'close icon'} onClick={handleCloseCropDialog} />
            </div>
            <div className='position-relative h-100'>
              <Cropper
                image={originalPic.url}
                crop={crop}
                zoom={zoom}
                aspect={1 / 1}
                onCropChange={setCrop}
                onCropComplete={updateCroppedArea}
                onZoomChange={setZoom}
                onWheelRequest={() => false}
              />
            </div>    
            <Container className='py-10 px-20' fluid>
              <Row className='justify-content-between'>
                <Col xs='12' sm='auto' className='pb-10 pb-sm-0 d-flex justify-content-center'>
                  <div className="d-flex align-items-center gap-10 w-100" style={{maxWidth: '350px'}}>                
                    <IconButton variant='light' size='md' iconSrc='/icons/subtract.svg' altTag={'subtract icon'} onClick={ () => setZoom( (prev) => (prev > 1 ? prev - .1 : prev) ) } />
                    <input
                      ref={sliderInput}
                      type="range"
                      value={zoom}
                      min={1}
                      max={3}
                      step={0.1}
                      aria-labelledby="Zoom"
                      onChange={(e) => {
                        setZoom(e.target.value)
                      }}
                      className='w-100 slider rounded'
                    />
                    <IconButton variant='light' size='md' iconSrc='/icons/add.svg' altTag={'plus icon'} onClick={ () => setZoom( (prev) => (prev < 3 ? Number.parseFloat(prev) + .1 : prev) ) } />
                  </div>
                </Col>
                <Col xs='12' sm='auto' className='d-flex justify-content-center'>
                  <Button variant='primary' className='w-100' style={{maxWidth: '350px'}} onClick={confirmCroppedArea}>Ok</Button>
                </Col>                
              </Row>
            </Container>
          </div>          
        </div>         
      }    
    </>
  )
}

export default ProfilePictureInput