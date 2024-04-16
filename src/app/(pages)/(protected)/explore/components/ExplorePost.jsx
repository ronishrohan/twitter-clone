"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

const ExplorePost = ({ image, id, user, details }) => {
  const [hovered, setHoverd] = useState(false);
  const card = useRef();
  useEffect(() => {
    function onScroll() {
      const y = window.innerHeight/2;
      const x = window.innerWidth/2;
      const rect = card.current?.getBoundingClientRect();
      const cardX = rect?.left + rect?.width/2;
      const cardY = rect?.top + rect?.height/2;
      if(y-200 < cardY && y+200 > cardY){
        setHoverd(true);
      }
      else{
        setHoverd(false)
      }
    }
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <Link
      ref={card}
      onMouseEnter={() => setHoverd(true)}
      onMouseLeave={() => setHoverd(false)}
      href={`/post/${id}`}
      className="bg-[rgb(8,8,8)] rounded-2xl h-72 sm:h-96  w-full overflow-hidden border-2 hover:brightness-110 transition-all border-transparent duration-300 hover:border-accent-800 flex flex-col relative"
    >
      <motion.div
        initial={{ y: 0, scale: 1.05 }}
        whileInView={{scale: 1}}
        animate={{ y: hovered ? -60 : 0 }}
        transition={{ type: "spring", damping: 20 }}
        className="size-full"
      >
        <Image
          alt="post"
          width={1000}
          height={1000}
          src={image}
          className="size-full object-cover  transition-transform ease-in-out"
        ></Image>
      </motion.div>
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 20 }}
            className="absolute bottom-0 w-full  bg-black z-40 flex items-center p-2 gap-2"
          >
            <Image
              alt="pfp"
              width={50}
              height={50}
              src={
                details.repost ? details.repost.createdBy.avatar : user.avatar
              }
              className="shrink-0 size-10 rounded-full"
            ></Image>

            <div className="h-full w-full flex flex-col justify-between">
              <div className="flex leading-3 gap-1">
                <div>
                  {details.repost
                    ? details.repost.createdBy.fullName
                    : user.fullName}
                </div>
                <div className="text-grays-300">
                  @
                  {details.repost
                    ? details.repost.createdBy.username
                    : user.username}
                </div>
              </div>
              <div className="leading-5 max-w-44 overflow-hidden whitespace-nowrap overflow-ellipsis font-medium font-roboto">
                {details.repost ? details.repost.content : details.content}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Link>
  );
};

export default ExplorePost;
