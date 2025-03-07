// import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Image from "next/image";

function IconButton({iconFillColor, iconSrc, altTag, danger, className, size, ...otherProps}) {
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
        <Button {...otherProps} className={className ? className + ' ' + newClasses : newClasses}>
            <Image className='icon' height={widthHeight} width={widthHeight} alt={altTag} src={iconSrc} />
        </Button>
    )
}

export default IconButton;