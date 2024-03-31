"use client";
import axios from "axios";
import React, { useEffect, useState, useTransition } from "react";
import Post from "../../components/Post";
import QuickAccessHolder from "@/app/components/quick-access/QuickAccessHolder";
import Link from "next/link";
import { icons } from "@/app/utils/icons";
import useRevalidate from "@/app/hooks/useRevalidate";
import Comments from "./components/Comments";


const PostPage = ({ params }) => {
  const [pending, startTransition] = useTransition();
  const [post, setPost] = useState(null);
  const {postsRevalidation} = useRevalidate();
  
  
  useEffect(() => {
    startTransition(async () => {
      const res = await axios.post("/api/posts/getpost", { id: params.id });
      setPost(res.data.post);
      
    });
  }, []);
  return (
    <>
      <main className="size-full h-fit overflow-x-clip">
        <section className="h-full">
          <Link
            href="/home"
            className="sticky top-0 h-14 border-b border-grays-200 flex items-center p-4 gap-4 backdrop-blur-md bg-[rgba(0,0,0,0.9)] hover:bg-accent-200 transition-colors z-50"
          >
            <div>{icons.arrow}</div>
            <div className="text-xl">Back to home</div>
          </Link>
          {post && (
            <Post
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
            ></Post>
          )}
          <div className="h-14 border-b border-grays-200 p-4 text-xl items-center leading-4">
            Comments
          </div>
          <Comments key={postsRevalidation} id={params.id} ></Comments>
        </section>
      </main>
      <QuickAccessHolder></QuickAccessHolder>
    </>
  );
};

export default PostPage;
