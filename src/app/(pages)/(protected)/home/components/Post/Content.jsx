"use client";
import React, { useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";

function Content({ children }) {
  const content = useRef();
  const [height, setHeight] = useState(200);
  const [expanded, setExpanded] = useState(false);
  const [show, setShow] = useState(true);
  useEffect(() => {
    if(content?.current?.clientHeight < 200){
        setShow(false)
    }
  }, [content])
  function handleExpand() {
    if (content.current.scrollHeight > content.current.clientHeight) {
      setHeight(content.current.scrollHeight);
      setExpanded(true);
    } else {
      setHeight(200);
      setExpanded(false);
    }
  }

  return (
    <>
      <div
        style={{ maxHeight: height }}
        ref={content}
        className="relative font-roboto mt-1   mb-4 overflow-hidden transition-all"
      >
        <Markdown>{children}</Markdown>
        {(show && !expanded) && (
          <div className="absolute w-full bottom-0 h-14 bg-gradient-to-t from-black to-transparent"></div>
        )}
      </div>
      {show && (
        <button onClick={handleExpand} className="text-accent-800 hover:text-accent-900 font-medium mb-4 w-fit">
          {expanded ? <span>show less</span> : <span>show more</span>}
        </button>
      )}
    </>
  );
}

export default Content;
