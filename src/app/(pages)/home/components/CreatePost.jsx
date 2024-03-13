"use client";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const CreatePost = () => {
  const content = useRef();
  const [show, setShow] = useState(false);
  return (
    <div className="overflow-hidden relative border-b border-grays-200 min-h-36 flex flex-col">
      <div className="p-4 flex">
        <img
          src="https://pbs.twimg.com/profile_images/1487114760826986498/9DiToHc0_normal.jpg"
          alt="your pfp"
          className="rounded-full size-12"
        />
        <textarea
          onChange={(e) => {
            if (e.target.value.length > 0) {
              setShow(true);
            } else {
              setShow(false);
            }
          }}
          ref={content}
          name="content"
          spellCheck="false"
          placeholder="what do you want to waffle about"
          className="placeholder:font-thin ml-4 h-14 w-full text-2xl  outline-none bg-background resize-none "
          id=""
          cols="30"
          rows="10"
        ></textarea>
      </div>
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "100%" }}
            transition={{ type: "tween",ease: "circInOut", duration: 0.8, damping: 10 }}
            className="absolute w-full h-12 bottom-0 overflow-hidden flex "
          >
            <div className="size-32 z-10 pointer-events-none bg-accent-900 scale-150 opacity-50 right-0 absolute blur-3xl" ></div>
            <button className="z-20 ml-auto bg-accent-900 px-8 m-2 rounded-full">
              Post
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CreatePost;
