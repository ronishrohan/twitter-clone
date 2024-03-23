"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import Post from "./Post";

function Posts() {
  const [chunks, setChunks] = useState([]);
  const [page, setPage] = useState(0);
  const [debounce, setDebounce] = useState(false);
  useEffect(() => {
    async function fetchPosts() {
      const { data } = await axios.post("/api/posts/get", { page: page });
      setChunks((prev) => [...prev, data.posts]);
    }
    fetchPosts();
  }, [page]);
  useEffect(() => {
    if(debounce==true){
        setTimeout(() => {
            setDebounce(false);
        }, 10000);
    }
  }, [debounce])
  useEffect(() => {
    function handleScroll() {
      const scrollY = window.scrollY + window.innerHeight;
      const height = document.body.scrollHeight;
      console.log(scrollY, height);
      if (scrollY / height > 0.9) {
        if (debounce==false) {
          setPage((prev) => prev + 1);
          setDebounce(true);
        }
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      {chunks &&
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
        )}
    </>
  );
}

export default Posts;
