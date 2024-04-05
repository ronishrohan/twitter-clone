"use client";
import { icons } from "@/app/utils/icons";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { io } from "socket.io-client";

const MessagesPage = () => {
  const [socket, setSocket] = useState(null);
  const inputRef = useRef(null);
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const tempsocket = io("http://localhost:4000");

    setSocket(tempsocket);
  }, []);
  useMemo(() => {
    if (socket) {
      socket.on("incoming-message", (message) => {
        console.log(message.content);
        setMessages((prev) => [
          ...prev,
          { content: message.content, self: false },
        ]);
      });
    }
  }, [socket]);

  async function handleSendMessage() {
    await socket.emit("message", { content: inputRef.current.value });
    setMessages((prev) => [
      ...prev,
      { content: inputRef.current.value, self: true },
    ]);
  }
  return (
    <main className="relative h-[200vh] w-full flex flex-col">
      {messages.length > 0 &&
        messages.map((message, index) => (
          <div
            className={`w-full ${
              message.self === true ? "text-right" : "text-left"
            }`}
            key={message + index}
          >
            {message.content}
          </div>
        ))}

      <div className="flex w-full mt-auto sticky bottom-0 border-t border-grays-200">
        <input
          type="text"
          placeholder="Enter message here"
          className="size-full p-4 bg-black outline-none "
          ref={inputRef}
        />
        <button
          onClick={handleSendMessage}
          className="size-16 shrink-0 rotate-180 border-r border-grays-200 hover:bg-accent-200 transition-colors"
        >
          {icons.arrow}
        </button>
      </div>
    </main>
  );
};

export default MessagesPage;
