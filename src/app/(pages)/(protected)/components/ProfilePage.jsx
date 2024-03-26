import React from "react";
import { icons } from "@/app/utils/icons";
import Image from "next/image";
import Link from "next/link";
import Posts from "./Posts";

const ProfilePage = ({user, status}) => {
  return (
    <>
      <Link
        href="/home"
        className="sticky top-0 h-14 border-b border-grays-200 flex items-center p-4 gap-4 backdrop-blur-lg z-50"
      >
        <div>{icons.arrow}</div>
        <div className="flex h-full justify-center items-baseline gap-2">
          <span className="text-xl font-semibold leading-3">
            {user?.fullName}
          </span>
          <span className="text-text-400 font-semibold">
            @{user?.username}
          </span>
        </div>
      </Link>
      <section className="flex flex-col size-full">
        <div className="h-44 flex flex-col p-4 border-b border-grays-200">
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
                <span className="text-xl font-medium text-text-500">
                  @{user?.username}
                </span>
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
        <div className="h-14 border-b border-grays-200" >
          <button className="h-full p-4 hover:bg-grays-100" >Posts</button>
        </div>
        {status != "loading" && (
          <Posts endpoint="/api/posts/profile" userid={user?._id}></Posts>
        )}
      </section>
    </>
  );
};

export default ProfilePage;
