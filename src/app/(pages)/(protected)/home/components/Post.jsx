"use client";
import { icons } from "@/app/util/icons";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Markdown from "react-markdown";

function Button({ icon, filled, hover,active, amount, ...others }) {
  const [enabled, setEnabled] = useState(false);
  return (
    <>
      <button
        {...others}
        onClick={() => {
          if (filled) {
            setEnabled((prev) => !prev);
          }
        }}
        className={`flex hover:bg-grays-100 gap-2 w-full items-center p-2 rounded-lg ${hover} ${enabled && active}`}
      >
        <AnimatePresence>
          {enabled ? (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 20,
                bounce: 20,
              }}
              
            >
              {filled}
            </motion.span>
          ) : (
            <span>{icon}</span>
          )}
        </AnimatePresence>
        <span>{amount}</span>
      </button>
    </>
  );
}

function Post({children}) {
  return (
    <div className="border-b border-grays-200  flex w-full p-4 pb-2 gap-2 font-overused shrink-0">
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
          <Markdown>{children.toString()}</Markdown>
        </div>
        <section>
          <div className="w-full flex mt-auto h-12">
            <Button
              icon={icons.comments}
              amount={24}
              hover="hover:text-accent-900 hover:bg-accent-200"
              title="comments"
            ></Button>
            <Button
              icon={icons.retweet}
              amount={5}
              hover="hover:text-green_hover-200 hover:bg-green_hover-100"
              title="repost"
            ></Button>
            <Button
              icon={icons.heart}
              filled={icons.heart_filled}
              amount={55}
              active="text-heart_pink-200"
              hover="hover:text-heart_pink-200 hover:bg-heart_pink-100"
              title="like"
            ></Button>
            <button className="flex items-center justify-center h-full aspect-square shrink-0 hover:text-accent-900 hover:bg-accent-200 rounded-lg">
              <span>{icons.bookmark}</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Post;
