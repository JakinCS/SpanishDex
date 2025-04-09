import React from 'react'

const EditDeckPage = async ({ params }) => {
  const { id } = await params

  return (
    <div>
      <h3>EditDeckPage</h3>
      <p>{id}</p>
    </div>
  )
}

export default EditDeckPage