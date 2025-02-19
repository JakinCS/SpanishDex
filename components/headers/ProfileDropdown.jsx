import Dropdown from 'react-bootstrap/Dropdown';
import ProfilePictureToggler from '@/components/headers/ProfilePictureToggler';


const ProfileDropdown = (props) => {

  return (
    <Dropdown align="end" className={props.className}>
      <Dropdown.Toggle user={props.user} as={ProfilePictureToggler} id="dropdown-custom-components">
        Custom toggle
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <p>Welcome,<br />{props.user.username}</p>
        <Dropdown.Divider />
        <Dropdown.Item eventKey="1" className='mb-2'>Account</Dropdown.Item>
        <Dropdown.Item eventKey="2">Settings</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item eventKey="3" className='danger-item' onClick={props.onClick}>Log Out</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default ProfileDropdown