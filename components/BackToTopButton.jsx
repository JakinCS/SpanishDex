'use client'

import Image from "next/image"
import { useEffect, useState } from "react"

const BackToTopButton = () => {
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      
      if (window.scrollY > (document.body.clientHeight) || window.scrollY > (document.documentElement.clientHeight)) {
        setShowButton(true)
      } else {
        setShowButton(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <button onClick={() => window.scrollTo(0, 0)} className={'backToTopButton flex-column align-items-center ' + (showButton ? 'd-flex' : 'd-none')}>
      <Image src='/icons/arrow_upward.svg' alt="up arrow" width={24} height={24} style={{height: '1.5rem', width: '1.5rem'}}/>
      <span className="fs-5 lh-sm"><span id="spanFSReference">Back</span><br />to Top</span>
    </button>
  )
}

export default BackToTopButton