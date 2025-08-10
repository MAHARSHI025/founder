"use client";
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';

function Postpopup({ onClose, posts }) {
  const modalRef = useRef(null);

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

  return (
    <div className="fixed inset-0 backdrop-blur-2xl w-screen flex items-center justify-center z-1000 bg-opacity-70">
      <div ref={modalRef} className="relative w-full h-full max-w-3xl bg-white rounded-lg shadow-lg overflow-y-auto pt-15 flex flex-col">
        <button
          className="absolute top-4 right-6 text-3xl text-gray-500 hover:text-black focus:outline-none"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center">{posts?.organization_name}&apos;s Posts</h2>
        {posts && posts.posts && posts.posts.length > 0 ? (
          <div className="flex flex-wrap gap-6 justify-center">
            {posts.posts.map((res) => (
              <div className="shadow border border-gray-300 text-center rounded-2xl max-w-xs flex flex-col p-4 gap-4 relative" key={res._id}>
                <div className="text-left">
                  <img src={res.postimage} alt="" className="rounded-2xl object-cover max-h-60 w-full" />
                  <h5 className="text-sm text-neutral-600 my-2">{res.createdAt?.split("T")[0]}</h5>
                  <h3>{res.description}</h3>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No posts found.</p>
        )}
      </div>
    </div>
  );
}

export default Postpopup;
