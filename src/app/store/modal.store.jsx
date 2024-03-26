"use client";
import { createContext, useState } from "react";

import Modal from "../components/modal/Modal";
export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
    
  const [enabled, setEnabled] = useState(false);
  const [content, setContent] = useState("");
  function open(newContent, callback) {
    setContent(newContent);
    setEnabled(true);
  }
  return (
    <ModalContext.Provider value={{ open }}>
      <Modal
        enabled={enabled}
        close={() => setEnabled(false)}
        content={content}
        
      ></Modal>
      {children}
    </ModalContext.Provider>
  );
};
