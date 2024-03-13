"use client";
import React, { useEffect, useState } from "react";

function Main({ children }) {
  const [m, setM] = useState(0);
  useEffect(() => {
    function setMargin() {
      const rect = document.getElementById("sidebar").getClientRects();
      setM(rect[0].width);
    }
    setMargin();
    window.addEventListener("resize", setMargin);
    return () => window.removeEventListener("resize", setMargin);
  }, []);
  return (
    <main>
      <section style={{ marginLeft: m }} className="h-[500vh]">
        {children}
      </section>
    </main>
  );
}

export default Main;
