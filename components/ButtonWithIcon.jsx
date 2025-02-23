import Button from 'react-bootstrap/Button';
import Image from 'next/image';

const ButtonWithIcon = ({altTag, iconSrc, children, ...buttonProps}) => {
  return (
    <Button {...buttonProps}>
      <div className="d-flex align-items-center">
        <Image height={24} width={24} alt={altTag} src={iconSrc} />
        <span className="ms-10">{children}</span>
      </div>
    </Button>
  )
}

export default ButtonWithIcon