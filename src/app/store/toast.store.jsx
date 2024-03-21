import { createContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [text, setText] = useState(null);
  const [enabled, setEnabled] = useState(false);
  function notify(text) {
    setEnabled(true);
    setText(text);
    setTimeout(() => {
      setEnabled(false);
      setText(null);
    }, 3000);
    console.log("this is supposed to be a notification");
  }
  return (
    <ToastContext.Provider value={{ notify }}>
      <AnimatePresence mode="sync">
        {enabled && (
          <motion.div
            initial={{  opacity: 0, padding: 0 }}
            animate={{  opacity: 1, padding: 20 }}
            exit={{ opacity: 0}}
            transition={{damping: 20, type:"spring"}}
            className="overflow-hidden bg-black border rounded-xl border-heart_pink-200 min-w-48  m-2 fixed z-50 bottom-0 right-0"
          >
            <div className="absolute -z-10 bg-heart_pink-200 w-1/2 aspect-square blur-2xl opacity-50"></div>
            <span className="z-50">{text}</span>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </ToastContext.Provider>
  );
}
