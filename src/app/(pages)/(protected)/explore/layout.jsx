"use client";
import React, { useRef, useState } from "react";
import QuickAccessHolder from "@/app/components/quick-access/QuickAccessHolder";
import { icons } from "@/app/utils/icons";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

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
        <header className={`h-16  transition-colors  flex items-center shrink-0 sticky top-0 z-50 ${focused ? "bg-black" : "bg-[rgba(0,0,0,0.9)]"} backdrop-blur-lg`}>
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
            type="text"
            spellCheck="false"
            className="size-full outline-none bg-transparent p-4 pl-12 border-b border-grays-200 focus:border-accent-800 focus:border-b-2 transition-colors"
          />
        </header>
        <div className="h-fit w-full">{children}</div>
      </main>
      <QuickAccessHolder search={false}></QuickAccessHolder>
    </>
  );
};

export default ExploreLayout;
