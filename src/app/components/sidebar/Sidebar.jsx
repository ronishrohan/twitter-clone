import React from "react";
import Link from "next/link";
import { icons } from "@/app/util/icons";
import NavLink from "./NavLink";
import Profile from "./Profile";
import { motion } from "framer-motion";

function Sidebar() {
  return (
    <header id="sidebar" className="h-full lg:min-w-72 text-2xl border-r fixed z-20 bg-background border-r-grays-200 flex flex-col">
      <Link
        href="/home"
        className="text-4xl  font-medium w-full items-center hidden lg:flex lg:justify-normal justify-center border-b border-transparent p-4 hover:border-grays-200 hover:bg-grays-100 transition-all"
      >
        <span>chirp</span>
      </Link>
      <div className="flex flex-col">
        <NavLink href="/home" icon={icons.home}>
          Home
        </NavLink>
        <NavLink href="/explore" icon={icons.search}>
          Explore
        </NavLink>
        <NavLink href="/messages" icon={icons.messages}>
          Messages
        </NavLink>
        <NavLink href="/profile" icon={icons.profile}>
          Profile
        </NavLink>
      </div>
      <div className="flex flex-col mt-auto">
        <button className="filter hover:brightness-110 transition-all  h-14 bg-gradient-to-r from-accent-800 to-blue-600 m-4  text-white font-bold rounded-full text-lg">
          <span className="hidden lg:block">Post</span>
          <span className="lg:hidden block">{icons.plus}</span>
        </button>
        <Profile></Profile>
      </div>
    </header>
  );
}

export default Sidebar;
