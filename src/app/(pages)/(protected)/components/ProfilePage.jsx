"use client";
import React, { useEffect, useRef, useState } from "react";
import { icons } from "@/app/utils/icons";
import Image from "next/image";
import Link from "next/link";
import Posts from "./Posts";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import axios from "axios";
import useToast from "@/app/hooks/useToast";

const modes = {
  0: "/api/posts/profile",
  1: "/api/posts/liked",
  2: "/api/posts/saved",
};

const Button = ({ mode, setMode, currentMode, children }) => {
  return (
    <button
      disabled={currentMode == mode}
      onClick={() => setMode(mode)}
      className={`h-full p-4 transition-all hover:bg-[rgb(8,8,8)] hover:text-white ${
        mode === currentMode
          ? "bg-grays-100  pointer-events-none"
          : "text-grays-300"
      }`}
    >
      {children}
    </button>
  );
};

const UserButton = ({ children, active, ...others }) => {
  return (
    <button
      {...others}
      className={`p-2 px-6 w-full font-medium rounded-2xl transition-colors border-2 border-transparent hover:border-accent-800  ${
        active
          ? "bg-accent-900 border-accent-900 text-white font-black hover:bg-accent-800"
          : "bg-grays-100 text-text-900"
      }`}
    >
      {children}
    </button>
  );
};

const ProfilePage = ({ user, status }) => {
  const [mode, setMode] = useState(0);
  const { data, status: userStatus } = useSession();
  const [isUser, setIsUser] = useState(false);
  const [editing, setEditing] = useState(false);
  const [followers, setFollowers] = useState(user.followers);
  const [following, setFollowing] = useState(false);
  const { notify } = useToast();
  const usernameRef = useRef();

  const router = useRouter();
  useEffect(() => {
    if (userStatus == "authenticated") {
      if (data.user._id === user._id) {
        setIsUser(true);
      }
      if (data.user.following.includes(user._id)) {
        setFollowing(true);
      }
    }
  }, [userStatus]);
  function handleNavigateBack() {
    router.back();
  }
  async function handleFollow() {
    let res;
    if (following == false) {
      res = await axios.post("/api/users/update/follow", {
        id: user._id,
        userId: data.user._id,
      });
      setFollowing(true);
      notify(`You are following ${user.fullName}`)
    } else {
      res = await axios.post("/api/users/update/unfollow", {
        id: user._id,
        userId: data.user._id,
      });
      setFollowing(false);
      notify(`You have stopped following ${user.fullName}`)
    }
    console.log(res.data.following);
    setFollowers(res.data.followers);
  }
  async function addUserToDMS() {
    await axios.post("/api/users/messages/adduser", {
      id: user._id,
      userId: data.user._id,
    });
    router.push("/messages?u=0");
  }
  function handleEditUsername() {
    setEditing(true);
    setTimeout(() => {
      usernameRef.current.focus();
    }, 500);
  }
  async function handleChangeUsername() {
    if (usernameRef.current.value === user.username) {
      notify("You have not changed anything");
      setEditing(false);
    } else {
      const newUsername = usernameRef.current.value;
      const res = await axios.post("/api/users/update/username", {
        username: newUsername,
        id: user._id,
      });
      if (res.data.status !== 200) {
        notify("Username already exists");
      } else {
        user.username = newUsername;
      }
      setEditing(false);
    }
  }
  return (
    <>
      <div
        onClick={handleNavigateBack}
        className="sticky top-0 h-16 border-b hover:bg-[rgb(8,8,8)] transition-colors cursor-pointer border-grays-200 flex items-center gap-4 backdrop-blur-md bg-[rgba(0,0,0,0.9)] z-50"
      >
        <div className="z-20 ml-4">{icons.arrow}</div>
        <div className="flex h-full justify-center items-center gap-2 z-20 py-4">
          <span className="text-xl font-semibold leading-3">
            {user?.fullName}
          </span>
          <span className="text-text-400 font-semibold">@{user?.username}</span>
        </div>
      </div>
      <section className="flex flex-col size-full">
        <div className="h-fit flex flex-col p-4 border-b border-grays-200">
          {status != "loading" ? (
            <>
              <div className="overflow-hidden rounded-full size-fit">
                <Image
                  alt="profile picture"
                  src={user?.avatar}
                  width={50}
                  height={50}
                  className="size-20"
                ></Image>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-medium text-text-900">
                  {user?.fullName}
                </span>
                <div className="text-xl font-medium text-text-500 flex items-center">
                  {!isUser && <span>@{user?.username}</span>}
                  {isUser && (
                    <>
                      {editing ? (
                        <>
                          <span>@</span>
                          <input
                            ref={usernameRef}
                            type="text"
                            spellCheck="false"
                            className="bg-black outline-none w-max"
                            maxLength={20}
                            defaultValue={user?.username}
                          />
                          <button
                            onClick={handleChangeUsername}
                            className="size-10 hover:bg-[rgb(8,8,8)] rounded-lg transition-colors hover:text-accent-900 text-sm"
                          >
                            {icons.check}
                          </button>
                          <button
                            onClick={() => setEditing(false)}
                            className="size-10 hover:bg-heart_pink-100 rounded-lg transition-colors hover:text-heart_pink-200 text-sm"
                          >
                            <div className="rotate-45">{icons.plus}</div>
                          </button>
                        </>
                      ) : (
                        <>
                          <span>@{user?.username}</span>
                          <button
                            onClick={handleEditUsername}
                            className="size-10 ml-2 hover:bg-[rgb(8,8,8)] rounded-lg transition-colors hover:text-accent-900 text-sm"
                          >
                            {icons.pen}
                          </button>
                        </>
                      )}
                    </>
                  )}
                </div>
                <div className="flex gap-2 text-lg font-medium mt-4">
                  <span>
                    {user?.posts} <span className="text-grays-300">posts</span>
                  </span>
                  <span>
                    {followers}{" "}
                    <span className="text-grays-300">followers</span>
                  </span>
                  <span>
                    {user.following?.length}{" "}
                    <span className="text-grays-300">following</span>
                  </span>
                </div>
                <div className="flex gap-2 mt-2">
                  {isUser == false ? (
                    <>
                      <UserButton onClick={addUserToDMS}>Message</UserButton>
                      <UserButton active={following} onClick={handleFollow}>
                        {following ? "Following" : "Follow"}
                      </UserButton>
                    </>
                  ) : (
                    <>
                      <UserButton onClick={signOut}>Logout</UserButton>
                    </>
                  )}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="size-full overflow-hidden">
                <div className="p-4 size-full overflow-hidden rounded-2xl">
                  <div className="size-full bg-loading animate-loading"></div>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="h-14 border-b border-grays-200 flex sticky top-14 backdrop-blur-md z-40 bg-[rgba(0,0,0,0.9)]">
          <Button mode={0} setMode={setMode} currentMode={mode}>
            Posts
          </Button>
          <Button mode={1} setMode={setMode} currentMode={mode}>
            Liked Posts
          </Button>
          <Button mode={2} setMode={setMode} currentMode={mode}>
            Saved Posts
          </Button>
        </div>
        {status != "loading" && (
          <Posts
            infinite={mode == 2 ? false : true}
            key={mode}
            endpoint={modes[mode]}
            userid={user?._id}
          ></Posts>
        )}
      </section>
    </>
  );
};

export default ProfilePage;
