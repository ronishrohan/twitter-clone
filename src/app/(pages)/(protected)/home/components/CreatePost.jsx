"use client";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { icons } from "@/app/utils/icons";
import { useSession } from "next-auth/react";
import axios from "axios";


const Button = ({ icon, ...others }) => {
  return (
    <>
      <button
        {...others}
        className="grid h-full aspect-square place-items-center text-xl hover:bg-grays-100 rounded-lg"
      >
        {icon}
      </button>
    </>
  );
};

const CreatePost = () => {
  const { data, status } = useSession();
  const [height, setHeight] = useState(50);
  const content = useRef();
  const [show, setShow] = useState(false);
  async function handleSubmit(){
    
    const res = await axios.post("/api/post/create", {userId: data.user._id, content: content.current.value})
    
  }
  function handleChange(){
    
    if (content.current.scrollHeight > content.current.clientHeight) {
      setHeight(content.current.scrollHeight);
    }
    else if(content.current.scrollHeight == content.current.clientHeight){
      setHeight("max-content")
    }
    if(content.current.value.length>0){
      setShow(true)
    }
    else{
      setShow(false)
    }
  }
  return (
    <div className="overflow-hidden relative border-b border-grays-200  flex flex-col">
      <div className="p-4 flex mb-14">
        <img
          src={data?.user.image}
          alt="your pfp"
          className="rounded-full size-12"
        />
        <div
          onFocus={() => {
            content.current.focus();
          }}
          onClick={() => {
            content.current.focus();
          }}
          className="relative cursor-text leading-7 placeholder:font-thin ml-4 w-full overflow-hidden text-wrap whitespace-nowrap max-h-screen text-2xl  outline-none bg-background resize-none "
        >
          <textarea
            style={{ height: height }}
            ref={content}
            placeholder="Write a post"
            className="bg-transparent resize-none outline-none w-full "
            onChange={() => handleChange()}
          ></textarea>
        </div>
      </div>
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "100%" }}
            transition={{
              type: "tween",
              ease: "circInOut",
              duration: 0.8,
              damping: 10,
            }}
            className="absolute w-full h-14 bottom-0 overflow-hidden flex shrink-0"
          >
            <div className="size-32 z-10 pointer-events-none bg-accent-900 scale-150 opacity-45 right-0 absolute blur-3xl"></div>
            <div className="flex text-accent-900 size-full items-center p-2">
              <Button title="Media" icon={icons.media}></Button>
            </div>

            <button onClick={handleSubmit} className="z-20 ml-auto bg-accent-900 px-8 m-2 rounded-2xl text-white font-semibold hover:bg-accent-800">
              Post
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CreatePost;
