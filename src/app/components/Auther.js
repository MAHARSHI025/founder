"use client"
import { useSession, signIn, signOut } from "next-auth/react"
import { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"

export default function Auther() {


  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    console.log("status", status)
    console.log("session", session)

    if (
      status === "authenticated" &&
      session?.user?.isNewUser
    ) {
      console.log("Redirecting to /createpassword")
      router.push("/createpassword")
    }
    
  }, [status, session])

  if (status === "loading") {
    return <div className="text-center text-black">Checking session...</div>
  }

  if (status === "authenticated") {
    return (
      <div className="flex justify-center items-center gap-2">
        Signed in as {session.user?.name}
        <div className="flex text-nowrap bg-white border py-2 px-5 rounded-xl gap-2 items-center justify-between">
          <img className="h-6" src={session.user?.image || ""} alt="user" />
          <button className="" onClick={() => signOut()}>Sign out</button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-center">
      <div
        className="flex text-nowrap bg-white border py-2 px-5 rounded-xl gap-2 items-center justify-between cursor-pointer"
      >
        <img
          className="h-6"
          src="https://yt3.googleusercontent.com/2eI1TjX447QZFDe6R32K0V2mjbVMKT5mIfQR-wK5bAsxttS_7qzUDS1ojoSKeSP0NuWd6sl7qQ=s900-c-k-c0x00ffffff-no-rj"
          alt="default"
        />
        <button onClick={() => signIn("google", { callbackUrl: "/createpassword" })}>Continue with Google</button>
      </div>
    </div>
  )
}
