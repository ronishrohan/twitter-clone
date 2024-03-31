"use client";
import { createContext, useState } from "react";

import Modal from "../components/modal/Modal";
export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
    
  const [enabled, setEnabled] = useState(false);
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null)
  function open(newContent, image) {
    setContent(newContent);
    setImage(image)
    setEnabled(true);
  }
  function close(){
    setImage(null)
    setEnabled(false)
    setContent("")
  }
  return (
    <ModalContext.Provider value={{ open }}>
      <Modal
        enabled={enabled}
        close={close}
        content={content}
        image={image}
        
      ></Modal>
      {children}
    </ModalContext.Provider>
  );
};
