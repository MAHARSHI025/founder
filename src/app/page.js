'use client';

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Card from "@/components/Card";
import { PointerHighlight } from "@/components/ui/pointer-highlight";
import Link from "next/link";
import Elevation from "@/components/element/Elevation";
import { NumberTicker } from "@/components/NumberTicker";


export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();


  return (
    <>
      <div className=" flex flex-col  justify-center items-center mt-40 w-full">
        <div className="flex flex-col  justify-center items-center text-center">
          <h1 className=" text-xl sm:text-7xl mb-3 title font-medium">FOUNDER</h1>

          <div>

            <div className="flex justify-center items-center gap-1 text-[20px] sm:text-2xl font-medium flex-wrap">

              Wlc to the
              <div className="relative">

                <PointerHighlight
                  rectangleClassName="border-black rounded-md p-1"
                  pointerClassName="text-blue-900"
                  containerClassName="inline-block"
                >

                  <h1 className="px-2">business</h1>
                </PointerHighlight>
              </div>

              hub
            </div>

            <div>
              <h1 className=" text-[10px] sm:text-sm mt-2">a platform that provide a B-to-B connection</h1>
            </div>

            <div className=" flex  justify-center gap-2 mt-2">
              <Elevation >

                <Link
                  href={"/market"}
                  className=" font-bold"
                >
                  Get started
                </Link>
              </Elevation>
              <Elevation >

                <Link
                  href={"/"}
                  className=" font-bold"
                >
                  Read Docs
                </Link>
              </Elevation>

            </div>
          </div>
        </div>

        <div className="mt-28 w-full flex justify-center items-center gap-10 flex-wrap">
          <Elevation className="flex justify-center gap-2 basis-full md:basis-[30%]">
            <NumberTicker value={30} duration={1000} style={{ fontSize: "2.5rem" }} />
            <h1 className="font-semibold text-4xl">Clients</h1>
          </Elevation>

          <Elevation className="flex justify-center gap-2 basis-full md:basis-[30%]">
            <NumberTicker value={25} duration={1000} style={{ fontSize: "2.5rem" }} />
            <h1 className="font-semibold text-4xl">Connections</h1>
          </Elevation>

          <Elevation className="flex justify-center gap-2 basis-full md:basis-[30%]">
            <NumberTicker value={15} duration={1000} style={{ fontSize: "2.5rem" }} />
            <h1 className="font-semibold text-4xl">Verified Accounts</h1>
          </Elevation>
        </div>


        <div className="my-10 w-full flex justify-center  px-6 gap-10">
          <div className="flex flex-col gap-4 basis-full md:basis-[50%] bg-black p-10 rounded-lg text-center md:text-left">
            <h1 className="text-white text-4xl md:text-6xl font-semibold">
              Find, Collab & Grow
            </h1>
            <h2 className="text-white text-sm leading-relaxed text-justify">
              A smart B2B platform that connects businesses, streamlines communication,
              and accelerates growth through secure and seamless collaboration.
            </h2>
          </div>

          <div className="basis-full md:basis-[50%] px-6 rounded-lg  ">
            <div className="grid grid-cols-1 sm:grid-cols-2 grid-rows-2 gap-4 h-full ">
              <Elevation className="rounded-full p-3 bg-white flex items-center justify-center ">
                <h1 className="text-3xl font-bold">🤝 Make Contacts</h1>
              </Elevation>
              <Elevation className="rounded-full p-3 bg-white flex items-center justify-center">
                <h1 className="text-3xl font-bold">💼 Get Collab</h1>
              </Elevation>
              <Elevation className="rounded-full p-3 bg-white flex items-center justify-center">
                <h1 className="text-3xl font-bold">💬 Chat Partner</h1>
              </Elevation>
              <Elevation className="rounded-full p-3 bg-white flex items-center justify-center">
                <h1 className="text-3xl font-bold">📈 Business Profile</h1>
              </Elevation>
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
