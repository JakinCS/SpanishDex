import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

function IconButton({iconFillColor, iconSrc, danger, className, ...otherProps}) {
    // Additional classes
    let newClasses = [
        'icon-button',
        (iconFillColor === 'white' || iconFillColor === 'light') && 'fill-white',
        danger && 'danger'
    ].join(' ');

    return (
        <Button {...otherProps} className={className ? className + ' ' + newClasses : newClasses}>
            <Image height='30' src={iconSrc} />
        </Button>
    )
}

export default IconButton;