'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import AboutModal from '../modals/AboutModal';
import ContactModal from '../modals/ContactModal';

const DashboardFooterLinks = () => {
  // About Modal State
  const [aboutModalOpenState, setAboutModalOpenState] = useState(false);

  const openAboutModal = () => setAboutModalOpenState(true);
  const closeAboutModal = () => setAboutModalOpenState(false);
  
  // Contact Modal State
  const [contactModalOpenState, setContactModalOpenState] = useState(false);

  const openContactModal = () => setContactModalOpenState(true);
  const closeContactModal = () => setContactModalOpenState(false);

  return (
    <>
      <Link href="#" className='me-4 px-2 py-3' onClick={(e) => {e.preventDefault(); openAboutModal()}}>
        About
      </Link>
      <Link href="#" className='px-2 py-3' style={{marginRight: '-5px'}} onClick={(e) => {e.preventDefault(); openContactModal()}}>
        Contact
      </Link>

      <AboutModal show={aboutModalOpenState} handleClose={closeAboutModal}/>
      <ContactModal show={contactModalOpenState} handleClose={closeContactModal}/>
    </>
  )
}

export default DashboardFooterLinks