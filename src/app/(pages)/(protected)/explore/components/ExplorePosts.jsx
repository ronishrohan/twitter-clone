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
  useEffect(() => {
    startGetPosts(async () => {
      const res = await axios.post("/api/posts/getimages", { page: page });
      setPosts((prev) => [...prev, ...res.data.posts]);
    });
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
      <div className="h-fit w-full grid grid-cols-2 gap-4 p-4">
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
          </>
        ) : (
          <>
          <div className="overflow-hidden w-full h-72 sm:h-96 rounded-2xl" ><div className="size-full bg-loading animate-loading" ></div></div>
          <div className="overflow-hidden w-full h-72 sm:h-96 rounded-2xl" ><div className="size-full bg-loading animate-loading" ></div></div>
          <div className="overflow-hidden w-full h-72 sm:h-96 rounded-2xl" ><div className="size-full bg-loading animate-loading" ></div></div>
          <div className="overflow-hidden w-full h-72 sm:h-96 rounded-2xl" ><div className="size-full bg-loading animate-loading" ></div></div>
          </>
        )}
      </div>
      <div className="w-full h-16 sm:hidden"></div>
    </>
  );
};

export default ExplorePosts;
