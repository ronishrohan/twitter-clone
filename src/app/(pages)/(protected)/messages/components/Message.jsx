import React from "react";
import { motion } from "framer-motion";

const Message = ({ self, children }) => {
  return (
    <div
      className={`w-full flex  ${
        self === true ? "justify-end" : "justify-start"
      }`}
    >
      <motion.div
        initial={{ x: self ? "100%" : "-100%" }}
        animate={{ x: "0%" }}
        transition={{type:"tween", ease: "circOut", duration: 0.2}}
        className="p-2 bg-grays-100 max-w-44 whitespace-break-spaces text-wrap rounded-3xl break-all px-4 flex items-center justify-center"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Message;
