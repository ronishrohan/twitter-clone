"use client";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { icons } from "@/app/utils/icons";
import { useSession } from "next-auth/react";

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
  const {data, status} = useSession();
  const content = useRef();
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const [show, setShow] = useState(false);
  return (
    <div className="overflow-hidden relative border-b border-grays-200  flex flex-col">
      <div className="p-4 flex mb-14">
        <img
          src={data?.user.image}
          alt="your pfp"
          className="rounded-full size-12"
        />
        {/* <textarea
          style={{ height: height }}
          onChange={(e) => {
            setHeight(content.current.scrollHeight);
            if (e.target.value.length > 0 && e.target.value.trim() != "") {
              setShow(true);
            } else {
              setShow(false);
            }
          }}
          ref={content}
          name="content"
          spellCheck="false"
          placeholder="what do you want to waffle about"
           
          id=""
          cols="30"
          rows="10"
        ></textarea> */}
        <div
          onFocus={() => {
            content.current.focus();

          }}
          onClick={() => {
            
            content.current.focus();
          }}

          onInput={(e) => {
            if (content.current.textContent.length > 0) {
              setShowPlaceholder(false);
            }
            else{
              setShowPlaceholder(true);
            }
            if (
              e.target.textContent.length > 0 &&
              e.target.textContent.trim() != ""
            ) {
              setShow(true);
            } else {
              setShow(false);
            }
          }}
          className="relative cursor-text leading-7 placeholder:font-thin ml-4 w-full overflow-hidden text-wrap whitespace-nowrap max-h-fit text-2xl  outline-none bg-background resize-none "
        >
          {/* <span ref={content} suppressContentEditableWarning={true} contentEditable className="outline-none"></span>
          {showPlaceholder && (
            <span
              contentEditable="false"
              className="top-0 left-0 absolute pointer-events-none select-none text-grays-300"
            >
              its your time to <span className="italic font-medium">waffle</span>
            </span>
          )} */}
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

            <button className="z-20 ml-auto bg-accent-900 px-8 m-2 rounded-2xl text-white font-semibold hover:bg-accent-800">
              Post
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CreatePost;
