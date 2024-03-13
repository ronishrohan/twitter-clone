"use client";
import React, { useEffect, useRef, useState } from "react";
import Sidebar from "./Sidebar";

function SidebarHolder() {
  const sidebar = useRef();
  const [w, setW] = useState();
  useEffect(() => {
    window.addEventListener("resize", () => {
      setW(sidebar.current.clientWidth);
    });
  }, []);

  return (
    <div className="relative">
      <Sidebar ref={sidebar}></Sidebar>
    </div>
  );
}

export default SidebarHolder;
