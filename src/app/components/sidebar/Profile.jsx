"use client";
import React from "react";

import { icons } from "@/app/utils/icons";

import Image from "next/image";

import { signOut, useSession } from "next-auth/react";

function Profile() {
  const { data, status } = useSession();

  return (
    <button className="z-20 bg-black relative h-[75px] w-full p-4 flex items-center border-t border-transparent transition-all hover:border-grays-200 hover:bg-grays-100">
      {status == "loading" ? (
        <span>loading</span>
      ) : (
        <>
          <Image
            className="rounded-full size-12"
            src={data?.user.image}
            width={48}
            height={48}
          ></Image>
          <div className="hidden z-20 lg:flex flex-col ml-4 text-lg h-full justify-between items-start leading-3">
            <span className="font-bold">{data?.user.name}</span>
            <span className="font-semibold text-text-400 text-base ">
              @{data?.user.username}
            </span>
          </div>
          <button onClick={signOut} className="ml-auto text-lg hidden lg:block">
            {icons.ellipsis}
          </button>
        </>
      )}
    </button>
  );
}

export default Profile;
