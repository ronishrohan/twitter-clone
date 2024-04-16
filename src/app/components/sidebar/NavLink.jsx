"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

function NavLink({ children, icon,filled, onLoad, ...others }) {
  const [isActive, setActive] = useState(false);
  const [loading, setLoading] = useState(onLoad ? true : false);
  const pathname = usePathname();
  useEffect(() => {
    if (pathname === others.href) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [pathname]);
  useEffect(() => {
    async function handleLoad() {
      await onLoad();
      setLoading(false);
    }
    if (onLoad) {
      handleLoad();
    }
  }, []);
  return (
    <Link
      title={loading ? others.title : "loading"}
      {...others}
      className={`${
        isActive || (onLoad && loading && "pointer-events-none")
      } overflow-hidden relative w-full font-medium flex text-2xl gap-4  items-center justify-center lg:justify-normal    transition-all ${
        isActive == false ? "hover:bg-[rgb(8,8,8)]" : "pointer-events-none"
      }`}
    >
      {loading && (
        <div className="size-full absolute overflow-hidden">
          <div className="size-full bg-loading animate-loading"></div>
        </div>
      )}
      <div className="flex justify-center items-center p-4 gap-0 sm:gap-2 text-lg leading-3">
        <AnimatePresence>
          {isActive && (
            <div className="opacity-0 sm:opacity-100 right-0 absolute size-1/2 ">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
                className="size-full bg-accent-900 -z-10 blur-3xl pointer-events-none right-0 bottom-0 scale-150"
              ></motion.div>
            </div>
          )}
        </AnimatePresence>
        <span
          className={
            isActive
              ? "text-accent-900 transition-colors "
              : "text-text-900"
          }
        >
          {isActive ? filled : icon}
        </span>
        <span
          className={
            (isActive ? "font-bold " : "font-normal ") +
            "transition-all hidden lg:block text-2xl leading-3 py-2"
          }
        >
          {children}
        </span>
      </div>
    </Link>
  );
}

export default NavLink;
