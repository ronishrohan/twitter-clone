"use client"
import React from "react";
import QuickAccessHolder from "@/app/components/quick-access/QuickAccessHolder";

const UserLayout = ({ children }) => {
  return (
    <>
      <main className="size-full flex flex-col h-fit">{children}</main>
      <QuickAccessHolder></QuickAccessHolder>
    </>
  );
};

export default UserLayout;
