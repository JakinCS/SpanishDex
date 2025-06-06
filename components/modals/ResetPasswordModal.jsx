'use client'

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack"
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { useActionState, useEffect, useState } from "react";
import { sendResetPasswordMessage } from "@/lib/actions";

const ResetPasswordModal = ({forAccountPage, size, ...props}) => {
  // Holds the email information
  const [email, setEmail] = useState('');

  // State for overriding the type of the submit/cancel buttons shown and for
  // overriding the visibility of the feedback. 
  // (useful for when the modal is re-opened to not have the feedback visible and to have the buttons as their default)
  const [defaultView, setDefaultView] = useState(true)

  const [formState, formAction, isPending] = useActionState(sendResetPasswordMessage, {error: '', hiddenError: '', status: "INITIAL"})

  // Use effect hook for disabling the modal close button (when the form is being submitted)
  // This effect hook is necessary because the button code is not directly in this JSX file.
  // ALSO, this hook handles the setting of the defaultView.
  useEffect(() => {
    if (document.querySelector('#resetPasswordModal .btn-close') !== null) {
      if (isPending) {
        document.querySelector('#resetPasswordModal .btn-close').disabled = true;
      } else {
        document.querySelector('#resetPasswordModal .btn-close').disabled = false;
      }
    }

    if (!isPending) {
      setDefaultView(false)
    }
  }, [isPending])

  return (
    <Modal size={size ? size : 'sm'} id='resetPasswordModal' show={props.show} onExited={() => {setEmail(''); setDefaultView(true)}} onHide={props.handleClose} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title as='h2'>Reset Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack gap={5}>
          <p className="d-none text-break hiddenError">{formState.hiddenError}</p>
          <p>Please enter your email address below, and we&apos;ll send you a link to reset your password.</p>
          <Form action={formAction}>
            <Form.Group className='mb-5' controlId="resetPasswordEmail">
              <Form.Label className="fw-medium">Email Address</Form.Label>
              <Form.Control name="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email address" />
            </Form.Group>     

            <p className="mb-5" aria-live="polite">
              {(formState.status === "SUCCESS" && !defaultView && !isPending) && 
                <><span className="fw-semibold text-success">Email Sent</span><br /> Didn&apos;t receive the email? {!email || isPending ? <span className="fw-medium">Resend Email</span> : <a href="" onClick={(e) => {e.preventDefault(); document.getElementById("invisibleSubmit").click()}}>Resend Email</a>}</>
              }              
            </p>
            <Button id="invisibleSubmit" type="submit" className="d-none visually-hidden"></Button>

            <p className="mb-5" aria-live="polite">
              {(formState.status === "ERROR" && !defaultView && !isPending) &&
                <><span className="fw-semibold text-danger">Error</span><br /> {formState.error}</>              
              }
            </p>

            <Container fluid className="d-flex gap-4 justify-content-end p-0">
              {formState.status === "SUCCESS" && !defaultView ?
                <Button className="d-none d-xs_sm-block" variant="gray" onClick={props.handleClose} disabled={isPending}>
                  Close
                </Button> :
                <Button variant="gray" onClick={() => {props.handleClose(); props.openPreviousModal()}} disabled={isPending}>
                  Back
                </Button>
              }
              {formState.status === "SUCCESS" && !defaultView ?
                <>
                  <Button className="d-none d-xs_sm-block" variant="primary" onClick={() => {props.handleClose(); props.openPreviousModal()}} disabled={isPending}>
                    {isPending ? <div style={{padding: '0rem 1rem'}}><div className="loader"></div><span className="visually-hidden">Loading...</span></div> : (forAccountPage ? 'Return' : 'Return To Log In')}
                  </Button>
                  <Button className="d-block d-xs_sm-none w-100" variant="primary" onClick={() => {props.handleClose(); props.openPreviousModal()}} disabled={isPending}>
                    {isPending ? <div style={{padding: '0rem 1rem'}}><div className="loader"></div><span className="visually-hidden">Loading...</span></div> : (forAccountPage ? 'Return' : 'Return To Log In')}
                  </Button>
                </>
                :
                <Button variant="primary" type="submit" disabled={ !email || isPending}>
                  {isPending ? <div style={{padding: '0rem 1rem'}}><div className="loader"></div><span className="visually-hidden">Loading...</span></div> : 'Send Email'}
                </Button>
              }
            </Container>
          </Form>
        </Stack>
      </Modal.Body>
    </Modal>
  )
}

export default ResetPasswordModal