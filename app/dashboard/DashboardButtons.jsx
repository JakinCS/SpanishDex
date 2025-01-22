"use client"
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Button from 'react-bootstrap/Button'


const DashboardButtons = () => {
  const router = useRouter()

  return (
    <>
      <Button variant='outline-primary' onClick={() => router.push('/')} className='me-3'>Home</Button>
      <Button variant='outline-danger' onClick={() => signOut({ callbackUrl: '/' })}>Log Out</Button>
    </>
  )
}

export default DashboardButtons