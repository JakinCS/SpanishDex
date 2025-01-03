import React from 'react'

const ProfilePictureToggler = ({onClick}, ref) => {
  return (
    <a href="" className='profile-picture' ref={ref} onClick={(e) => {e.preventDefault(); onClick(e)}}>
      {/* <div className="rounded-circle">

      </div> */}
      <img src="/profilepic.jpg" className='rounded-circle' alt="" />
    </a>    
  )
}

export default ProfilePictureToggler