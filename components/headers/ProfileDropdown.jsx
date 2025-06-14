'use client'

import Dropdown from 'react-bootstrap/Dropdown';
import ProfilePictureToggler from '@/components/headers/ProfilePictureToggler';
import Link from 'next/link';


const ProfileDropdown = (props) => {

  return (
    <Dropdown align="end" className={props.className}>
      <Dropdown.Toggle user={props.user} as={ProfilePictureToggler} id="dropdown-custom-components">
        Custom toggle
      </Dropdown.Toggle>

      <Dropdown.Menu as='aside'>
        <p>Welcome,<br />{props.user.username}</p>
        <Dropdown.Divider />
        <Link href={`/account/${props.user.id}`} className='dropdown-item mb-2'>Account</Link>
        {/* <Dropdown.Item eventKey="2">Settings</Dropdown.Item> */}
        <Dropdown.Divider />
        <Dropdown.Item eventKey="3" className='danger-item' onClick={props.onClick}>Log Out</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default ProfileDropdown