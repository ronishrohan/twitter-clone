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
import Link from "next/link"

const MessagesContainer = ({ id }) => {
  const { data, status } = useSession();
  const [socket, setSocket] = useState(null);
  const [room, setRoom] = useState(null);
  const inputRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);
  const [userLoading, getUser] = useTransition();
  const [disabled, setDisabled] = useState(true);
  const [messagesLoading, getMessages] = useTransition();
  const messagesContainer = useRef();
  useEffect(() => {
    setMessages([]);
    if (status == "authenticated" && id) {
      const sckt = io(process.env.NEXT_PUBLIC_MESSAGES_ENDPOINT);
      const roomId = [id, data.user._id].sort().toString().replace(",", "");

      setRoom(roomId);

      sckt.emit("join-room", roomId);

      setSocket((prev) => {
        prev && prev.disconnect();
        setMessages([]);
        return sckt;
      });

      getMessages(async () => {
        const res = await axios.post("/api/messages/get", {
          id1: id,
          id2: data.user._id,
        });
        const transformedMessages = [];
        res.data.messages.forEach((message) => {
          transformedMessages.push({
            content: message.content,
            self: message.by == data.user._id,
          });
        });
        setMessages(transformedMessages);
      });
    }
    if (id) {
      getUser(async () => {
        const res = await axios.post("/api/users/details", { id: id });

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
  useEffect(() => {
    
    messagesContainer?.current?.scrollTo(
      0,
      messagesContainer.current.scrollHeight
    );
  }, [messages]);

  async function handleSendMessage() {
    if (inputRef.current.value.length > 0) {
      const msg = inputRef.current.value;
      await socket.emit("message", { content: msg }, room);
      setMessages((prev) => [...prev, { content: msg, self: true }]);

      inputRef.current.value = "";
      await axios.post("/api/messages/create", {
        id1: data.user._id,
        id2: id,
        content: msg,
        by: data.user._id,
      });
      await socket.emit("trigger-revalidate", id.toString());
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
    <div className="w-full h-screen flex flex-col transition-all">
      {id ? (
        <>
          <Link href={`/user/${user?.username}`} className="border-b border-grays-200 h-16 p-4 transition-colors relative hover:bg-[rgb(8,8,8)] bg-[rgba(0,0,0,0.8)] backdrop-blur-lg z-40">
            {userLoading ? (
              <div className="size-full flex items-center gap-2">
                <div className="size-10 overflow-hidden rounded-full" ><div className="size-full bg-loading animate-loading" ></div></div>
                <div className="w-44 h-8 overflow-hidden rounded-lg" ><div className="size-full bg-loading animate-loading" ></div></div>
              </div>
            ) : (
              <>
                {user && (
                  <div  className="size-full  flex gap-2 items-center">
                    <Image
                      className="size-10 rounded-full overflow-hidden"
                      width={50}
                      height={50}
                      src={user.avatar}
                      alt="avatar"
                    ></Image>
                    <span className="text-xl">{user.fullName}</span>
                    <span className="text-xl text-grays-300">
                      @{user.username}
                    </span>
                  </div>
                )}
              </>
            )}
          </Link>
          {messagesLoading === false ? (
            <>
              {messages.length > 0 ? (
                <>
                  <div
                    ref={messagesContainer}
                   
                    className="size-full flex flex-col  p-2 gap-1 overflow-y-scroll"
                  >
                    {messages.length > 0 &&
                      messages.map((message, index) => (
                        <Message
                          self={message.self}
                          key={index + message.content}
                        >
                          {message.content}
                        </Message>
                      ))}
                  </div>
                </>
              ) : (
                <>
                  <div className="size-full flex items-center justify-center text-lg text-grays-300">
                    Nothing to show yet, why not start with a Hi
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="size-full flex flex-col p-4 justify-end gap-2">
              <div className="w-full flex justify-end">
                <div className="w-44 overflow-hidden rounded-3xl">
                  <div className="h-8 w-full bg-loading animate-loading"></div>
                </div>
              </div>
              <div className="w-full flex justify-end">
                <div className="w-72 overflow-hidden rounded-3xl">
                  <div className="h-8 w-full bg-loading animate-loading"></div>
                </div>
              </div>
              <div className="w-full flex justify-start">
                <div className="w-52 overflow-hidden rounded-3xl">
                  <div className="h-8 w-full bg-loading animate-loading"></div>
                </div>
              </div>
            </div>
          )}

          <div className="flex w-full mt-auto relative border-t border-grays-200">
            <input
              type="text"
              placeholder="Enter message here"
              className="w-full p-4 bg-black outline-none disabled:opacity-30 transition-colors"
              ref={inputRef}
              onChange={handleDisable}
              disabled={messagesLoading || userLoading}
              onKeyDown={(e) => {
                if (e.key == "Enter") {
                  handleSendMessage();
                }
              }}
            />
            <button
              disabled={disabled || userLoading || messagesLoading}
              onClick={handleSendMessage}
              className={`size-16 shrink-0 bg-black rotate-180 border-r border-grays-200 hover:bg-accent-200 transition-colors disabled:text-grays-300 ${
                disabled || userLoading || messagesLoading && "pointer-events-none"
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
      <div className="h-16 p-5 sm:hidden w-full" ></div>
    </div>
  );
};

export default MessagesContainer;
