"use client";
import React from "react";
import Image from "next/image";

const MessagesList = () => {
  return (
    <div className="w-16 h-full lg:w-[400px] shrink-0 transition-all   border-l border-grays-200 flex flex-col">
      <div className="sticky top-0 border-b border-grays-200 p-4 text-2xl bg-[rgba(0,0,0,0.8)] backdrop-blur-lg z-40">
        Messages
      </div>
      <div className="flex flex-col">
        <button className="hover:bg-grays-100 transition-colors  p-4 flex text-left gap-2">
          <Image
            width={50}
            height={50}
            className="h-full aspect-square rounded-full overflow-hidden"
            src="https://res.cloudinary.com/dnj2vwwvg/image/upload/v1712383521/sample.jpg"
          ></Image>
          <div className="hidden lg:flex  flex-col justify-evenly h-full" >
            <div className="flex gap-1 " >
                <span className="text-lg leading-4" >Ronish Rohan</span>
                <span className="text-lg leading-4 text-text-400">@ronishrohan</span>
            </div>
            <div className="text-lg leading-6 text-text-900 opacity-75 font-normal" >what up cuh</div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default MessagesList;
