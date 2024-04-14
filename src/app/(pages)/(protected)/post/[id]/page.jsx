"use client";
import axios from "axios";
import React, { useEffect, useState, useTransition } from "react";
import Post from "../../components/Post";
import QuickAccessHolder from "@/app/components/quick-access/QuickAccessHolder";
import Link from "next/link";
import { icons } from "@/app/utils/icons";
import useRevalidate from "@/app/hooks/useRevalidate";
import Comments from "./components/Comments";
import { useRouter } from "next/navigation";
import { QuickAccessCard } from "@/app/components/quick-access/QuickAccess";
import Image from "next/image";

const PostPage = ({ params }) => {
  const [pending, startTransition] = useTransition();
  const [post, setPost] = useState(null);
  const { postsRevalidation } = useRevalidate();
  const [user, setUser] = useState(null);
  const router = useRouter();
  function handleNavigateBack() {
    router.back();
  }
  useEffect(() => {
    startTransition(async () => {
      const res = await axios.post("/api/posts/getpost", { id: params.id });
      const userRes = await axios.post("/api/users/details", {
        id: res.data.post.repost
          ? res.data.post.repost.createdBy
          : res.data.post.createdBy,
      });
      setPost(res.data.post);
      setUser(userRes.data.user);
    });
  }, []);
  return (
    <>
      <main className="size-full h-fit overflow-x-clip">
        <section className="h-full">
          <div
            onClick={handleNavigateBack}
            className="sticky top-0 h-16 border-b cursor-pointer border-grays-200 flex items-center p-4 gap-4 backdrop-blur-md bg-[rgba(0,0,0,0.9)] hover:bg-[rgb(8,8,8)] transition-colors z-50"
          >
            <div>{icons.arrow}</div>
            <div className="text-xl">Go Back</div>
          </div>
          {!post && (
            <div className="w-full h-48 p-4">
              <div className="rounded-2xl overflow-hidden size-full">
                <div className="size-full animate-loading bg-loading"></div>
              </div>
            </div>
          )}
          {post && (
            <Post
              disabled={true}
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
              {post.repost ? post.repost.content : post.content}
            </Post>
          )}
          <div className="h-14 border-b border-grays-200 p-4 text-xl items-center leading-4">
            Comments
          </div>
          <Comments key={postsRevalidation} id={params.id}></Comments>
        </section>
      </main>
      <QuickAccessHolder>
        <QuickAccessCard >
          
          {user ? (
            <Link href={`/user/${user.username}`} className=" w-full flex h-16 gap-2">
              <Image
                width={100}
                height={100}
                src={user.avatar}
                className="rounded-full size-16"
              ></Image>
              <div className="h-full flex flex-col leading-5 text-xl font-medium text-text-900">
                <div>{user.fullName}</div>
                <div className="text-grays-300">@{user.username}</div>
              </div>
            </Link>
          ) : (
            <>
              <div className="h-16 w-full flex gap-2">
                <div className="size-16 rounded-full overflow-hidden">
                  <div className="size-full bg-loading animate-loading"></div>
                </div>
                <div className="h-full flex flex-col gap-2">
                  <div className="w-32 h-4 overflow-hidden rounded-lg">
                    <div className="size-full bg-loading animate-loading"></div>
                  </div>
                  <div className="w-44 h-4 overflow-hidden rounded-lg">
                    <div className="size-full bg-loading animate-loading"></div>
                  </div>
                </div>
              </div>
            </>
          )}
        </QuickAccessCard>
      </QuickAccessHolder>
    </>
  );
};

export default PostPage;
