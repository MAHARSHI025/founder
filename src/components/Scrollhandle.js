"use client";
import { useEffect, useRef, useState } from "react";

function Scrollhandle({ children, trigger }) {
    
    const scrollRef = useRef(null);
    const [isAtBottom, setIsAtBottom] = useState(true);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const atBottom =
        el.scrollHeight - el.scrollTop - el.clientHeight <= 50;
      setIsAtBottom(atBottom);
    };

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || !isAtBottom) return;

    el.scrollTo({
      top: el.scrollHeight,
      behavior: "smooth",
    });
  }, [trigger, isAtBottom]);

  return (
    <div
      ref={scrollRef}
      className="flex flex-col w-max min-w-[60%] max-w-[70%] h-[400px] max-h-fit overflow-y-scroll scrollbar-hide p-2 scroll-smooth"
    >
      {children}
    </div>
  );
}

export default Scrollhandle;
