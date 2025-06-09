'use client'

import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack"
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { useActionState, useState } from "react";
import Link from "next/link";
import { sendResetPasswordMessage } from "@/lib/actions";

const ForgotPassword = () => {

  // Holds the email information
  const [email, setEmail] = useState('');

  const [formState, formAction, isPending] = useActionState(sendResetPasswordMessage, {error: '', hiddenError: '', status: "INITIAL"})

  return (
    <>
      <section className='bg-white p-50 rounded'>
        <Stack gap={5}>
          <h1 className='fs-2'>Reset Password</h1>
          <p className="d-none text-break hiddenError">{formState.hiddenError}</p>
          <p>Please enter your email address below, and we&apos;ll send you a link to reset your password.</p>
          <Form action={formAction}>
            <Form.Group className='mb-5' controlId="resetPasswordEmail">
              <Form.Label className="fw-medium">Email Address</Form.Label>
              <Form.Control name="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email address" />
            </Form.Group>     

            <p className="mb-5" aria-live="polite">
              {(formState.status === "SUCCESS" && !isPending) &&
                <><span className="fw-semibold text-success">Email Sent</span><br /> Didn&apos;t receive the email? {!email || isPending ? <span className="fw-medium">Resend Email</span> : <a href="" onClick={(e) => {e.preventDefault(); document.getElementById("invisibleSubmit").click()}}>Resend Email</a>}</>
              }
            </p>
            <Button id="invisibleSubmit" type="submit" className="d-none visually-hidden"></Button>

            <p className="mb-5" aria-live="polite">
              {(formState.status === "ERROR" && !isPending) && 
                <><span className="fw-semibold text-danger">Error</span><br /> {formState.error}</>
              }
            </p>

            <Container fluid className="d-flex gap-4 justify-content-end p-0">
              {formState.status === "SUCCESS" ?     

                ( isPending ? 
                  <>                    
                    <Button variant="gray" disabled={true}>Close</Button>
                    <Button variant="primary" disabled={true}>
                      <div style={{padding: '0rem 1rem'}}><div className="loader"></div><span className="visually-hidden">Loading...</span></div>
                    </Button>                    
                  </> 
                  :
                  <>
                    <Link href='/' role='button' className="btn btn-gray">
                      Close
                    </Link>
                    <Link href='/auth/signin' role='button' className="btn btn-primary">
                        Return To Log In
                    </Link>
                  </>
                )
                :
                ( isPending ? 
                  <>
                    <Button variant="gray" disabled={true}>Back</Button>
                    <Button variant="primary" type="submit" disabled={true}>
                      <div style={{padding: '0rem 1rem'}}><div className="loader"></div><span className="visually-hidden">Loading...</span></div>
                    </Button>
                  </>
                  :
                  <>
                    <Link href='/auth/signin' role='button' className="btn btn-gray">
                      Back
                    </Link>
                    <Button variant="primary" type="submit" disabled={ !email }>
                      Send Email
                    </Button>
                  </>
                )
              }
            </Container>
          </Form>
        </Stack>
      </section>
    </>
  )
}

export default ForgotPassword