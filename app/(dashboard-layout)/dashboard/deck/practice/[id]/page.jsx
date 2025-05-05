import React from 'react'
import { notFound } from 'next/navigation'

const page = async ({ params, searchParams }) => {

  const { id } = await params;
  const queryParams = await searchParams;

  // Ensure the id is a valid ObjectId format before proceeding
  if ( !(/^[0-9a-fA-F]+$/.test(id)) || id.length !== 24) {
    notFound() // Trigger the 404 page in Next.js if the id is invalid
  }

  return (
    <div>
      <h2>Practice Page</h2>
      <p>Deck ID: {id}</p>
      <p>{queryParams.weak === 'true' ? 'Praticing Weak' : 'Practicing All'}</p>
    </div>
  )
}

export default page