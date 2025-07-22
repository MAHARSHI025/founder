"use client";

import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { io } from "socket.io-client";
import Scrollhandle from "@/components/Scrollhandle";
import { useSearchParams } from "next/navigation";
import Chattopsection from "@/components/Chattopsection";

const socket = io("https://founder-backend-l3na.onrender.com"); // production URL
// const socket = io("http://localhost:5000"); // development URL

export default function ChatPage() {
  const { data: session } = useSession();
  const [message, setMessage] = useState("");
  const [receiver_email, setreceiver_email] = useState("");
  const [chat, setChat] = useState([]);

  const searchParams = useSearchParams();
  const urlemail = searchParams.get('email');
  // console.log(urlemail);



  useEffect(() => {
    if (session?.user?.email) {
      socket.emit("join", session.user.email);
    }

    socket.on("receive_message", (data) => {
      setChat((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, [session]);


  const sendMessage = (e) => {
    e.preventDefault();
    setreceiver_email(urlemail)
    if (!message || !receiver_email || !session?.user?.email) return;

    socket.emit("send_message", {
      sender_email: session.user.email,
      receiver_email,
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
                    msg.sender_email === session?.user?.email
                      ? "right"
                      : "left",
                  float:
                    msg.sender_email === session?.user?.email
                      ? "right"
                      : "left",
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
          className="fixed pb-1 bottom-0  bg-white w-[calc(100vw-10px)] flex justify-center items-center mb-4"

        >
          <input
            type="text"
            name="organization_name"
            autoComplete="off"
            placeholder="Enter message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="border rounded-lg  px-4 py-2 w-[calc(100vw-10px)] max-w-[300px] border-gray-400  mr-1"
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
