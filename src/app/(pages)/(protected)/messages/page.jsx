"use client";
import MessagesContainer from "./components/MessagesContainer";
import React, { useEffect, useMemo, useRef, useState } from "react";
import MessagesList from "./components/MessagesList";

const MessagesPage = () => {
  return (
    <main className="relative min-h-[200vh] max-h-fit w-full flex ">
      <MessagesContainer></MessagesContainer>

      <MessagesList></MessagesList>
    </main>
  );
};

export default MessagesPage;
