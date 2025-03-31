'use client'

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const StatusIndicator = ({ isWeak, ...otherProps }) => {
  const paragraphAttributes = {
    ...otherProps,
    className: `fw-semibold ${isWeak ? 'text-warning' : 'text-green'}`,
    style: { ...otherProps, minWidth: '5rem' }
  }

  return (
    <>
      {isWeak ?
        <p 
          {...paragraphAttributes}
        >
          Weak
        </p>
        :
        <OverlayTrigger overlay={<Tooltip>Again in 29 Days</Tooltip>} delay={{ show: 1000, hide: 400 }}>
          <p
            {...paragraphAttributes}
          >
            Practiced
          </p>
        </OverlayTrigger>
      }
    </>
  )
}

export default StatusIndicator