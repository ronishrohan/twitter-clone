"use client"
import { icons } from "@/app/utils/icons";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { io } from "socket.io-client";
import Message from "./Message";

const MessagesContainer = () => {
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
    const msg = inputRef.current.value;
    await socket.emit("message", { content: msg });
    setMessages((prev) => [...prev, { content: msg, self: true }]);
    inputRef.current.value = "";
  }
  return (
    <div className="w-full h-full">
      <div className="size-full flex flex-col p-2 gap-1">
        {messages.length > 0 &&
          messages.map((message, index) => (
            <Message self={message.self}>{message.content}</Message>
          ))}
      </div>

      <div className="flex w-full mt-auto sticky bottom-0 border-t border-grays-200">
        <input
          type="text"
          placeholder="Enter message here"
          className="w-full p-4 bg-black outline-none "
          ref={inputRef}
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              handleSendMessage();
            }
          }}
        />
        <button
          onClick={handleSendMessage}
          className="size-16 shrink-0 rotate-180 border-r border-grays-200 hover:bg-accent-200 transition-colors"
        >
          {icons.arrow}
        </button>
      </div>
    </div>
  );
};

export default MessagesContainer;
