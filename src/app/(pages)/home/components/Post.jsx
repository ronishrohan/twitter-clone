import { icons } from "@/app/util/icons";
import React from "react";

function Button({ icon,hover, amount, ...others }) {
  return (
    <>
      <button
        {...others}
        className={`flex hover:bg-grays-100 gap-2 w-full items-center p-2 rounded-lg ${hover}`}
      >
        <span>{icon}</span>
        <span>{amount}</span>
      </button>
    </>
  );
}

function Post() {
  return (
    <div className="border-b border-grays-200  flex w-full p-4 pb-2 gap-2 font-overused shrink-0">
      <img
        src="https://pbs.twimg.com/profile_images/1487114760826986498/9DiToHc0_normal.jpg"
        className="rounded-full size-10"
        alt=""
      />
      <div className="flex flex-col">
        <div className="flex text-lg  align-top gap-2">
          <span className="leading-4 font-semibold">Ronish Rohan</span>
          <span className="leading-4 font-medium text-grays-300">
            @ronishrohan
          </span>
          <span className="leading-4 font-medium text-grays-300">4h</span>
        </div>
        <div className="font-roboto mt-2">
          I've had it up to here with Next.js. It's like trying to navigate a
          maze blindfolded. Every step I take seems to lead me deeper into a
          tangled mess of confusion. And the worst part? It's not even clear
          what problem Next.js is supposed to solve. It's as if the creators
          wanted to make web development more complex for the sake of it. I've
          spent hours wrestling with Next.js, only to end up with a website that
          performs worse than one built with basic HTML and CSS. It's
          frustrating beyond belief. Honestly, whoever thought this was a good
          idea clearly has no understanding of user experience or developer
          sanity.
        </div>
        <section>
          <div className="w-full flex mt-auto h-12">
            <Button icon={icons.comments} amount={24} hover="hover:text-accent-900 hover:bg-accent-200" title="comments"></Button>
            <Button icon={icons.retweet} amount={5} hover="hover:text-green_hover-200 hover:bg-green_hover-100" title="repost"></Button>
            <Button icon={icons.heart} amount={55} hover="hover:text-heart_pink-200 hover:bg-heart_pink-100" title="like"></Button>
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
