"use client";
import React from "react";
import { ToastProvider } from "@/app/store/toast.store";
import { ModalProvider } from "@/app/store/modal.store";

const Providers = ({ children }) => {
  return (
    <ToastProvider>
      <ModalProvider>{children}</ModalProvider>
    </ToastProvider>
  );
};

export default Providers;
