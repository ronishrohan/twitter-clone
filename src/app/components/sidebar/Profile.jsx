import React from "react";
import Image from "next/image";
import { icons } from "@/app/util/icons";

function Profile() {
  return (
    <button className="h-[75px] w-full p-4 flex items-center border-t border-transparent hover:border-grays-200 hover:bg-grays-100">
      <img
        src="https://pbs.twimg.com/profile_images/1487114760826986498/9DiToHc0_normal.jpg"
        className="h-full rounded-full"
        alt="your profile picture"
      />
      <div className="flex flex-col ml-4 text-lg h-full justify-between items-start leading-3">
        <span className="font-bold">Ronish Rohan</span>
        <span className="font-semibold text-text-400 text-base ">
          @ronishrohan
        </span>
      </div>
      <span className="ml-auto text-lg">{icons.ellipsis}</span>
    </button>
  );
}

export default Profile;
