"use client";
import { icons } from "@/app/utils/icons";
import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";
import { io } from "socket.io-client";
import Message from "./Message";
import { useSession } from "next-auth/react";
import axios from "axios";
import Image from "next/image";

const MessagesContainer = ({ id }) => {
  const { data, status } = useSession();
  const [socket, setSocket] = useState(null);
  const [room, setRoom] = useState(null);
  const inputRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);
  const [userLoading, getUser] = useTransition();
  const [disabled, setDisabled] = useState(true);
  useEffect(() => {
    if (status == "authenticated" && id) {
      const sckt = io("http://localhost:4000");
      const roomId = [id, data.user._id].sort().toString().replace(",", "");

      setRoom(roomId);

      sckt.emit("join-room", roomId);

      setSocket((prev) => {
        prev && prev.disconnect();
        setMessages([]);
        return sckt;
      });
    }
    if (id) {
      getUser(async () => {
        const res = await axios.post("/api/users/details", { id: id });
        console.log(res);
        setUser(res.data.user);
      });
    }
  }, [status, id]);
  useMemo(() => {
    if (socket) {
      socket.on("incoming-message", (message) => {
        setMessages((prev) => [
          ...prev,
          { content: message.content, self: false },
        ]);
      });
    }
  }, [socket]);

  async function handleSendMessage() {
    if (inputRef.current.value.length > 0) {
      const msg = inputRef.current.value;
      await socket.emit("message", { content: msg }, room);
      setMessages((prev) => [...prev, { content: msg, self: true }]);
      inputRef.current.value = "";
    }
  }
  function handleDisable(e) {
    {
      if (e.target.value.length > 0) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    }
  }
  return (
    <div className="w-full h-full">
      <div className="border-y border-grays-200 h-16 sticky top-0 bg-[rgba(0,0,0,0.8)] backdrop-blur-lg z-40">
        {user && (
          <div className="size-full p-4 flex gap-2 items-center">
            <Image
              className="size-10 rounded-full overflow-hidden"
              width={50}
              height={50}
              src={user.avatar}
              alt="avatar"
            ></Image>
            <span className="text-xl">{user.fullName}</span>
            <span className="text-xl text-grays-300">@{user.username}</span>
          </div>
        )}
      </div>
      {id ? (
        <>
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
              onChange={handleDisable}
              onKeyDown={(e) => {
                if (e.key == "Enter") {
                  handleSendMessage();
                }
              }}
            />
            <button
              disabled={disabled}
              onClick={handleSendMessage}
              className={`size-16 shrink-0 rotate-180 border-r border-grays-200 hover:bg-accent-200 transition-colors disabled:text-grays-300 ${
                disabled && "pointer-events-none"
              }`}
            >
              {icons.arrow}
            </button>
          </div>
        </>
      ) : (
        <div className="h-full w-full flex items-center justify-center text-lg font-medium text-grays-300">
          No messages sent or received
        </div>
      )}
    </div>
  );
};

export default MessagesContainer;
