import { icons } from "@/app/utils/icons";
import React from "react";
import { getUserDetailsById } from "@/app/mongodb/controllers/user.controller";
import Markdown from "react-markdown";
import { Button } from "./Post/Button";
import { formatDateTime } from "@/app/helpers/format.helper";

async function Post({ userId, children, details }) {
  const data = await getUserDetailsById(userId);
  const elapsed = await formatDateTime(details.created)
  
  return (
    <div className="border-b border-grays-200  flex w-full p-4 pb-2 gap-2 font-overused shrink-0">
      <img
        src={data.avatar}
        className="rounded-full size-10"
        alt=""
      />
      <div className="flex flex-col w-full">
        <div className="flex text-lg  align-top gap-2">
          <span className="leading-4 font-semibold">{data.fullName}</span>
          <span className="leading-4 font-medium text-grays-300">
            @{data.username}
          </span>
          <span className="leading-4 font-medium text-grays-300">{elapsed}</span>
        </div>
        <div className="font-roboto mt-1">
          <Markdown>{children}</Markdown>
        </div>
        <section>
          <div className="w-full flex mt-auto h-12">
            <Button
              icon={icons.comments}
              amount={details.comments}
              hover="hover:text-accent-900 hover:bg-accent-200"
              title="comments"
            ></Button>
            <Button
              icon={icons.retweet}
              amount={details.reposts}
              hover="hover:text-green_hover-200 hover:bg-green_hover-100"
              title="repost"
            ></Button>
            <Button
              icon={icons.heart}
              filled={icons.heart_filled}
              amount={details.likes}
              active="text-heart_pink-200"
              hover="hover:text-heart_pink-200 hover:bg-heart_pink-100"
              title="like"
            ></Button>
            <button className="flex items-center justify-center h-full aspect-square shrink-0 hover:text-accent-900 hover:bg-accent-200 rounded-lg">
              <span>{icons.bookmark}</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Post;
