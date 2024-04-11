"use client";

import { signOut, useSession } from "next-auth/react";

import React from "react";

import { icons } from "@/app/utils/icons";

const Profile = () => {
  const { data, status } = useSession();
  return (
    <div className="h-20 p-4 w-full flex items-center gap-0 lg:gap-2 justify-center relative">
      <div className="h-full aspect-square rounded-full overflow-hidden  place-items-center hidden lg:grid shrink-0">
        {status == "loading" ? (
          <>
            <div className="size-full bg-loading animate-loading"></div>
          </>
        ) : (
          <>
            <img src={data?.user?.image} className="size-full" alt="" />
          </>
        )}
      </div>
      <div className="flex flex-col justify-evenly leading-4 text-xl h-full w-full overflow-hidden rounded-lg">
        {status == "loading" ? (
          <>
            <div className="size-full bg-loading animate-loading "></div>
          </>
        ) : (
          <>
            <div className="font-semibold text-text-900">
              {data?.user?.name}
            </div>
            <div className="font-medium text-lg text-text-400">
              @{data?.user?.username}
            </div>
          </>
        )}
      </div>
      <button
        onClick={signOut}
        className="h-full aspect-square rounded-lg shrink-0 transition-colors flex items-center justify-center hover:bg-heart_pink-100 text-grays-300 text-base hover:text-heart_pink-200"
      >
        {icons.logout}
      </button>
    </div>
  );
};

export default Profile;
