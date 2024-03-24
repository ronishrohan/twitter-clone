"use client";
import React from "react";
import QuickAccessHolder from "@/app/components/quick-access/QuickAccessHolder";
import Posts from "../components/Posts";
import { useSession } from "next-auth/react";
import { icons } from "@/app/utils/icons";
import Link from "next/link";
import Image from "next/image";

const ProfilePage = () => {
  const { data, status } = useSession();
  return (
    <>
      <main className="size-full flex flex-col h-fit">
        <Link
          href="/home"
          className="sticky top-0 h-14 border-b border-grays-200 flex items-center p-4 gap-4 backdrop-blur-lg z-50"
        >
          <div>{icons.arrow}</div>
          <div className="flex h-full justify-center items-baseline gap-2">
            <span className="text-xl font-semibold leading-3">
              {data?.user?.name}
            </span>
            <span className="text-text-400 font-semibold">
              @{data?.user?.username}
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
                    src={data?.user?.image}
                    width={50}
                    height={50}
                    className="size-20"
                  ></Image>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-medium text-text-900">
                    {data?.user?.name}
                  </span>
                  <span className="text-xl font-medium text-text-500">
                    @{data?.user?.username}
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
          <Posts endpoint="/api/posts/profile" userid={data?.user?._id}></Posts>
        </section>
      </main>
      <QuickAccessHolder></QuickAccessHolder>
    </>
  );
};

export default ProfilePage;
