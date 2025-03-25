'use client'

import Modal from "react-bootstrap/Modal";
import Stack from "react-bootstrap/Stack"

const AboutModal = ({show, handleClose}) => {
  return (
    <Modal id='aboutModal' show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title as='h2'>About</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack gap={15}>          
          <p>
            SpanishDex is an application created by <span className="fw-semibold">Jakin Stahl</span> to 
            demonstrate his web development and web design skills.
          </p>
          <p>
            This application was designed in Figma and built with Next.js and Bootstrap.
          </p>
          <p>
            SpanishDex was designed specifically as a tool for Spanish learners who want to practice their vocabulary. 
            It uses a simple spaced repetition learning algorithm to determine which flashcards need review, 
            helping learners retain their vocabulary.
          </p>
        </Stack>
      </Modal.Body>
    </Modal>
  );
}

export default AboutModal