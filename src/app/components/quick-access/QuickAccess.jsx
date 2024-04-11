"use client";
import { icons } from "@/app/utils/icons";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";

export function QuickAccessCard({ children }) {
  return (
    <>
      <div className="overflow-hidden relative  w-full flex flex-col bg-[rgb(10,10,10)] h-fit rounded-2xl p-4">
        {children}
      </div>
    </>
  );
}

function QuickAccess({ width, search = true, children }) {
  const router = useRouter();
  const [isFocused, setFocus] = useState(false);
  const searchRef = useRef();
  function handleSearch() {
    router.push(`/explore?query=${searchRef.current.value}`);
  }
  return (
    <div
      style={{ width: width }}
      id="quickaccess"
      className="fixed flex flex-col  h-full sm:border-grays-200 border-0 sm:border-l transition-all"
    >
      {search && (
        <div className="w-full flex items-center h-16">
          <span
            className={`absolute mx-4 pointer-events-none transition-all ${
              isFocused ? "text-accent-900" : "text-grays-300"
            }`}
          >
            {icons.search}
          </span>
          <input
            ref={searchRef}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            onKeyDown={(e) => {
              if (e.keyCode == 13) {
                handleSearch();
              }
            }}
            spellCheck={false}
            type="text"
            placeholder="Search"
            className="transition-all placeholder:text-grays-300 placeholder:font-medium flex items-center pl-10 border-b border-grays-200 focus:border-b-2  focus:border-accent-900 focus:bg-background font-normal size-full outline-none  bg-[rgba(8,8,8)] "
          />
        </div>
      )}
      <div className="flex flex-col w-full p-3 gap-3">{children}</div>
    </div>
  );
}

export default QuickAccess;
