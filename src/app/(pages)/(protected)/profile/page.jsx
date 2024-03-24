"use client"
import React from "react";
import QuickAccessHolder from "@/app/components/quick-access/QuickAccessHolder";
import Posts from "../components/Posts";
import { useSession } from "next-auth/react";

const ProfilePage = () => {
  const {data, session} = useSession();
  return (
    <>
      <main>
        <Posts endpoint="/api/posts/profile" userid={data?.user?._id}></Posts>
      </main>
      <QuickAccessHolder></QuickAccessHolder>
    </>
  );
};

export default ProfilePage;
