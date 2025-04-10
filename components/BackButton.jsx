"use client"

import { useRouter } from "next/navigation";
import Icon from "./Icon";

const BackButton = (props) => {
  // Define router
  const router = useRouter();

  return (
    <div {...props} className={"d-flex align-items-center" + (props.className ? ` ${props.className}` : '')} style={{...props.style, height: '2.5rem'}}>
      <a href='#' onClick={(e) => {e.preventDefault(); router.back()}} className="back-button d-flex align-items-center pe-10 ps-10"  style={{marginLeft: '-0.625rem'}}>
        <Icon height={24} alt={'edit'} src={'/icons/arrow_back.svg'} className='me-2'/>
        <span>Back</span>
      </a>
    </div>
  )
}

export default BackButton