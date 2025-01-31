import Image from "next/image";


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
      {user.profile_picture ? (
        <Image
          src={`/images/profilepictures/${user.profile_picture}.jpg`}
          height={100}
          width={100}
          className="rounded-circle"
          alt="profile picture"
        />
      ) : (
        <div
          className="rounded-circle d-flex align-items-center justify-content-center"
          style={{ backgroundColor: user.profile_colors[0] }}
        >
          <span style={{ color: user.profile_colors[1] }}>
            {user.username.slice(0, 1).toUpperCase()}
          </span>
        </div>
      )}
    </a>
  );
};

export default ProfilePictureToggler;
