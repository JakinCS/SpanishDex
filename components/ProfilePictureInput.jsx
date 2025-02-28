import Form from 'react-bootstrap/Form'

const ProfilePictureInput = ({profilePicture, setProfilePicture, ...otherProps}) => {

  // This function is run when the user clicks the upload button.
  const onFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.addEventListener('load', () => {
      const imageUrl = reader.result?.toString() || '';
      setProfilePicture(imageUrl)
    });

    reader.readAsDataURL(file);
  }

  return (
    <>
      <Form.Control ref={otherProps.fileInputRef} type="file" className='visually-hidden' onChange={onFileUpload}/>      
    </>
  )
}

export default ProfilePictureInput