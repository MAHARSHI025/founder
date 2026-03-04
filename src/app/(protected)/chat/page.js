"use client";

import MainLoader from "@/components/MainLoader";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { motion } from "motion/react";
import { IconMessages, IconLock, IconBolt } from "@tabler/icons-react";

const Chatsection = dynamic(() => import("@/components/Chatsection"), {
  suspense: true,
});

export default function Page() {
  return (
    <div className="w-full min-h-screen bg-linear-to-b from-neutral-50 to-white px-3 sm:px-4 pt-10 pb-8">
      <div className="max-w-5xl mx-auto">
        

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05, ease: "easeOut" }}
          className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm"
        >
          <Suspense
            fallback={
              <div className="min-h-[55vh] flex items-center justify-center">
                <MainLoader />
              </div>
            }
          >
            <Chatsection />
          </Suspense>
        </motion.div>
      </div>
    </div>
  );
}
