"use client";
import React, { useEffect, useState } from "react";
import ExplorePosts from "./components/ExplorePosts";
import Posts from "../components/Posts";
import { useSearchParams } from "next/navigation";

const ExplorePage = () => {
  const searchParams = useSearchParams();
  const [isSearchView, setIsSearchView] = useState(false);
  useEffect(() => {
    console.log(searchParams.get("query"))
    if (searchParams.get("query")!=null) {
      setIsSearchView(true);
    }
  }, []);
  return (
    <>
      {isSearchView==false ? (
        <>
          <ExplorePosts></ExplorePosts>
        </>
      ) : (
        <><Posts infinite={false} key={searchParams.get("query")} endpoint={`/api/posts/get?query=${searchParams.get("query")}`} userid=""></Posts></>
      )}
    </>
  );
};

export default ExplorePage;
