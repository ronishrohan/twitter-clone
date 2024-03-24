"use client";

import axios from "axios";
import React, {
  useEffect,
  useLayoutEffect,
  useState,
  useTransition,
} from "react";
import Post from "./Post";

function Posts() {
  const [chunks, setChunks] = useState([]);
  const [page, setPage] = useState(0);
  const [timer, setTimer] = useState(0);
  const [pending, startTransition] = useTransition();
  useEffect(() => {
    setTimeout(() => {
      setTimer((prev) => prev + 1);
      const scrollY = window.scrollY + window.innerHeight;
      const height = document.body.scrollHeight;

      if (scrollY / height > 0.9) {
        setPage((prev) => prev + 1);
      }
    }, 500);
  }, [timer]);
  useLayoutEffect(() => {
    function fetchPosts() {
      startTransition(async () => {
        
        const { data } = await axios.post("/api/posts/get", { page: page });
        setChunks((prev) => [...prev, data.posts]);
      });
    }

    fetchPosts();
  }, [page]);
  return (
    <>
      {chunks.length != 0 ? (
        chunks.map((posts) =>
          posts.map((post, index) => (
            <Post
              key={index}
              user={post.createdBy}
              details={{
                comments: post.comments,
                reposts: post.reposts,
                likes: post.reposts,
                created: post.createdAt,
              }}
            >
              {post.content}
            </Post>
          ))
        )
      ) : (
        <div className="w-full h-60 overflow-hidden p-4">
          <div className="size-full overflow-hidden  rounded-3xl">
            <div className="size-full bg-loading animate-loading"></div>
          </div>
        </div>
      )}
      {pending && (
        <div className="relative h-14 w-full flex items-center overflow-hidden mt-auto">
          <div className="z-50 m-4 w-full text-lg">
            Loading more posts please wait
          </div>
          <div className="size-full absolute bg-loading animate-loading"></div>
        </div>
      )}
    </>
  );
}

export default Posts;
