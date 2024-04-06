"use client";
import MessagesContainer from "./components/MessagesContainer";
import React, { useEffect, useMemo, useRef, useState } from "react";
import MessagesList from "./components/MessagesList";

const MessagesPage = () => {
  const [id, setId] = useState(null)
  
  return (
    <main className="relative max-h-fit w-full flex ">
      <MessagesContainer id={id} ></MessagesContainer>

      <MessagesList updateId={setId} current={id}></MessagesList>
    </main>
  );
};

export default MessagesPage;
