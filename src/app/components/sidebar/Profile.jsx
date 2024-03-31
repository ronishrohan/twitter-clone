"use client";
import axios from "axios";
import { signOut, useSession } from "next-auth/react";

import React from "react";

const Profile = () => {
  const { data, status } = useSession();
  return (
    <div onClick={signOut} className="h-20 p-4 flex items-center gap-2 cursor-pointer">
      <div className="h-full aspect-square rounded-full overflow-hidden grid place-items-center shrink-0">
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
              <div className="font-semibold text-text-900">{data?.user?.name}</div>
              <div className="font-medium text-lg text-text-400" >@{data?.user?.username}</div>
            </>
          )}
        
      
      </div>
    </div>
  );
};

export default Profile;
