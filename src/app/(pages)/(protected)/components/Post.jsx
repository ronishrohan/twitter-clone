"use client";
import { icons } from "@/app/utils/icons";
import React, { useEffect, useState, useTransition } from "react";
import { Button } from "../home/components/Post/Button";
import { formatDateTime } from "@/app/helpers/format.helper";
import Content from "../home/components/Post/Content";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import axios from "axios";
import useToast from "@/app/hooks/useToast";
import { motion } from "framer-motion";
import { createPostAction } from "@/app/mongodb/actions/post.actions";
import useRevalidate from "@/app/hooks/useRevalidate";
import useModal from "@/app/hooks/useModal";
import Markdown from "react-markdown";
import { useRouter } from "next/navigation";

const replyHandle = (
  <svg
    width={51}
    height={117}
    viewBox="0 0 51 117"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M50.5 0.5H25C11.7452 0.5 1 11.2452 1 24.5V58.5V116.5"
      stroke="white"
    />
  </svg>
);

function Post({ user, children, details, disabled }) {
  const router = useRouter();
  const { data, status } = useSession();
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [reposted, setReposted] = useState(false);
  const [pending, startTransition] = useTransition();
  const [repostPending, startRepost] = useTransition();
  const { revalidatePosts } = useRevalidate();
  const { notify } = useToast();
  const { open } = useModal();

  useEffect(() => {
    if (status == "authenticated") {
      if (data.user.savedPosts.includes(details.id)) {
        setSaved(true);
      }
      if (
        (details.repostedBy && details.repostedBy.includes(data.user._id)) ||
        (details.repost?.repostedBy &&
          details.repost?.repostedBy.includes(data.user._id))
      ) {
        setReposted(true);
      }
    }
  }, [status]);
  useEffect(() => {
    if (status === "authenticated") {
      if (details.repost) {
        if (details?.repost?.likedBy?.includes(data.user._id)) {
          setLiked(true);
        }
      } else {
        if (details?.likedBy?.includes(data.user._id)) {
          setLiked(true);
        }
      }
    }
  }, [status]);
  async function handleSave(e) {
    e.stopPropagation();
    startTransition(async () => {
      if (saved === false) {
        const res = await axios.post("/api/users/update/save", {
          id: data.user._id,
          postId: details.id,
        });
        setSaved(true);
        notify("Saved post successfully");
      } else {
        const res = await axios.post("/api/users/update/unsave", {
          id: data.user._id,
          postId: details.id,
        });
        setSaved(false);
      }
    });
  }
  async function handleRepost(e) {
    e.stopPropagation();
    startRepost(async () => {
      await createPostAction(
        children,
        details.image,
        details.repost ? details.repost._id : details.id
      );
      const res = await axios.post("/api/posts/update/repost", {
        id: details.repost ? details.repost._id : details.id,
        userId: data.user._id,
      });
      console.log(res.data);
      notify("Post reposted successfully");
      revalidatePosts();
    });
  }
  async function handleComment(e) {
    e.stopPropagation();
    open("", null, {
      username: details.repost
        ? details.repost.createdBy.username
        : user.username,
      image: details.repost ? details.repost.createdBy.avatar : user.avatar,
      id: details.id,
    });
  }
  async function handleRedirectToPost() {
    router.push(`/post/${details.repost ? details.repost._id : details.id}`);
  }
  return (
    <>
      {details.replyingTo && (
        <>
          <div className="border-b border-grays-200 flex flex-col h-fit w-full relative  overflow-hidden">
            <div className="border border-grays-200 h-full w-0 absolute z-10 ml-[32px] translate-y-1/2"></div>
            <div
              onClick={() => router.push(`/post/${details.replyingTo._id}`)}
              className="flex size-full overflow-hidden p-[16px] gap-2 hover:bg-[rgba(8,8,8)] cursor-pointer"
            >
              <Link href={`/user/${details.replyingTo.createdBy.username}`} className="z-30 size-fit"><Image
                width={32}
                height={32}
                className="size-[32px] rounded-full z-30"
                src={details.replyingTo.createdBy.avatar}
              ></Image></Link>
              <div className="flex flex-col justify-between gap-1 w-full h-fit">
                <Link href={`/user/${details.replyingTo.createdBy.username}`} className="flex text-lg leading-3 hover:underline  h-full text-text-900 font-medium">
                  <div>{details.replyingTo.createdBy.fullName}</div>
                  <div className="text-grays-300">
                    @{details.replyingTo.createdBy.username}
                  </div>
                </Link>
                <div className="whitespace-nowrap overflow-hidden text-ellipsis max-w-72 ">
                  {details.replyingTo.content}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <div
        onClick={handleRedirectToPost}
        className={`border-b border-grays-200  flex flex-col transition-colors duration-300 ${
          disabled === false && "hover:bg-[rgba(8,8,8)] cursor-pointer"
        }`}
      >
        {details.repost && (
          <div className=" ml-4 mt-2 text-grays-400 font-medium flex items-center gap-1">
            <div>{icons.retweet}</div>
            <div>reposted by </div>
            <Link
              onClick={(e) => e.stopPropagation()}
              href={`/user/${user.username}`}
              className="hover:underline text-accent-100 flex items-center gap-1"
            >
              <Image
                width={20}
                height={20}
                className="aspect-square rounded-full size-[20px] shrink-0"
                src={user.avatar}
              ></Image>
              @{user.username}
            </Link>
            <div className="opacity-75 ml-1">
              {formatDateTime(details.createdAt)}
            </div>
          </div>
        )}
        <div className="size-full flex gap-2 p-4 pb-2 shrink-0 ">
          {details.repost ? (
            <>
              <Link className="shrink-0 size-fit" href={`/user/${details.repost.createdBy.username}`}><Image
                alt="a post"
                className="rounded-full size-10 shrink-0"
                src={details.repost.createdBy?.avatar}
                width={48}
                height={48}
              ></Image></Link>
            </>
          ) : (
            <>
              <Link href={`/user/${user.username}`} className="size-10 overflow-visible shrink-0 size-fit"><Image
                alt="a post"
                className="rounded-full size-[40px] shrink-0"
                src={user?.avatar}
                width={48}
                height={48}
              ></Image></Link>
            </>
          )}
          <div className="flex flex-col w-full">
            <div className="flex text-lg  align-top gap-2">
              {details.repost ? (
                <>
                  <Link
                    onClick={(e) => e.stopPropagation()}
                    href={`/user/${details.repost.createdBy?.username}`}
                    className="flex gap-1 hover:underline"
                  >
                    <span className="leading-4 font-semibold">
                      {details.repost.createdBy?.fullName}
                    </span>
                    <span className="leading-4 font-medium text-grays-300">
                      @{details.repost.createdBy?.username}
                    </span>
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    onClick={(e) => e.stopPropagation()}
                    href={`/user/${user?.username}`}
                    className="flex gap-1 hover:underline"
                  >
                    <span className="leading-4 font-semibold">
                      {user?.fullName}
                    </span>
                    <span className="leading-4 font-medium text-grays-300">
                      @{user?.username}
                    </span>
                  </Link>
                </>
              )}
              <span className="leading-4 font-medium text-grays-300 opacity-75">
                {formatDateTime(
                  details.repost ? details.repost.createdAt : details.createdAt
                )}
              </span>
            </div>
            <Content key={children}>{children}</Content>
            {details.image && (
              <Link
                onClick={(e) => e.stopPropagation()}
                href={`/post/${details.id}`}
                className="w-full h-fit pr-4 flex justify-center mb-2"
              >
                <Image
                  className="rounded-2xl w-full bg-grays-100"
                  width={1000}
                  height={1000}
                  alt="post"
                  src={details.image}
                ></Image>
              </Link>
            )}
            <section>
              <div className="w-full flex mt-auto h-12 gap-2">
                <Button
                  id={details.id}
                  repost={details.repost && details.repost._id}
                  icon={icons.comments}
                  onClick={handleComment}
                  amount={
                    details.repost ? details.repost.comments : details.comments
                  }
                  e
                  hover="hover:text-accent-900 hover:bg-accent-200"
                  title="comments"
                ></Button>

                <Button
                  id={details.id}
                  repost={details.repost && details.repost._id}
                  loading={repostPending}
                  icon={icons.retweet}
                  isActive={reposted}
                  disabled={reposted}
                  active="text-green_hover-200"
                  amount={
                    details.repost ? details.repost.reposts : details.reposts
                  }
                  onClick={handleRepost}
                  hover="hover:text-green_hover-200 hover:bg-green_hover-100"
                  title="repost"
                ></Button>
                <Button
                  id={details.id}
                  repost={details.repost && details.repost._id}
                  icon={icons.heart}
                  filled={icons.heart_filled}
                  amount={details.repost ? details.repost.likes : details.likes}
                  isActive={liked}
                  active="text-heart_pink-200"
                  hover="hover:text-heart_pink-200 hover:bg-heart_pink-100"
                  title="like"
                ></Button>
                <button
                  disabled={pending}
                  onClick={handleSave}
                  className="relative overflow-hidden flex items-center justify-center h-full aspect-square shrink-0 text-gray-500 hover:text-accent-900 hover:bg-accent-200 rounded-lg "
                >
                  {pending && (
                    <div className="absolute size-full bg-loading animate-loading opacity-50 pointer-events-none"></div>
                  )}
                  {saved ? (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-accent-900"
                    >
                      {icons.bookmark_filled}
                    </motion.span>
                  ) : (
                    <span>{icons.bookmark}</span>
                  )}
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default Post;
