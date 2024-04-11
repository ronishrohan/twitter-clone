"use client";
import TopBar from "./components/TopBar";
import CreatePost from "./components/CreatePost";
import Posts from "../components/Posts";
import { QuickAccessCard } from "@/app/components/quick-access/QuickAccess";
import QuickAccessHolder from "@/app/components/quick-access/QuickAccessHolder";
import { useState } from "react";
import useRevalidate from "@/app/hooks/useRevalidate";
import Link from "next/link"

function PostPage() {
  const { postsRevalidation } = useRevalidate();
  function revalidate() {
    setKey(Math.random() * 1000);
  }
  return (
    <>
      <main className="size-full h-fit overflow-x-clip">
        <section className=" h-full">
          <TopBar></TopBar>
          <CreatePost></CreatePost>
          <Posts
            infinite={true}
            key={postsRevalidation}
            endpoint="/api/posts/get"
            userid=""
          ></Posts>
        </section>
      </main>
      <QuickAccessHolder>
        <QuickAccessCard>
          <div className="absolute bg-accent-800 blur-2xl opacity-20 size-1/2 z-10"></div>
          <div className="flex flex-col gap-2 z-20">
            <div className="text-2xl font-medium">Home</div>
            <div className="text-lg font-normal">
              This is the home page, you will see the latest posts here.
            </div>
          </div>
        </QuickAccessCard>
        <QuickAccessCard>
          <div className="absolute bg-heart_pink-200 right-9 blur-2xl opacity-20 size-1/2 z-10"></div>
          <div className="flex flex-col gap-2 z-20">
            <div className="text-lg font-normal">
              Go to <Link className="text-heart_pink-200 hover:underline" href="/generate">the generate page</Link> if you want to generate posts
            </div>
          </div>
        </QuickAccessCard>
      </QuickAccessHolder>
    </>
  );
}

export default PostPage;
