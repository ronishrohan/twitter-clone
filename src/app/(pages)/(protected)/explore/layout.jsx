"use client";
import React, { useRef, useState } from "react";
import QuickAccessHolder from "@/app/components/quick-access/QuickAccessHolder";
import { icons } from "@/app/utils/icons";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { QuickAccessCard } from "@/app/components/quick-access/QuickAccess";

const ExploreLayout = ({ children }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryRef = useRef();
  const [focused, setFocused] = useState(false);
  function handleSearch() {
    router.push(`/explore?query=${queryRef.current.value}`);
  }
  return (
    <>
      <main className="size-full flex flex-col h-fit">
        <header
          className={`h-16  transition-colors  flex items-center shrink-0 sticky top-0 z-50 ${
            focused ? "bg-black" : "bg-[rgba(0,0,0,0.9)]"
          } backdrop-blur-lg`}
        >
          <div
            className={`ml-4 my-4  absolute pointer-events-none ${
              focused ? "text-accent-800" : "text-grays-300"
            }`}
          >
            {icons.search}
          </div>
          <input
            defaultValue={searchParams.get("query")}
            onKeyDown={(e) => {
              if (e.keyCode == 13) {
                handleSearch();
              }
            }}
            ref={queryRef}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Enter a query"
            type="text"
            spellCheck="false"
            className="size-full outline-none placeholder:text-grays-300 bg-transparent p-4 pl-12 border-b border-grays-200 focus:border-accent-800 focus:border-b-2 transition-colors"
          />
        </header>
        <div className="h-fit w-full">{children}</div>
      </main>
      <QuickAccessHolder search={false}>
        <QuickAccessCard>
          <div className="absolute bg-accent-800 blur-2xl opacity-20 size-1/2 z-10" ></div>
          <div className="flex flex-col gap-2 z-20">
            <div className="text-2xl font-medium">Explore</div>
            <div className="text-lg font-normal">
              This is the explore page, you will see media posts here.
            </div>
          </div>
        </QuickAccessCard>
        <QuickAccessCard>
          <div className="absolute bg-accent-800 blur-2xl right-10 opacity-20 size-1/2 z-10" ></div>
          <div className="flex flex-col gap-2 z-20">
            <div className="text-lg font-normal">
              and also search posts.
            </div>
          </div>
        </QuickAccessCard>
      </QuickAccessHolder>
    </>
  );
};

export default ExploreLayout;
