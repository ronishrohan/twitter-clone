import React from "react";
import Link from "next/link";
import { icons } from "@/app/util/icons";
import NavLink from "./NavLink";
import Profile from "./Profile";
import { motion } from "framer-motion";
import { forwardRef } from "react";

const Sidebar = ({width}) => {
  return (
    <header
      style={{width: width}}
      id="sidebar"
      className="h-full fixed top-0 text-2xl border-r transition-all  z-20 bg-background border-r-grays-200 flex flex-col"
    >
      <Link
        href="/home"
        className="overflow-hidden relative text-4xl  font-medium w-full items-center hidden lg:flex lg:justify-normal justify-center border-b border-transparent p-4 hover:border-grays-200 hover:bg-grays-100 transition-all"
      >
        <span>waffle</span>
        <div className="absolute left-0 opacity-50 blur-3xl w-1/2 h-16 bg-accent-900"></div>
      </Link>
      <div className="flex flex-col">
        <NavLink href="/home" title="Home" icon={icons.home}>
          Home
        </NavLink>
        <NavLink href="/explore" title="Explore" icon={icons.search}>
          Explore
        </NavLink>
        <NavLink href="/messages" title="Messages" icon={icons.messages}>
          Messages
        </NavLink>
        <NavLink href="/profile" title="Profile" icon={icons.profile}>
          Profile
        </NavLink>
      </div>
      <div className="flex flex-col mt-auto">
        <button
          title="Post"
          className="filter hover:brightness-110 transition-all  h-14 bg-gradient-to-r from-accent-800 to-blue-600 m-4  text-white font-bold rounded-full text-lg"
        >
          <span className="hidden lg:block">Post</span>
          <span className="lg:hidden block">{icons.plus}</span>
        </button>
        <Profile></Profile>
      </div>
    </header>
  );
};

export default Sidebar;
