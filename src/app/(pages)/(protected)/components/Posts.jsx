"use client";

import axios from "axios";
import React, {
  useEffect,
  useLayoutEffect,
  useState,
  useTransition,
} from "react";
import Post from "./Post";
import { icons } from "@/app/utils/icons";

function Posts({ endpoint, userid }) {
  const [chunks, setChunks] = useState([]);
  const [page, setPage] = useState(0);
  const [timer, setTimer] = useState(0);
  const [pending, startTransition] = useTransition();
  const [finished, setFinished] = useState(false);
  function scrollToTop(){
    window.scrollTo({top: 0, behavior: "smooth"})
  }
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
  useEffect(() => {
    function fetchPosts() {
      startTransition(async () => {
        const { data } = await axios.post(endpoint, { page: page, id: userid });
        if (data.posts.length == 0) {
          setFinished(true);
        }
        setChunks((prev) => [...prev, data.posts]);
      });
    }

    if (finished == false) {
      fetchPosts();
    }
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
      {pending && chunks.length >= 1 && (
        <div className="relative h-14 w-full flex items-center overflow-hidden mt-auto">
          <div className="z-50 m-4 w-full text-lg">
            Loading more posts please wait
          </div>
          <div className="size-full absolute bg-loading animate-loading"></div>
        </div>
      )}
      {finished && (
        <>
          <div className="h-16 p-4 flex justify-between">
            <span>Thats all posts for now</span>
            <button onClick={scrollToTop} className="h-full aspect-square rounded-lg hover:bg-grays-100 transition-colors">
              <div className="rotate-90" >{icons.arrow}</div>
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default Posts;
