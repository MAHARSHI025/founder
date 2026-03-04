"use client";
import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { IconX, IconArticleOff } from "@tabler/icons-react";

function Postpopup({ onClose, posts }) {
  const modalRef = useRef(null);

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Handle click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  // Handle Escape key
  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const hasPosts = posts?.posts && posts.posts.length > 0;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-999 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      >
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl max-h-[85vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-100">
            <h2 className="font-bold text-lg">
              {posts?.organization_name}&apos;s Posts
            </h2>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <IconX size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5">
            {hasPosts ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {posts.posts.map((res, i) => (
                  <motion.div
                    key={res._id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="border border-neutral-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
                  >
                    {res.postimage && (
                      <img
                        src={res.postimage}
                        alt=""
                        className="w-full h-44 object-cover"
                        loading="lazy"
                      />
                    )}
                    <div className="p-3">
                      <p className="text-xs text-neutral-400 mb-1">
                        {res.createdAt?.split("T")[0]}
                      </p>
                      {res.description && (
                        <p className="text-sm text-neutral-700 line-clamp-3">
                          {res.description}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-neutral-400">
                <IconArticleOff size={40} stroke={1.5} />
                <p className="mt-3 text-sm">No posts yet.</p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default Postpopup;
