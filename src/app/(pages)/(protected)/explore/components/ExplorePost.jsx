"use client"
import React from 'react'
import Image from "next/image"
import Link from "next/link"

const ExplorePost = ({image, id}) => {
  return (
    <Link href={`/post/${id}`} className='bg-[rgb(8,8,8)] rounded-2xl h-72 sm:h-96  w-full overflow-hidden border-2 hover:brightness-110 transition-all border-transparent hover:border-accent-100' >
      <Image alt='post' width={1000} height={1000} src={image} className='size-full object-cover  transition-transform ease-in-out'></Image>
    </Link>
  )
}

export default ExplorePost