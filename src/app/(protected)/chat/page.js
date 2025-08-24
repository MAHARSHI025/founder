"use client";

import MainLoader from "@/components/MainLoader";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const Chatsection = dynamic(() => import("@/components/Chatsection"), {
  suspense: true,
});

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <Suspense
        fallback={
          <MainLoader />
        }
      >
        <Chatsection />
      </Suspense>
    </div>
  );
}
