import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Markdown from "react-markdown";

const isValidUrl = (urlString) => {
  var urlPattern = new RegExp(
    "^(https?:\\/\\/)?" + // validate protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // validate fragment locator
  return !!urlPattern.test(urlString);
};

const Message = ({ self, children }) => {
  return (
    <AnimatePresence>
      <div
        className={`w-full flex  ${
          self === true ? "justify-end" : "justify-start"
        }`}
      >
        <motion.div
          initial={{opacity:0}}
          animate={{ opacity: 1}}
          transition={{ type: "tween", ease: "circOut", duration: 0.1 }}
          className="p-2 bg-grays-100 max-w-44 whitespace-break-spaces text-wrap rounded-3xl break-all px-4 flex items-center justify-center"
        >
          {isValidUrl(children) ? (
            <a className="text-heart_pink-200 hover:underline flex flex-col" href={children}>
              <div>{children}</div>
              
            </a>
          ) : (
            <>
              <Markdown>{children}</Markdown>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default Message;
