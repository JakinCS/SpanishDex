import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import Icon from './Icon';

const ButtonWithIcon = ({isLinkButton, altTag, iconSrc, iconHeight, iconFillColor, children, ...buttonProps}) => {
  const padding = buttonProps.size === 'sm' ? (26 - iconHeight) / 32 : (36 - Math.max(iconHeight, 16)) / 32;
  buttonProps.style = {
    ...buttonProps.style,
    lineHeight: '1',
    paddingTop: `${padding}rem`,
    paddingBottom: `${padding}rem`
  }
  buttonProps.className = buttonProps.className + ' ' + (iconFillColor && `icon-fill-${iconFillColor}`)

  return ( isLinkButton ?
    <Link role='button' {...buttonProps}>
      <div className="d-flex align-items-center justify-content-center">
        <Icon height={iconHeight} alt={altTag} src={iconSrc} />
        <span className={buttonProps.size === 'sm' ? "ms-2" : "ms-10"}>{children}</span>
      </div>
    </Link>
    :
    <Button {...buttonProps}>
      <div className="d-flex align-items-center justify-content-center">
        <Icon height={iconHeight} alt={altTag} src={iconSrc}/>
        <span className={buttonProps.size === 'sm' ? "ms-2" : "ms-10"}>{children}</span>
      </div>
    </Button>
  )
}

export default ButtonWithIcon