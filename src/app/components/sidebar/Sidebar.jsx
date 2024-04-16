"use client"
import React from "react";
import Link from "next/link";
import { icons } from "@/app/utils/icons";
import NavLink from "./NavLink";
import Profile from "./Profile";
import CreatePostButton from "./CreatePostButton";
import {  useSession } from "next-auth/react";
import axios from "axios"

const Sidebar = ({ width }) => {
  const {data,status} = useSession();
  async function handleLoadMessagesPage(){
    
    await axios.get(`${process.env.NEXT_PUBLIC_MESSAGES_ENDPOINT}/init`)
    
  }
  return (
    <>
      <header
        style={{ width: width }}
        id="sidebar"
        className="h-full fixed top-0 text-2xl border-black sm:border-grays-200 border-0 sm:border-r transition-all overflow-hidden z-20 bg-background   flex flex-col"
      >
        <Link
          href="/home"
          className="overflow-hidden relative text-4xl text-white h-16 shrink-0 font-medium w-full items-center hidden lg:flex lg:justify-normal justify-center border-b border-grays-200 p-4 hover:border-grays-200 hover:bg-grays-100 transition-all"
        >
          <span id="logo" className="font-overused">
            waffle
          </span>
          <div className="absolute left-0 opacity-50 blur-3xl w-1/2 h-16 bg-accent-900"></div>
        </Link>
        <div className="flex flex-col">
          <NavLink href="/home?m=0" title="Home" icon={icons.home} filled={icons.home}>
            Home
          </NavLink>
          <NavLink href="/explore" title="Explore" icon={icons.search} filled={icons.search}>
            Explore
          </NavLink>
          <NavLink onLoad={handleLoadMessagesPage} href="/messages" title="Messages" icon={icons.messages} filled={icons.messages_filled}>
            Messages
          </NavLink>
          <NavLink href={`/user/${data?.user?.username}`} title="Profile" icon={icons.profile} filled={icons.profile_filled}>
            Profile
          </NavLink>
          <NavLink href="/generate" title="Generate" icon={icons.wand} filled={icons.wand}>
            Generate
          </NavLink>
        </div>
        <div className="flex flex-col mt-auto">
          <CreatePostButton></CreatePostButton>
          <Profile></Profile>
        </div>
      </header>
      <div className="fixed bottom-0 h-16 w-full bg-[rgba(0,0,0,0.9)] border-t border-grays-200 backdrop-blur-lg z-50 flex sm:hidden">
        <NavLink href="/home" title="Home" icon={icons.home} filled={icons.home}>
          Home
        </NavLink>
        <NavLink href="/explore" title="Explore" icon={icons.search} filled={icons.search}>
          Explore
        </NavLink>
        <NavLink onLoad={handleLoadMessagesPage} href="/messages" title="Messages" icon={icons.messages} filled={icons.messages_filled}>
          Messages
        </NavLink>
        <NavLink href="/profile" title="Profile" icon={icons.profile} filled={icons.profile_filled} > 
          Profile
        </NavLink>
        <NavLink href="/generate" title="Generate" icon={icons.wand} filled={icons.wand}>
          Generate
        </NavLink>
        {/* <button onClick={signOut} className="size-full w-44 shrink-0 flex items-center justify-center transition-colors hover:bg-[rgb(8,8,8)]">Log Out</button> */}
      </div>
    </>
  );
};

export default Sidebar;
