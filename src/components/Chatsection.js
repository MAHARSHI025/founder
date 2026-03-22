"use client";

import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { io } from "socket.io-client";
import Scrollhandle from "@/components/Scrollhandle";
import { useSearchParams } from "next/navigation";
import Chattopsection from "@/components/Chattopsection";
import MainLoader from "./MainLoader";
import { IconFileDescription, IconMoodEmpty, IconPaperclip, IconSend2, IconX } from "@tabler/icons-react";

// const BACKEND_URL = "https://founder-backend-l3na.onrender.com";
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const CHAT_PAGE_SIZE = 10;

const IMAGE_EXTENSION_PATTERN = /\.(png|jpe?g|gif|webp|bmp|svg|avif)(\?|$)/i;

const isImageFromUrl = (url = "") => IMAGE_EXTENSION_PATTERN.test(url);

const getFileNameFromUrl = (url = "") => {
  if (!url) return "attachment";
  const cleanUrl = url.split("?")[0] || "";
  const parts = cleanUrl.split("/");
  const fileName = parts[parts.length - 1];
  return decodeURIComponent(fileName || "attachment");
};

const getAttachmentMeta = (file = {}) => {
  const url = file.url || "";
  const originalName = file.original_name || getFileNameFromUrl(url);
  const extensionFromName = originalName.includes(".")
    ? originalName.split(".").pop()?.toLowerCase()
    : "";

  const extension = (file.format || extensionFromName || "file").toLowerCase();
  const isImage = file.resource_type === "image" || isImageFromUrl(url);

  const toneByExtension = {
    pdf: {
      badge: "PDF",
      tone: "bg-red-100 text-red-700 border-red-200",
      cardTone: "bg-red-50/70 border-red-200",
    },
    doc: {
      badge: "DOC",
      tone: "bg-blue-100 text-blue-700 border-blue-200",
      cardTone: "bg-blue-50/70 border-blue-200",
    },
    docx: {
      badge: "DOCX",
      tone: "bg-blue-100 text-blue-700 border-blue-200",
      cardTone: "bg-blue-50/70 border-blue-200",
    },
    xls: {
      badge: "XLS",
      tone: "bg-emerald-100 text-emerald-700 border-emerald-200",
      cardTone: "bg-emerald-50/70 border-emerald-200",
    },
    xlsx: {
      badge: "XLSX",
      tone: "bg-emerald-100 text-emerald-700 border-emerald-200",
      cardTone: "bg-emerald-50/70 border-emerald-200",
    },
    zip: {
      badge: "ZIP",
      tone: "bg-amber-100 text-amber-700 border-amber-200",
      cardTone: "bg-amber-50/70 border-amber-200",
    },
    rar: {
      badge: "RAR",
      tone: "bg-amber-100 text-amber-700 border-amber-200",
      cardTone: "bg-amber-50/70 border-amber-200",
    },
  };

  const tone = toneByExtension[extension] || {
    badge: extension.toUpperCase().slice(0, 5),
    tone: "bg-neutral-200 text-neutral-700 border-neutral-300",
    cardTone: "bg-neutral-100/70 border-neutral-200",
  };

  return {
    url,
    originalName,
    extension,
    isImage,
    badge: tone.badge,
    toneClass: tone.tone,
    cardToneClass: tone.cardTone,
  };
};

export default function Chatsection() {
  const { data: session } = useSession();
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMoreChats, setHasMoreChats] = useState(true);
  const [nextPage, setNextPage] = useState(2);
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorText, setErrorText] = useState("");

  const searchParams = useSearchParams();
  const urlemail = searchParams.get("email");

  const socketRef = useRef(null);
  const fileInputRef = useRef(null);
  const chatScrollRef = useRef(null);

  useEffect(() => {
    socketRef.current = io(BACKEND_URL);

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
      setChat((prev) => {
        if (data?._id && prev.some((msg) => msg._id === data._id)) return prev;
        return [...prev, data];
      });
    });

    return () => {
      socket.off("receive_message");
    };
  }, [session?.user?.email]);

  useEffect(() => {
    if (!session?.user?.email || !urlemail) return;

    const fetchMessages = async () => {
      setLoading(true);
      setHasMoreChats(true);
      setNextPage(2);

      try {
        const res = await fetch(`${BACKEND_URL}/api/fetch`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sender_email: session.user.email,
            receiver_email: urlemail,
            page: 1,
            limit: CHAT_PAGE_SIZE,
          }),
        });

        const data = await res.json();
        const pageMessages = Array.isArray(data?.data) ? data.data.reverse() : [];
        setChat(pageMessages);
        setHasMoreChats(Boolean(data?.pagination?.hasMore));
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [session?.user?.email, urlemail]);

  const loadOlderMessages = async () => {
    if (
      !session?.user?.email ||
      !urlemail ||
      isLoadingMore ||
      loading ||
      !hasMoreChats
    ) {
      return;
    }

    const el = chatScrollRef.current;
    const previousScrollHeight = el?.scrollHeight || 0;
    const previousScrollTop = el?.scrollTop || 0;

    setIsLoadingMore(true);

    try {
      const res = await fetch(`${BACKEND_URL}/api/fetch`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sender_email: session.user.email,
          receiver_email: urlemail,
          page: nextPage,
          limit: CHAT_PAGE_SIZE,
        }),
      });

      const data = await res.json();
      const olderMessages = Array.isArray(data?.data) ? data.data.reverse() : [];

      if (olderMessages.length) {
        setChat((prev) => {
          const existingIds = new Set(prev.map((msg) => msg._id));
          const uniqueOlder = olderMessages.filter((msg) => !existingIds.has(msg._id));
          return [...uniqueOlder, ...prev];
        });

        requestAnimationFrame(() => {
          const currentEl = chatScrollRef.current;
          if (!currentEl) return;
          const newScrollHeight = currentEl.scrollHeight;
          currentEl.scrollTop = previousScrollTop + (newScrollHeight - previousScrollHeight);
        });
      }

      setHasMoreChats(Boolean(data?.pagination?.hasMore));
      setNextPage((prev) => prev + 1);
    } catch (error) {
      console.error("Error loading older messages:", error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const clearSelectedFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      setErrorText("Maximum file size is 10 MB.");
      clearSelectedFile();
      return;
    }

    setErrorText("");
    setSelectedFile(file);
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    const trimmedMessage = message.trim();

    if ((!trimmedMessage && !selectedFile) || !urlemail || !session?.user?.email || isSending || isUploading) return;

    setIsSending(true);
    setErrorText("");

    try {
      let uploadedFile = null;

      if (selectedFile) {
        setIsUploading(true);

        const formData = new FormData();
        formData.append("file", selectedFile);

        const uploadResponse = await fetch(`${BACKEND_URL}/api/upload`, {
          method: "POST",
          body: formData,
        });

        const uploadData = await uploadResponse.json();

        const fallbackFile = uploadData?.url
          ? {
              url: uploadData.url,
              resource_type: selectedFile.type?.startsWith("image/") ? "image" : "raw",
              original_name: selectedFile.name,
              bytes: selectedFile.size,
              format: selectedFile.name?.split(".").pop()?.toLowerCase(),
            }
          : null;

        const normalizedUploadedFile = uploadData?.file || fallbackFile;

        if (!uploadResponse.ok || !normalizedUploadedFile?.url) {
          throw new Error(uploadData?.error || "File upload failed");
        }

        uploadedFile = normalizedUploadedFile;
      }

      socketRef.current.emit("send_message", {
        sender_email: session.user.email,
        receiver_email: urlemail,
        message: trimmedMessage,
        file: uploadedFile,
      });

      setMessage("");
      clearSelectedFile();
    } catch (error) {
      setErrorText(error?.message || "Unable to send message");
    } finally {
      setIsUploading(false);
      setTimeout(() => setIsSending(false), 180);
    }
  };

  if (loading) return <MainLoader />;

  return (
    <div className="w-full max-w-4xl mx-auto h-[90dvh] flex flex-col">
      <Chattopsection email={urlemail || "Select a contact"} />

      <div className="flex-1 bg-neutral-50/60 flex flex-col p-4 rounded-2xl mt-4 justify-between items-center">
        {chat.length > 0 ? (
          <Scrollhandle trigger={chat.length} onReachTop={loadOlderMessages} containerRef={chatScrollRef}>
            {isLoadingMore ? (
              <div className="py-2 text-center text-xs text-neutral-500">Loading older messages...</div>
            ) : null}
            {chat.map((msg, index) => {
              const isSender = msg.sender_email === session?.user?.email;
              const attachment = msg.file?.url ? getAttachmentMeta(msg.file) : null;
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
                      {msg.message ? <p>{msg.message}</p> : null}
                      {attachment ? (
                        <div className={msg.message ? "mt-2" : ""}>
                          {attachment.isImage ? (
                            <img
                              src={attachment.url}
                              alt={attachment.originalName}
                              className="max-h-52 rounded-lg border border-black/10"
                            />
                          ) : (
                            <a
                              href={attachment.url}
                              target="_blank"
                              rel="noreferrer"
                              className={`mt-1 flex w-full min-w-55 max-w-90 items-center gap-2 rounded-xl border px-2.5 py-2 transition-colors hover:opacity-90 ${
                                isSender ? "bg-white/10 border-white/20" : attachment.cardToneClass
                              }`}
                            >
                              <span className={`rounded-lg border p-1.5 ${isSender ? "bg-white/15 border-white/20 text-white" : "bg-white border-neutral-200 text-neutral-700"}`}>
                                <IconFileDescription size={16} />
                              </span>
                              <span className="min-w-0 flex-1">
                                <span className={`block truncate text-xs font-medium ${isSender ? "text-white" : "text-neutral-800"}`}>
                                  {attachment.originalName}
                                </span>
                                <span
                                  className={`mt-1 inline-flex rounded-md border px-1.5 py-0.5 text-[10px] font-semibold uppercase ${
                                    isSender ? "bg-white/15 border-white/25 text-white" : attachment.toneClass
                                  }`}
                                >
                                  {attachment.badge}
                                </span>
                              </span>
                            </a>
                          )}
                        </div>
                      ) : null}
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
        {selectedFile ? (
          <div className="mb-2 flex items-center justify-between rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2 text-xs">
            <div className="min-w-0 flex items-center gap-2 pr-2">
              <span
                className={`shrink-0 rounded-md border px-1.5 py-0.5 text-[10px] font-semibold uppercase ${
                  selectedFile.type?.includes("pdf")
                    ? "bg-red-100 text-red-700 border-red-200"
                    : "bg-neutral-200 text-neutral-700 border-neutral-300"
                }`}
              >
                {selectedFile.type?.includes("pdf")
                  ? "PDF"
                  : selectedFile.name?.split(".").pop()?.toUpperCase() || "FILE"}
              </span>
              <span className="truncate">{selectedFile.name}</span>
            </div>
            <button
              type="button"
              onClick={clearSelectedFile}
              className="text-neutral-500 hover:text-neutral-700"
              aria-label="Remove selected file"
            >
              <IconX size={14} />
            </button>
          </div>
        ) : null}

        {errorText ? <p className="mb-2 text-xs text-red-600">{errorText}</p> : null}

        <div className="flex items-center gap-2">
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={!urlemail || isSending || isUploading}
            className="inline-flex items-center justify-center border border-neutral-300 text-neutral-700 rounded-xl w-10 h-10 hover:bg-neutral-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Attach file"
          >
            <IconPaperclip size={16} />
          </button>
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
            disabled={(!message.trim() && !selectedFile) || isSending || isUploading || !urlemail}
            className="inline-flex items-center gap-1.5 bg-black text-white rounded-xl px-4 py-2.5 text-sm font-medium hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <IconSend2 size={16} />
            {isUploading ? "Uploading..." : "Send"}
          </button>
        </div>
      </form>
    </div>
  );
}
