import React from 'react'

const DashboardCardLoading = () => {
  return (
    <div className="p-20">
      <div className='placeholder-glow mb-15'>
        <span className='placeholder bg-gray-150 rounded d-block d-xs_sm-none' style={{height: '7.9375rem', width: '100%' }}></span>
        <span className='placeholder bg-gray-150 rounded d-none d-xs_sm-block' style={{height: '8.5625rem', width: '100%' }}></span>
      </div>
      <div className='placeholder-glow d-flex'>
        <span className='placeholder bg-gray-150 rounded' style={{height: '.75rem', minHeight: '.75rem', width: '10rem' }}></span>
      </div>
    </div>
  )
}

export default DashboardCardLoading