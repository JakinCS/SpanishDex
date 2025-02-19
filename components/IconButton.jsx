// import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Image from "next/image";

function IconButton({iconFillColor, iconSrc, altTag, danger, className, ...otherProps}) {
    // Additional classes
    let newClasses = [
        'icon-button',
        (iconFillColor === 'white' || iconFillColor === 'light') && 'fill-white',
        danger && 'danger'
    ].join(' ');

    return (
        <Button {...otherProps} className={className ? className + ' ' + newClasses : newClasses}>
            <Image height='30' width='30' alt={altTag} src={iconSrc} />
        </Button>
    )
}

export default IconButton;