import React from 'react'
import BackButton from '../BackButton'
import AccountPageCard from "@/components/account/AccountPageCard"
import Container from "react-bootstrap/Container"
import Stack from "react-bootstrap/Stack";
import { EmailEditSection, ProfilePictureEditSection, UsernameEditSection } from "@/components/account/AccountPageEditSections";
import IconButton from '../IconButton';
import Button from 'react-bootstrap/Button'

const AccountPageSkeleton = () => {
  return (
    <>
      <BackButton className="mb-40"/>
      <Container
        className="mx-auto px-0"
        style={{ maxWidth: "40.625rem" }}
        fluid
      >
        <h1 className="text-center text-sm-start mb-40 mb-sm-50">My Account</h1>
        <AccountPageCard className="mb-5" paddingY="30">
          <ProfilePictureEditSection isLoading={true}/>
        </AccountPageCard>
        <AccountPageCard className="mb-5">
          <h3 className="mb-5 text-center text-sm-start">Account Details</h3>
          <Stack gap={20} className="lh-1">
            <div className="d-flex justify-content-between align-items-center">
              <UsernameEditSection isLoading={true} />
            </div>
            <hr />
            <div className="d-flex justify-content-between align-items-center">
              <EmailEditSection isLoading={true} />
            </div>
            <hr />
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p className="fw-medium mb-3">Password</p>
                <p
                  style={{ fontFamily: "sans-serif", letterSpacing: ".125rem" }}
                >
                  ••••••••••
                </p>
              </div>
              <div>
                <IconButton variant='light' size='sm' iconSrc={'/icons/edit.svg'} altTag={'edit icon'} disabled={true}/>
              </div>
            </div>
          </Stack>
        </AccountPageCard>
        <AccountPageCard className="mb-5">
          <h3 className="mb-20 text-center text-sm-start">Delete Your Account</h3>
          <p className="mb-20 text-center text-sm-start">
            Caution. This action permanently removes your account and all data
            associated with your account. This action cannot be undone.
          </p>
          <Button className="d-none d-sm-block" variant='outline-danger' disabled={true}>Delete Account</Button>
          <Button className="d-block d-sm-none w-100" variant='outline-danger' disabled={true}>Delete Account</Button>
        </AccountPageCard>
        <div className='placeholder-glow'>
          <p className="text-center text-sm-start">
            <span className="fw-medium">Account Created:</span> &nbsp;
            <span className='placeholder bg-gray-150 rounded' style={{height: '1rem', width: '8rem' }}></span>       
          </p>
        </div>
      </Container>
    </>
  )
}

export default AccountPageSkeleton