"use client";

import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { io } from "socket.io-client";
import Scrollhandle from "@/components/Scrollhandle";
import { useSearchParams } from "next/navigation";
import Chattopsection from "@/components/Chattopsection";
import MainLoader from "./MainLoader";
import { IconMoodEmpty, IconSend2 } from "@tabler/icons-react";

export default function Chatsection() {
  const { data: session } = useSession();
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const searchParams = useSearchParams();
  const urlemail = searchParams.get("email");

  const socketRef = useRef(null);

  useEffect(() => {
    // socketRef.current = io("http://localhost:5000");
    socketRef.current = io("https://founder-backend-l3na.onrender.com");

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    const socket = socketRef.current;

    if (!socket || !session?.user?.email) return;

    socket.emit("join", session.user.email);

    socket.off("receive_message");
    socket.on("receive_message", (data) => {
      setChat((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, [session?.user?.email]);

  useEffect(() => {
    if (!session?.user?.email || !urlemail) return;

    const fetchMessages = async () => {
      setLoading(true);

      try {
        const res = await fetch("https://founder-backend-l3na.onrender.com/api/fetch", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sender_email: session.user.email,
            receiver_email: urlemail,
          }),
        });

        const data = await res.json();
        if (data?.data) {
          setChat(data.data.reverse());
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [session?.user?.email, urlemail]);

  const sendMessage = (e) => {
    e.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage || !urlemail || !session?.user?.email || isSending) return;

    setIsSending(true);

    socketRef.current.emit("send_message", {
      sender_email: session.user.email,
      receiver_email: urlemail,
      message: trimmedMessage,
    });

    setMessage("");
    setTimeout(() => setIsSending(false), 180);
  };

  if (loading) return <MainLoader />;

  return (
    <div className="w-full max-w-4xl mx-auto h-[90vh] flex flex-col">
      <Chattopsection email={urlemail || "Select a contact"} />

      <div className="flex-1 bg-neutral-50/60">
        {chat.length > 0 ? (
          <Scrollhandle trigger={chat.length}>
            {chat.map((msg, index) => {
              const isSender = msg.sender_email === session?.user?.email;
              return (
                <div
                  key={`${msg.sender_email}-${msg.message}-${index}`}
                  className={`mb-3 flex ${isSender ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[82%] sm:max-w-[70%] ${isSender ? "items-end" : "items-start"} flex flex-col`}>
                    <span className="text-[11px] text-neutral-400 mb-1 px-1">
                      {isSender ? "You" : msg.sender_email}
                    </span>
                    <div
                      className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed wrap-break-word border ${
                        isSender
                          ? "bg-black text-white border-black rounded-br-md"
                          : "bg-white text-neutral-800 border-neutral-200 rounded-bl-md"
                      }`}
                    >
                      {msg.message}
                    </div>
                  </div>
                </div>
              );
            })}
          </Scrollhandle>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-neutral-400 px-4 text-center">
            <IconMoodEmpty size={38} className="opacity-60" />
            <p className="mt-2 text-sm">No messages yet</p>
            <p className="text-xs mt-1">Start the conversation by sending a message below.</p>
          </div>
        )}
      </div>

      <form
        onSubmit={sendMessage}
        className="sticky bottom-0 w-full p-3 border-t border-neutral-200 bg-white"
      >
        <div className="flex items-center gap-2">
          <input
            type="text"
            autoComplete="off"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 border border-neutral-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
          />
          <button
            type="submit"
            disabled={!message.trim() || isSending || !urlemail}
            className="inline-flex items-center gap-1.5 bg-black text-white rounded-xl px-4 py-2.5 text-sm font-medium hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <IconSend2 size={16} />
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
