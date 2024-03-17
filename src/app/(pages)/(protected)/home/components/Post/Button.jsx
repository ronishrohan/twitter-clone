"use client"
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Button({ icon, filled, hover, active, amount, ...others }) {
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
        className={`flex hover:bg-grays-100 gap-2 w-full items-center p-2 rounded-lg ${hover} ${
          enabled ? active : "text-gray-400"
        }`}
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
