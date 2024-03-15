import React from "react";
import QueryInput from "./components/QueryInput";

const gemini = (
  <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 100 125" x="0px" y="0px">
    <path d="M86.67,50c0,.25-.18,.46-.43,.49-28.21,4.19-31.55,7.54-35.74,35.74-.04,.24-.25,.43-.49,.43s-.46-.18-.49-.43c-4.19-28.21-7.54-31.55-35.74-35.74-.24-.04-.43-.25-.43-.49s.18-.46,.43-.49c28.21-4.19,31.55-7.54,35.74-35.74,.04-.24,.25-.43,.49-.43s.46,.18,.49,.43c4.19,28.21,7.54,31.55,35.74,35.74,.24,.04,.43,.25,.43,.49Z" />
  </svg>
);

const AiPage = () => {
  return (
    <main className="size-full flex flex-col items-center overflow-clip">
      <div className="relative h-14 w-full border-b border-grays-200 overflow-hidden flex items-center p-4">
        <div className="absolute z-10 bg-accent-900 size-8 w-1/2 blur-3xl opacity-85"></div>
        <span className="text-2xl font-medium z-20 gap-2 flex">
          Let{" "}
          <span className="font-bold text-heart_pink-200 flex items-center">
            <span>AI</span>
            <span className="h-4 fill-heart_pink-200 [&_svg]:h-6 ">{gemini}</span>
          </span>{" "}
          write posts for you
        </span>
      </div>
      <QueryInput></QueryInput>
    </main>
  );
};

export default AiPage;
