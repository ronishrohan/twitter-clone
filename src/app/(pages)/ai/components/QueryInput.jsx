"use client";
import { useRef, useState } from "react";
import React from "react";
import { motion } from "framer-motion";

const gemini = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <path d="M86.67,50c0,.25-.18,.46-.43,.49-28.21,4.19-31.55,7.54-35.74,35.74-.04,.24-.25,.43-.49,.43s-.46-.18-.49-.43c-4.19-28.21-7.54-31.55-35.74-35.74-.24-.04-.43-.25-.43-.49s.18-.46,.43-.49c28.21-4.19,31.55-7.54,35.74-35.74,.04-.24,.25-.43,.49-.43s.46,.18,.49,.43c4.19,28.21,7.54,31.55,35.74,35.74,.24,.04,.43,.25,.43,.49Z" />
  </svg>
);

const variants = {
  open: {
    opacity: 1,
  },
  done: {
    bottom: 0,
  },
};

function QueryInput({ handleSubmit, done, pending }) {
  const [placeholder, setPlaceholder] = useState(true);
  const query = useRef();
  function handleClick() {
    if (
      query.current.textContent &&
      query.current.textContent.trim() != "" &&
      query.current.textContent.length > 1
    ) {
      handleSubmit(query.current.textContent);
    }
  }
  return (
    <motion.div
      variants={variants}
      initial="open"
      animate={done && "done"}
      className={`absolute flex flex-col w-full px-10 overflow-hidden justify-center pb-10 bg-[rgba(0,0,0,0.5)] ${
        done && "backdrop-blur-lg "
      }`}
    >
      {done && <div className="absolute size-20 w-1/2 opacity-10 -z-10 right-0 scale-150 bg-heart_pink-200 blur-3xl" ></div>}
      {!done && <span className="text-xl">Enter a topic to write about</span>}
      <div className="flex gap-2 h-full pt-4">
        <div
          onClick={() => query.current.focus()}
          onBlur={() => query.current.blur()}
          type="text"
          placeholder="Example: Write a post about dogs"
          className="overflow-hidden relative cursor-text flex items-center resize-none w-full p-4 bg-grays-100 rounded-2xl outline-none focus-within:bg-background focus-within:border-heart_pink-200 border border-transparent"
        >
          {placeholder && (
            <span
              contentEditable="false"
              suppressContentEditableWarning
              className="absolute text-grays-400 pointer-events-none select-none"
            >
              Example: Write a post about dogs
            </span>
          )}
          <div
            ref={query}
            contentEditable
            spellCheck="false"
            onInput={() => {
              if (query.current.textContent.length > 0) {
                setPlaceholder(false);
              } else {
                setPlaceholder(true);
              }
            }}
            className="outline-none overflow-hidden whitespace-nowrap w-full text-wrap"
          ></div>
        </div>
        <button
          disabled={pending}
          onClick={handleClick}
          title="generate post"
          className="[&_svg]:h-8 shrink-0 mt-auto h-14 disabled:fill-grays-300 disabled:bg-grays-100 [&_svg]:disabled:animate-pulse  hover:bg-heart_pink-200 hover:fill-grays-100 transition-all  aspect-square fill-heart_pink-200 flex items-center justify-center bg-grays-100 rounded-full"
        >
          {gemini}
        </button>
      </div>
    </motion.div>
  );
}

export default QueryInput;
