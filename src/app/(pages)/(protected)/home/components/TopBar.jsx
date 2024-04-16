"use client";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


function Button({ active, children, ...others }) {
  return (
    <button
      {...others}
      className={`relative w-1/2 overflow-hidden flex justify-center items-center transition-all  ${
        active
          ? "font-bold"
          : "font-semibold hover:bg-[rgba(255,255,255,0.08)] text-text-500"
      }`}
    >
      <span className="z-10">{children}</span>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ y: "120%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "120%", opacity: 0 }}
            transition={{ type: "tween", duration: 0.6 }}
            className="absolute -bottom-full blur-3xl  w-1/2 h-16 bg-accent-900"
          ></motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}

function TopBar({mode}) {
  const router = useRouter();
  return (
    <div className="sticky top-0 w-full border-b z-40 border-grays-200 bg-[rgba(0,0,0,0.9)] backdrop-blur-md h-16 flex text-text-900">
      <Button onClick={() => router.push("/home?m=0")} active={mode === "0"}>
        For You
      </Button>
      <Button onClick={() => router.push("/home?m=1")} active={mode === "1"}>
        Following
      </Button>
    </div>
  );
}

export default TopBar;
