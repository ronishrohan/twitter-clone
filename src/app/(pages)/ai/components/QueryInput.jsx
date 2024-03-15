"use client";
import { useRef, useState } from "react";
import React from "react";

const gemini = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <path d="M86.67,50c0,.25-.18,.46-.43,.49-28.21,4.19-31.55,7.54-35.74,35.74-.04,.24-.25,.43-.49,.43s-.46-.18-.49-.43c-4.19-28.21-7.54-31.55-35.74-35.74-.24-.04-.43-.25-.43-.49s.18-.46,.43-.49c28.21-4.19,31.55-7.54,35.74-35.74,.04-.24,.25-.43,.49-.43s.46,.18,.49,.43c4.19,28.21,7.54,31.55,35.74,35.74,.24,.04,.43,.25,.43,.49Z" />
  </svg>
);

function QueryInput() {
  const [placeholder, setPlaceholder] = useState(true);
  const query = useRef();
  return (
    <div className="flex flex-col w-full px-10 overflow-hidden h-full justify-center gap-2">
      <span className="text-xl">Give it a topic to write about</span>
      <div className="flex gap-2">
        <div
          onClick={() => query.current.focus()}
          onBlur={() => query.current.blur()}
          type="text"
          placeholder="Example: Write a post about dogs"
          className="overflow-hidden relative flex items-center resize-none w-full p-4 bg-grays-100 rounded-2xl outline-none focus:bg-background focus:border-heart_pink-200 border border-transparent"
        >
          {placeholder && (
            <span
              contentEditable="false"
              className="absolute text-grays-400 pointer-events-none select-none"
            >
              Example: Write a post about dogs
            </span>
          )}
          <span
            ref={query}
            contentEditable
            onInput={() => {
              if (query.current.textContent.length > 0) {
                setPlaceholder(false);
              } else {
                setPlaceholder(true);
              }
            }}
            className="outline-none overflow-hidden whitespace-nowrap w-full text-wrap"
          ></span>
        </div>
        <button title="generate post" className="[&_svg]:h-8 max-h-14 mt-auto hover:bg-heart_pink-200 hover:fill-grays-100 transition-all h-full aspect-square fill-heart_pink-200 flex items-center justify-center bg-grays-100 rounded-full">
          {gemini}
        </button>
      </div>
    </div>
  );
}

export default QueryInput;
