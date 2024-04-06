"use client";
import MessagesContainer from "./components/MessagesContainer";
import React, { useEffect, useMemo, useRef, useState } from "react";
import MessagesList from "./components/MessagesList";

const MessagesPage = () => {
  const [id, setId] = useState(null)
  
  return (
    <main className="relative max-h-fit w-full flex overflow-hidden">
      <MessagesContainer  id={id} ></MessagesContainer>

      <div className="h-screen "><MessagesList  updateId={setId} current={id}></MessagesList></div>
    </main>
  );
};

export default MessagesPage;
