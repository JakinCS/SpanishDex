'use client'

import Modal from "react-bootstrap/Modal";
import Stack from "react-bootstrap/Stack"
import HomepageContactForm from "../ContactForm";
import linkedin from "@/public/icons/linkedin.svg";
import mail from "@/public/icons/mail.svg";
import Icon from "../Icon";

const ContactModal = ({ show, handleClose }) => {
  return (
    <Modal size='sm' id='contactModal' show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title as='h2'>Contact</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack gap={30}>          
          <p>
            Contact Jakin Stahl using the form below or visit his LinkedIn profile to connect with him.
          </p>
          <HomepageContactForm submitButtonWide={true} />
          <div>
            <a href="mailto:jakinstahl@gmail.com" className='me-3 px-2 py-3 blue-link'>
              <Icon height={30} src={mail} alt='Mail icon'/>
            </a>
            <a href="https://www.linkedin.com/in/jakinstahl" className='px-2 py-3 blue-link' style={{marginRight: '-5px'}} target='_blank'>
              <Icon height={30} src={linkedin} alt='LinkedIn icon'/>
            </a>
          </div>
        </Stack>
      </Modal.Body>
    </Modal>
  )
}

export default ContactModal