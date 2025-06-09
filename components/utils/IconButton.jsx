import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import Icon from './Icon';

function IconButton({isLinkButton, iconFillColor, iconSrc, altTag, danger, className, size, ...otherProps}) {
    // Additional classes
    let newClasses = [
        'icon-button',
        'icon-button-size-' + size,
        iconFillColor && `icon-fill-${iconFillColor}`,
        danger && 'danger'
    ].join(' ');

    let widthHeight = 30;
    if (size === 'sm') widthHeight = 24;

    return (
        isLinkButton ?
        <Link {...otherProps} role='button' className={className ? className + ' ' + newClasses : newClasses}>
            <Icon height={widthHeight} alt={altTag} src={iconSrc} />
        </Link>
        :
        <Button {...otherProps} className={className ? className + ' ' + newClasses : newClasses}>
            <Icon height={widthHeight} alt={altTag} src={iconSrc} />    
        </Button>
    )
}

export default IconButton;