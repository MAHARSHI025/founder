'use client';

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Card from "@/components/Card";
import { Globe } from "@/components/magicui/globe";
import { SmoothCursor } from "@/components/ui/smooth-cursor";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/profile");
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }
  return (
    <>
      <div className=" cursor-none hd w-full h-full">

        <SmoothCursor />
        {/* <Globe /> */}
        {/* <Card /> */}
      </div>
    </>
  );
}
