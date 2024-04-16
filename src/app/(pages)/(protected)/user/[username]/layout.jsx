"use client";
import React from "react";
import QuickAccessHolder from "@/app/components/quick-access/QuickAccessHolder";
import { QuickAccessCard } from "@/app/components/quick-access/QuickAccess";

const UserLayout = ({ children }) => {
  return (
    <>
      <main className="size-full flex flex-col h-fit">{children}</main>
      <QuickAccessHolder>
        <QuickAccessCard>
          
        </QuickAccessCard>
      </QuickAccessHolder>
    </>
  );
};

export default UserLayout;
