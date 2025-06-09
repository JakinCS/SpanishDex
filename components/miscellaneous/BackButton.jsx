"use client"

import { useRouter } from "next/navigation";
import Icon from "../utils/Icon";
import Link from "next/link";

const BackButton = ({onClick, url, ...props}) => {
  // Define router
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();

    // Navigate back
    router.back();
  }

  return (
    <div {...props} className={"d-flex align-items-center" + (props.className ? ` ${props.className}` : '')} style={{...props.style, height: '2.5rem'}}>
      {url ? 
        <Link href={url} className="back-button d-flex align-items-center pe-10 ps-10" style={{marginLeft: '-0.625rem'}}>
          <Icon height={24} alt="" src={'/icons/arrow_back.svg'} className='me-2'/>
          <span>Back</span>
        </Link>
        :
        <a href='#' onClick={onClick ? onClick : handleClick} className="back-button d-flex align-items-center pe-10 ps-10"  style={{marginLeft: '-0.625rem'}}>
          <Icon height={24} alt="" src={'/icons/arrow_back.svg'} className='me-2'/>
          <span>Back</span>
        </a>
      }
    </div>
  )
}

export default BackButton