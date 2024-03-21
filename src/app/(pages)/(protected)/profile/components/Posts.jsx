"use client"
import { useSession } from 'next-auth/react'
import React, { useEffect } from 'react'

const Posts = () => {
    const {data, status} = useSession();
    
  return (
    <div>{data?.user?._id}</div>
  )
}

export default Posts