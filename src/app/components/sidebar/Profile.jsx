"use client";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import Image from "next/image";
import { icons } from "@/app/util/icons";

function Logout() {
  return (
    <>
      <div className="absolute overflow-hidden -top-20 left-0 h-20 w-full">
        <motion.div
          initial={{ y: "100%", opacity: 1 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{y: "100%", opacity: 1}}
          transition={{ type: "spring", damping: 40, stiffness: 400 }}
          className="w-full bg-background border-t  h-full border-grays-200 flex items-center justify-center"
        >
          <button className="text-lg size-full hover:bg-heart_pink-100">Logout</button>
        </motion.div>
      </div>
    </>
  );
}

function Profile() {
  const [enabled, setEnabled] = useState(false);
  return (
    <button
    onBlur = {() => setEnabled(false)}
      onClick={() => setEnabled(prev => !prev)}
      className="z-20 bg-black relative h-[75px] w-full p-4 flex items-center border-t border-transparent transition-all hover:border-grays-200 hover:bg-grays-100"
    >
      <AnimatePresence>{enabled && <Logout></Logout>}</AnimatePresence>
      <img
        src="https://pbs.twimg.com/profile_images/1487114760826986498/9DiToHc0_normal.jpg"
        className="h-full rounded-full"
        alt="your profile picture"
      />
      <div className="hidden z-20 lg:flex flex-col ml-4 text-lg h-full justify-between items-start leading-3">
        <span className="font-bold">Ronish Rohan</span>
        <span className="font-semibold text-text-400 text-base ">
          @ronishrohan
        </span>
      </div>
      <span className="ml-auto text-lg hidden lg:block">{icons.ellipsis}</span>
    </button>
  );
}

export default Profile;
