"use client";

import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { io } from "socket.io-client";
import Scrollhandle from "@/components/Scrollhandle";
import { useSearchParams } from "next/navigation";
import Chattopsection from "@/components/Chattopsection";

export default function ChatPage() {
  const { data: session } = useSession();
  const [message, setMessage] = useState("");
  const [receiver_email, setreceiver_email] = useState("");
  const [chat, setChat] = useState([]);
  const searchParams = useSearchParams();
  const urlemail = searchParams.get('email');

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
      console.log("data from socket", data);
      setChat((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, [session?.user?.email]);

  useEffect(() => {
  if (!session?.user?.email || !urlemail) return;

  const fetchMessages = async () => {
    try {
      // const res = await fetch("http://localhost:5000/api/fetch", {
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
        // reverse to show oldest first
        setChat(data.data.reverse());
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  fetchMessages();
}, [session?.user?.email, urlemail]);



  const sendMessage = (e) => {
    e.preventDefault();
    setreceiver_email(urlemail);

    if (!message || !urlemail || !session?.user?.email) return;
    socketRef.current.emit("send_message", {
      sender_email: session.user.email,
      receiver_email: urlemail,
      message,
    });

    setMessage("");
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <div className="flex justify-center items-center w-screen flex-col">
        <Chattopsection email={urlemail} />
        <Scrollhandle trigger={chat.length}>
          {chat.map((msg, index) => (
            <div key={index}>
              <div
                style={{
                  textAlign:
                    msg.sender_email === session?.user?.email ? "right" : "left",
                  float:
                    msg.sender_email === session?.user?.email ? "right" : "left",
                }}
                className="max-w-2xl"
              >
                <h5
                  style={{
                    display: "flex",
                    fontWeight: "500",
                    justifyContent:
                      msg.sender_email === session?.user?.email
                        ? "right"
                        : "left",
                  }}
                  className="mb-1"
                >
                  {msg.sender_email === session?.user?.email
                    ? "You"
                    : msg.sender_email}
                </h5>

                <h6
                  style={{
                    padding: "10px",
                    background:
                      msg.sender_email === session?.user?.email
                        ? "#f0f0f0"
                        : "rgb(239 255 224)",
                    marginBottom: "10px",
                    minWidth: "5rem",
                    borderRadius: "5px",
                  }}
                >
                  {msg.message}
                </h6>
              </div>
            </div>
          ))}
        </Scrollhandle>
      </div>

      <div className="flex justify-center ">
        <form
          onSubmit={sendMessage}
          className="fixed pb-1 bottom-0 bg-white w-[calc(100vw-10px)] flex justify-center items-center mb-4"
        >
          <input
            type="text"
            autoComplete="off"
            placeholder="Enter message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="border rounded-lg px-4 py-2 w-[calc(100vw-10px)] max-w-[300px] border-gray-400 mr-1"
          />
          <button
            type="submit"
            className="bg-black text-white rounded-full px-6 py-2"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
