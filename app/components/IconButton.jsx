import Button from 'react-bootstrap/Button';

function IconButton(props) {
    // Additional classes
    let newClass = [
        'icon-button',
        props.iconColor === 'white' || props.iconColor === 'light' ? 'fill-white' : 'fill-dark'
    ].join(' ');

    return (
        <Button {...props} className={props.className ? props.className + ' ' + newClass : newClass}></Button>
    )
}

export default IconButton;