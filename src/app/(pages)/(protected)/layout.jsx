
import React from "react";
import QuickAccessHolder from "@/app/components/quick-access/QuickAccessHolder";
import SidebarHolder from "@/app/components/sidebar/SidebarHolder";
import { getServerSession } from "next-auth";
import {redirect} from "next/navigation"

async function ProtectedPages({ children }) {
  const session = await getServerSession();
  console.log(session)
  if(!session){
    redirect("/login")
  }
  return (
    <>
      <SidebarHolder></SidebarHolder>
      {children}
      <QuickAccessHolder></QuickAccessHolder>
    </>
  );
}

export default ProtectedPages;
