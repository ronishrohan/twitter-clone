"use client";
import React, { useEffect, useState, useTransition } from "react";
import ExplorePost from "./ExplorePost";
import useRevalidate from "@/app/hooks/useRevalidate";
import axios from "axios";

const ExplorePosts = () => {
  const [posts, setPosts] = useState([]);
  const [postsLoading, startGetPosts] = useTransition();
  const { postsRevalidation } = useRevalidate();
  const [canGet, setCanGet] = useState(true);
  const [page, setPage] = useState(0);
  const [stop, setStop] = useState(false);
  useEffect(() => {
    if (stop == false) {
      startGetPosts(async () => {
        const res = await axios.post("/api/posts/getimages", { page: page });
        if (res.data.posts.length == 0) {
          setStop(true);
        }
        setPosts((prev) => [...prev, ...res.data.posts]);
      });
    }
  }, [postsRevalidation, page]);
  useEffect(() => {
    function handleUpdate() {
      if (
        document.body.scrollHeight * 0.9 <
          window.scrollY + window.innerHeight &&
        canGet == true
      ) {
        setPage((prev) => prev + 1);
        setCanGet(false);
        return;
      }
    }
    window.addEventListener("scroll", handleUpdate);
    return () => window.removeEventListener("scroll", handleUpdate);
  }, [canGet]);
  useEffect(() => {
    if (canGet === false) {
      setTimeout(() => {
        setCanGet(true);
      }, 500);
    }
  }, [canGet]);
  return (
    <>
      <div className="h-fit w-full grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 p-4">
        {posts.length > 0 || !postsLoading ? (
          <>
            {posts.map((post, index) => {
              return (
                <ExplorePost
                  key={index + post.image}
                  image={post.image}
                  id={post._id}
                  user={post.createdBy}
                  details={post}
                ></ExplorePost>
              );
            })}
            {stop == false && (
              <div className="overflow-hidden w-full h-72 sm:h-96 rounded-2xl">
                <div className="size-full bg-loading animate-loading"></div>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="overflow-hidden w-full h-72 sm:h-96 rounded-2xl">
              <div className="size-full bg-loading animate-loading"></div>
            </div>
            <div className="overflow-hidden w-full h-72 sm:h-96 rounded-2xl">
              <div className="size-full bg-loading animate-loading"></div>
            </div>
            <div className="overflow-hidden w-full h-72 sm:h-96 rounded-2xl">
              <div className="size-full bg-loading animate-loading"></div>
            </div>
            <div className="overflow-hidden w-full h-72 sm:h-96 rounded-2xl">
              <div className="size-full bg-loading animate-loading"></div>
            </div>
          </>
        )}
      </div>
      <div className="w-full h-16 sm:hidden"></div>
    </>
  );
};

export default ExplorePosts;
