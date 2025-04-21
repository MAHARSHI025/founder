"use client"
import React, { useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import Auther from '../components/Auther'
import { useRouter } from 'next/navigation'
import Loginform from '../components/Loginform'
import Myprofile from '../components/Myprofile'


function Page() {
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

    if (status === 'loading') {
        return <div className="flex justify-center items-center h-screen">Loading...</div>
    }

    if (session) {
        return (
            <div className='h-screen flex justify-center items-center'>
                <Myprofile />

            </div>
        )
    }

    return (
        <div className='text-center h-screen pb-20 items-center flex flex-col justify-center'>
            <h1 className='text-2xl font-semibold'>Signup</h1>
            <Loginform />
            <p>or</p>

            <Auther />
        </div>
    )
}

export default Page
