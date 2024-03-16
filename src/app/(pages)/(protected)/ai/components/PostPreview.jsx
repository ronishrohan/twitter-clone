"use client"
import React from 'react'
import {motion} from "framer-motion"
import Markdown from 'react-markdown'

function PostPreview({content}) {
  return (
    <motion.div className='w-full  p-10 top-0 overflow-y-scroll max-h-[calc(100%-120px)] mb-auto'>
        <div className=" flex w-full p-4 pb-2 gap-2 font-overused shrink-0">
      <img
        src="https://pbs.twimg.com/profile_images/1487114760826986498/9DiToHc0_normal.jpg"
        className="rounded-full size-10"
        alt=""
      />
      <div className="flex flex-col">
        <div className="flex text-lg  align-top gap-2">
          <span className="leading-4 font-semibold">Ronish Rohan</span>
          <span className="leading-4 font-medium text-grays-300">
            @ronishrohan
          </span>
          <span className="leading-4 font-medium text-grays-300">4h</span>
        </div>
        <div className="font-roboto mt-2">
          <Markdown>{content}</Markdown>
        </div>
      </div>
    </div>
    </motion.div>
  )
}

export default PostPreview




