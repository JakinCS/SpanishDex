"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";

const BackButton = () => {
  // Define router
  const router = useRouter();

  return (
    <div className="d-flex align-items-center mb-40">
      <a href='#' onClick={(e) => {e.preventDefault(); router.back()}} className="back-button d-flex align-items-center pe-10 ps-10"  style={{marginLeft: '-0.625rem'}}>
        <Image height={24} width={24} alt={'edit'} src={'/icons/arrow_back.svg'} className="me-2" />
        <span>Back</span>
      </a>
    </div>
  )
}

export default BackButton