"use client";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { icons } from "@/app/utils/icons";
import { useSession } from "next-auth/react";
import { createPostAction } from "@/app/mongodb/actions/post.actions";
import Image from "next/image";

const Circle = ({percentage}) => (
  <>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      version="1.1"
      width={50}
      height={50}
      viewBox="0 0 200 200"
      xmlSpace="preserve"
    >
      <circle
        style={{
          stroke:"#1d9bf0",
          strokeWidth: 4,
          strokeDasharray: 100,
          strokeDashoffset: percentage,
          
          fill: "transparent",
          fillRule: "nonzero",
          opacity: 1,
        }}
        vectorEffect="non-scaling-stroke"
        cx={100}
        cy={100}
        r={50}
      />
    </svg>
  </>
);
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
  const content = useRef();
  const [show, setShow] = useState(false);
  const [perc, setPerc] = useState(0)
  async function handleSubmit() {
    await createPostAction(content.current.value);
    content.current.value = "";
    
  }
  function handleChange() {
    
    setPerc(100-(content.current.value.length/5))

    if (content.current.value.length > 0) {
      setShow(true);
    } else {
      setShow(false);
    }
  }
  return (
    <div className="overflow-hidden relative border-b border-grays-200  flex flex-col">
      <div className="p-4 flex mb-14">
      <Image className="rounded-full size-12" src={data?.user?.image} width={48} height={48}></Image>

        <div
          className="relative cursor-text leading-7 placeholder:font-thin ml-4 w-full overflow-hidden text-wrap whitespace-nowrap max-h-screen text-2xl  outline-none bg-background resize-none "
        >
          <textarea
            maxLength={500}
            ref={content}
            placeholder="start waffling 🗣🗣🗣🗣🗣"
            className="bg-transparent resize-none overflow-y-auto max-h-44 h-28 outline-none w-full font-roboto"
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
            <div className="h-full w-20 flex items-center justify-center stroke-accent-900 fill-accent-900">
              <Circle percentage={perc} ></Circle>
            </div>
            <button
              onClick={handleSubmit}
              className="z-20 ml-auto bg-accent-900 px-8 m-2 rounded-2xl text-white font-semibold hover:bg-accent-800"
            >
              Post
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CreatePost;
