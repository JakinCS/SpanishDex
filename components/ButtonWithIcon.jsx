import Button from 'react-bootstrap/Button';
import Image from 'next/image';

const ButtonWithIcon = ({altTag, iconSrc, iconHeight, children, ...buttonProps}) => {
  const padding = buttonProps.size === 'sm' ? (26 - iconHeight) / 32 : (32 - iconHeight) / 32;
  buttonProps.style = {
    ...buttonProps.style,
    paddingTop: `${padding}rem`,
    paddingBottom: `${padding}rem`
  }

  return (
    <Button {...buttonProps}>
      <div className="d-flex align-items-center">
        <Image height={iconHeight} width={iconHeight} alt={altTag} src={iconSrc} />
        <span className={buttonProps.size === 'sm' ? "ms-2" : "ms-10"}>{children}</span>
      </div>
    </Button>
  )
}

export default ButtonWithIcon