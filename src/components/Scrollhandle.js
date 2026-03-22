"use client";
import { useEffect, useRef, useState } from "react";

function Scrollhandle({ children, trigger, onReachTop, containerRef }) {
  const internalRef = useRef(null);
  const scrollRef = containerRef || internalRef;
  const topTriggerLock = useRef(false);
  const [isAtBottom, setIsAtBottom] = useState(true);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight <= 50;
      setIsAtBottom(atBottom);

      if (!onReachTop) return;

      if (el.scrollTop <= 30) {
        if (!topTriggerLock.current) {
          topTriggerLock.current = true;
          onReachTop();
        }
      } else if (el.scrollTop > 80) {
        topTriggerLock.current = false;
      }
    };

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, [onReachTop, scrollRef]);

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
      className="flex flex-col  max-w-3xl w-[calc(100vw-10px)]  h-[70vh] mb-20  overflow-y-scroll scrollbar-hide p-2 scroll-smooth"
    >
      {children}
    </div>
  );
}

export default Scrollhandle;
