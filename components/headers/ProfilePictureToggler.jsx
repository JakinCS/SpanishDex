import ProfileCircle from "../ProfileCircle";


const ProfilePictureToggler = ({ onClick, user }, ref) => {
  return (
    <a
      href=""
      className="profile-picture"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      <ProfileCircle 
        height={40}
        profilePicture={user.profile_picture} 
        profileColors={user.profile_colors} 
        firstLetter={user.username.slice(0, 1).toUpperCase()}
      />
    </a>
  );
};

export default ProfilePictureToggler;
