"use client"
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import Button from 'react-bootstrap/Button'


const DashboardButtons = () => {
  return (
    <>
      <Link href='/' role='button' className='btn btn-outline-primary me-3'>Home</Link>
      <Button variant='outline-danger' onClick={() => signOut({ callbackUrl: '/' })}>Log Out</Button>
    </>
  )
}

export default DashboardButtons