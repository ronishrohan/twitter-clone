"use client";
import { icons } from "@/app/utils/icons";
import React, { useRef, useTransition } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { createPostAction } from "@/app/mongodb/actions/post.actions";
import { useRouter } from "next/navigation";
import useRevalidate from "@/app/hooks/useRevalidate";
import useToast from "@/app/hooks/useToast";

const Modal = ({ enabled, close, content }) => {
  const router = useRouter();
  const {notify} = useToast();
  const postContent = useRef(null);
  const {revalidatePosts} = useRevalidate();
  const [pending, startTransition] = useTransition();
  function handlePost() {
    startTransition(async () => {
      await createPostAction(postContent.current.value);
      router.push("/home")
      revalidatePosts();
      notify("Your post has been created successfully");
      close();
    });
  }
  return (
    <AnimatePresence>
      {enabled && (
        <div className="flex items-center justify-center size-full fixed z-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="absolute  bg-[rgba(0,0,0,0.4)] size-full z-40"
          ></motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "tween", ease: "circInOut" }}
            className="w-1/2  bg-[rgba(255,255,255,0.05)] backdrop-blur-2xl rounded-3xl z-50 flex flex-col gap-4 p-4 border border-grays-200"
          >
            <div className="flex justify-between">
              <span className="text-2xl font-semibold">Create a post</span>
              <button
                onClick={close}
                className="size-10 text-xl p-2 hover:bg-[rgba(255,255,255,0.05)] hover:text-heart_pink-200 transition-colors rounded-xl"
              >
                <div className="rotate-45 size-full flex items-center justify-center">
                  {icons.plus}
                </div>
              </button>
            </div>
            <div className="overflow-hidden rounded-2xl h-48 border border-grays-200">
              <textarea
                placeholder="The body of your post goes here"
                ref={postContent}
                defaultValue={content}
                className=" font-roboto p-4 w-full h-full  overflow-y-scroll  bg-black outline-none resize-none placeholder:text-grays-300"
              ></textarea>
            </div>
            <div className="flex">
              <button
                onClick={handlePost}
                className="ml-auto bg-accent-900 px-8 py-2 rounded-2xl text-white font-bold hover:bg-accent-800"
              >
                Post
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
