import Image from "next/image"

const ProfileCircle = ({height, profilePicture, profileColors, firstLetter}) => {
  const spanStyles = {
    color: profileColors[1],
    fontSize: `${1.5 * (height / 40)}rem`,
    cursor: "default",
    fontWeight: "500",
    WebkitUserSelect: "none",
    msUserSelect: "none",
    userSelect: "none"
  }

  return (
    <>
      {profilePicture ? 
        <Image
          src={`/images/profilepictures/${profilePicture}.jpg`}
          height={height}
          width={height}
          className="profile-circle rounded-circle"
          alt="profile picture"
          style={{ width: `${height / 16}rem`, height: `${height / 16}rem` }}
        />
        :
        <div
          className="profile-circle rounded-circle d-flex align-items-center justify-content-center"
          style={{ backgroundColor: profileColors[0], width: `${height / 16}rem`, height: `${height / 16}rem` }}
        >
          <span style={spanStyles}>
            {firstLetter}
          </span>
        </div>
      }
    </>
  )
}

export default ProfileCircle