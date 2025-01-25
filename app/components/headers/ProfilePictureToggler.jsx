
const ProfilePictureToggler = ({onClick, user}, ref) => {

  return (
    <a href="" className='profile-picture' ref={ref} onClick={(e) => {e.preventDefault(); onClick(e)}}>
      {user.profile_picture ?
        <img src={`/images/profilepictures/${user.profile_picture}.jpg`} className='rounded-circle' alt="" />
        :
        <div className="rounded-circle d-flex align-items-center justify-content-center" style={{backgroundColor: user.profile_colors[0]}}>
          <span style={{color: user.profile_colors[1]}}>{user.username.slice(0,1).toUpperCase()}</span>
        </div>
      }
    </a> 
  )
}

export default ProfilePictureToggler