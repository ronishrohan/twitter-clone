"use client";
import React, { useRef } from "react";
import QuickAccessHolder from "@/app/components/quick-access/QuickAccessHolder";
import { icons } from "@/app/utils/icons";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const layout = ({ children }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryRef = useRef();
  function handleSearch() {
    router.push(`/explore?query=${queryRef.current.value}`);
  }
  return (
    <>
      <main className="size-full flex flex-col h-fit">
        <header className="h-16  border-b border-grays-200 flex items-center shrink-0 sticky top-0 z-50 bg-[rgba(0,0,0,0.8)] backdrop-blur-lg">
          <div className="ml-4 my-4 text-grays-300 absolute pointer-events-none">
            {icons.search}
          </div>
          <input
            defaultValue={searchParams.get("query")}
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                handleSearch();
              }
            }}
            ref={queryRef}
            type="text"
            spellCheck="false"
            className="size-full outline-none bg-transparent p-4 pl-12"
          />
        </header>
        <div className="h-fit w-full">{children}</div>
      </main>
      <QuickAccessHolder search={false}></QuickAccessHolder>
    </>
  );
};

export default layout;
