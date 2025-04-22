"use client";
import React, { useEffect, useState } from 'react';
import { io } from "socket.io-client";
import { useSession } from 'next-auth/react'

// Connect to the backend server
const socket = io("https://founder-socket.vercel.app/");
// const socket = io("http://localhost:5000");

function Socket() {
    const { data: session, status } = useSession();
    const [chat, setChat] = useState("");  
    const [messages, setMessages] = useState([]);  

    // Handle sending the chat message
    const sendChat = () => {
        if (chat.trim()) {
            socket.emit("chat", { chat: chat, name: session?.user?.name });
            setChat("");  // Clear the input field after sending
        }
    };

    // Listen for incoming chat messages from the server
    useEffect(() => {
        socket.on("chat", ({ chat, id }) => {
            setMessages((prev) => [...prev, { chat, id, name: session?.user?.name }]);
        });

        // Cleanup on component unmount
        return () => {
            socket.off("chat");
        };
    }, [session]);

    return (
        <div className="flex justify-center items-center flex-col m-6 p-1">
            <div className="flex mb-4">
                <input
                    type="text"
                    className="border text-xl p-2 rounded-xs"
                    placeholder="Type your message"
                    value={chat}
                    onChange={(e) => setChat(e.target.value)}
                />
                <button
                    onClick={sendChat}
                    className="ml-1 bg-black text-white text-xl p-2 rounded-xs"
                >
                    Send
                </button>
            </div>

            {/* Display the chat messages */}
            <div className="w-full max-w-md space-y-2">
                {messages.map((msg, index) => (
                    <div key={index} className="bg-gray-50 border-b w-min text-nowrap border-b-gray-200 p-3 rounded-xl shadow">
                        <p className="text-xs text-gray-500">{msg.name}</p>
                        <p className="text-lg">{msg.chat}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Socket;
