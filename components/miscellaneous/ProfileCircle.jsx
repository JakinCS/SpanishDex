import Image from "next/image"

const ProfileCircle = ({height, profilePicture, profileColors, firstLetter, ...otherProps}) => {
  const spanStyles = {
    color: profileColors[1],
    fontSize: `${1.5 * (height / 40)}rem`,
    fontWeight: "500",
    WebkitUserSelect: "none",
    msUserSelect: "none",
    userSelect: "none"
  }

  const extraClasses = otherProps.className ? ' ' + otherProps.className : '';

  return (
    <>
      {profilePicture ? 
        <Image
          src={profilePicture}
          height={height}
          width={height}
          className={"profile-circle rounded-circle" + extraClasses}
          alt="profile picture"
          style={{ width: `${height / 16}rem`, height: `${height / 16}rem` }}
        />
        :
        <div
          className={"profile-circle rounded-circle d-flex align-items-center justify-content-center" + extraClasses}
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