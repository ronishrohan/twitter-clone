import React from "react";
import Link from "next/link";
import { icons } from "@/app/util/icons";
import NavLink from "./NavLink";
import Profile from "./Profile";

function Sidebar() {
  return (
    <header className="h-full lg:min-w-72 text-2xl border-r border-r-grays-200 flex flex-col">
      <Link
        href="/home"
        className="text-4xl font-medium w-full items-center hidden lg:flex lg:justify-normal justify-center border-b border-transparent p-4 hover:border-grays-200 hover:bg-grays-100 transition-all"
      >
        <span>chirp</span>
      </Link>
      <div className="flex flex-col">
        <NavLink href="/home" icon={icons.home}>
          Home
        </NavLink>
        <NavLink href="/search" icon={icons.search}>
          Search
        </NavLink>
        <NavLink href="/messages" icon={icons.messages}>
          Messages
        </NavLink>
        <NavLink href="/profile" icon={icons.profile}>
          Profile
        </NavLink>
      </div>
      <div className="flex flex-col mt-auto">
        <button className="filter hover:brightness-110 transition-all  h-14 bg-gradient-to-r from-accent-800 to-blue-600 m-4  text-white font-bold rounded-full text-lg">Post</button>
        <Profile></Profile>
      </div>
    </header>
  );
}

export default Sidebar;
