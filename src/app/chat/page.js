"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // your backend URL

export default function ChatPage() {
  const { data: session, status } = useSession();
  const [message, setMessage] = useState("");
  const [receiver_email, setreceiver_email] = useState("");
  const [chat, setChat] = useState([]);

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
    if (!message || !receiver_email || !session?.user?.email) return;

    socket.emit("send_message", {
      sender_email: session.user.email,
      receiver_email,
      message,
    });

    setMessage("");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Welcome, {session?.user?.email || "Guest"}</h2>

      <form onSubmit={sendMessage} style={{ marginBottom: "20px" }}>
        <input
          type="email"
          placeholder="Receiver's Email"
          value={receiver_email}
          onChange={(e) => setreceiver_email(e.target.value)}
          required
          style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
        />
        <input
          type="text"
          placeholder="Your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
        />
        <button type="submit" style={{ padding: "10px 20px" }}>
          Send
        </button>
      </form>

      <div style={{ maxHeight: "300px", overflowY: "auto" }}>
        {chat.map((msg, index) => (
          <div
            key={index}
            style={{
              padding: "10px",
              background: msg.sender_email === session?.user?.email ? "#e1ffc7" : "#f0f0f0",
              marginBottom: "10px",
              borderRadius: "5px",
            }}
          >
            <strong>{msg.sender_email}</strong>: {msg.message}
          </div>
        ))}
      </div>
    </div>
  );
}
