import React from 'react'

const NotFound = () => {
  return (
    <div className='size-full h-screen flex flex-col items-center justify-center' >
        <div className='text-8xl bg-gradient-to-b font-black from-red-600  to-black text-transparent bg-clip-text'>404</div>
        <div>User not found</div>
    </div>
  )
}

export default NotFound