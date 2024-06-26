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
import { useSession } from "next-auth/react";
import BackToTop from "./BackToTop";

function Posts({ infinite, endpoint, userid,following }) {
  const [chunks, setChunks] = useState([]);
  const [page, setPage] = useState(0);
  const [timer, setTimer] = useState(0);
  const [pending, startTransition] = useTransition();
  const [finished, setFinished] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const session = useSession();

  useEffect(() => {
    if (isFetching === true) {
      if (infinite === true) {
        const timeout = setTimeout(() => {
          setTimer((prev) => prev + 1);
          const scrollY = window.scrollY + window.innerHeight;
          const height = document.body.scrollHeight;

          if (scrollY / height > 0.9) {
            setPage((prev) => prev + 1);
          }
        }, 500);
        return () => clearTimeout(timeout);
      }
    }
  }, [timer, isFetching]);
  useEffect(() => {
    function fetchPosts() {
      startTransition(async () => {
        const { data } = await axios.post(endpoint, { page: page, id: userid, following: following });
        setIsFetching(true);
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
      {chunks.length != 0 && session.status == "authenticated" ? (
        chunks.map((posts) =>
          posts.map((post, index) => (
            <Post
              disabled={false}
              key={index}
              user={post.createdBy}
              details={{
                comments: post.comments,
                reposts: post.reposts,
                likes: post.likes,
                likedBy: post.likedBy,
                createdAt: post.createdAt,
                id: post._id,
                image: post.image,
                repost: post.repost,
                repostedBy: post.repostedBy,
                replyingTo: post.replyingTo,
              }}
            >
              {post.content}
            </Post>
          ))
        )
      ) : (
        <div className="w-full overflow-hidden p-4 flex gap-2">
          <div className="shrink-0 size-10 rounded-full overflow-hidden">
            <div className="animate-loading bg-loading size-full"></div>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <div className="flex gap-2">
              <div className="h-6 w-44 overflow-hidden rounded-xl">
                <div className="animate-loading bg-loading size-full"></div>
              </div>
              <div className="h-6 w-16 overflow-hidden rounded-xl">
                <div className="animate-loading bg-loading size-full"></div>
              </div>
            </div>
            <div className="h-6 w-64 overflow-hidden rounded-xl">
              <div className="animate-loading bg-loading size-full"></div>
            </div>
            <div className="h-72 w-full overflow-hidden rounded-xl">
              <div className="animate-loading bg-loading size-full"></div>
            </div>
          </div>
        </div>
      )}
      {pending && chunks.length >= 1 && (
        <div className="relative h-14 w-full flex items-center overflow-hidden mt-auto">
          <div className="z-40 m-4 w-full text-lg">
            Loading more posts please wait
          </div>
          <div className="size-full absolute bg-loading animate-loading"></div>
        </div>
      )}
      {finished && (
        <>
          {chunks[0].length == 0 ? (
            <div className="h-28 w-full flex items-center justify-center text-grays-900">
              Nothing to see here
            </div>
          ) : (
            <>
              <BackToTop></BackToTop>
            </>
          )}
        </>
      )}
    </>
  );
}

export default Posts;
