
import React from "react";
import QuickAccessHolder from "@/app/components/quick-access/QuickAccessHolder";
import SidebarHolder from "@/app/components/sidebar/SidebarHolder";
import { getServerSession } from "next-auth";
import {redirect} from "next/navigation"

async function ProtectedPages({ children }) {
  const session = await getServerSession();
  if(!session){
    redirect("/login")
  }
  return (
    <>
      <SidebarHolder></SidebarHolder>
      {children}
    </>
  );
}

export default ProtectedPages;
