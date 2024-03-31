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

function Post({ user, children, details }) {
  const { data, status } = useSession();
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [reposted, setReposted] = useState(false);
  const [pending, startTransition] = useTransition();
  const [repostPending, startRepost] = useTransition();
  const { revalidatePosts } = useRevalidate();
  const { notify } = useToast();

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
        if (details.likedBy.includes(data.user._id)) {
          setLiked(true);
        }
      }
    }
  }, [status]);
  async function handleSave() {
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
  async function handleRepost() {
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
  return (
    <div className="border-b border-grays-200  flex flex-col">
      {details.repost && (
        <div className=" ml-4 mt-2 text-grays-400 font-medium flex gap-1">
          <div>{icons.retweet}</div>
          <div>reposted by </div>
          <Link
            href={`/user/${data.user.username}`}
            className="hover:underline"
          >
            @{data.user.username}
          </Link>
          <div>{formatDateTime(details.createdAt)}</div>
        </div>
      )}
      <div className="size-full flex gap-2 p-4 pb-2 shrink-0 ">
        {details.repost ? (
          <>
            <Image
              alt="a post"
              className="rounded-full size-10"
              src={details.repost.createdBy?.avatar}
              width={48}
              height={48}
            ></Image>
          </>
        ) : (
          <>
            <Image
              alt="a post"
              className="rounded-full size-10"
              src={user?.avatar}
              width={48}
              height={48}
            ></Image>
          </>
        )}
        <div className="flex flex-col w-full">
          <div className="flex text-lg  align-top gap-2">
            {details.repost ? (
              <>
                <Link
                  href={`/user/${details.repost.createdBy?.username}`}
                  className="flex gap-1"
                >
                  <span className="leading-4 font-semibold hover:underline">
                    {details.repost.createdBy?.fullName}
                  </span>
                  <span className="leading-4 font-medium text-grays-300">
                    @{details.repost.createdBy?.username}
                  </span>
                </Link>
              </>
            ) : (
              <>
                <Link href={`/user/${user?.username}`} className="flex gap-1">
                  <span className="leading-4 font-semibold hover:underline">
                    {user?.fullName}
                  </span>
                  <span className="leading-4 font-medium text-grays-300">
                    @{user?.username}
                  </span>
                </Link>
              </>
            )}
            <span className="leading-4 font-medium text-grays-300">
              {formatDateTime(
                details.repost ? details.repost.createdAt : details.createdAt
              )}
            </span>
          </div>
          <Content key={children}>{children}</Content>
          {details.image && (
            <div className="w-full h-fit pr-4 flex justify-center mb-2">
              <Image
                className="rounded-2xl w-full bg-grays-100"
                width={1000}
                height={1000}
                alt="post"
                src={details.image}
              ></Image>
            </div>
          )}
          <section>
            <div className="w-full flex mt-auto h-12 gap-2">
              <Button
                id={details.id}
                repost={details.repost && details.repost._id}
                icon={icons.comments}
                amount={
                  details.repost ? details.repost.comments : details.comments
                }
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
                className="relative overflow-hidden flex items-center justify-center h-full aspect-square shrink-0 text-gray-500 hover:text-accent-900 hover:bg-accent-200 rounded-lg"
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
  );
}

export default Post;
