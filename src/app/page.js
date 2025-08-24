'use client';

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Card from "@/components/Card";
import { PointerHighlight } from "@/components/ui/pointer-highlight";
import Link from "next/link";
import Lottie from "@/components/Lottie";


export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();


  return (
    <>
      <div className=" flex flex-col  justify-center items-center h-screen w-screen">
        <div className="flex flex-col  justify-center items-center text-center">
          {/* <Lottie /> */}
          <h1 className=" text-5xl sm:text-8xl mb-10 title font-medium">FOUNDER</h1>

          <div>

              <div className="flex justify-center items-center gap-1 text-[30px] sm:text-6xl font-medium flex-wrap">

                Wlc to the
                <div className="relative">

                  <PointerHighlight
                    rectangleClassName="border-black rounded-md p-1"
                    pointerClassName="text-blue-900"
                    containerClassName="inline-block"
                  >

                    <h1 className="px-2"> business </h1>
                  </PointerHighlight>
                </div>

                hub
              </div>

              <div>
                <h1 className=" text-[10px] sm:text-xl mt-6">a platform that provide a B-to-B connection</h1>
              </div>

              <div className=" flex  justify-center gap-2 mt-2">
                <Link href={"/market"} className=" border-b border-b-black">Get started</Link>
                <Link href={"/"} className=" border-b border-b-black">Read docs</Link>
              </div>
          </div>
        </div>

        <div className="fixed bottom-1 text-xs">
          <h1 className=" text-neutral-400">Founder by thoughter</h1>
        </div>
      </div >
    </>
  );
}
