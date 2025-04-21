"use client"
import React, { useEffect, useRef, useState } from 'react'
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

function Page() {
    const { data: session, status } = useSession()
    const router = useRouter()
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (status === "authenticated" && session?.user?.isNewUser === false) {
            console.log("Redirecting to /signup")
            router.push("/signup")
        }
    }, [status, session, router])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!password) return alert("Please enter a password")
        setLoading(true)

        try {
            const res = await fetch('/api/users/update/password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: session.user.email,
                    password: password,
                }),
            })

            if (res.ok) {
                console.log("Password updated successfully")
                router.push("/signup") // example redirect
            } else {
                console.error("Failed to update password")
            }
        } catch (err) {
            console.error("Error:", err)
        } finally {
            setLoading(false)
        }
    }

    if (status === "loading") {
        return <div className="text-center mt-10">Loading...</div>
    }

    if (session?.user?.isNewUser === true) {
        return (
            <div className='text-center h-screen pb-20 items-center flex flex-col justify-center'>
                <h1 className='text-2xl font-semibold'>Create Password</h1>
                <form 
                    onSubmit={handleSubmit}
                    className='signup-input flex flex-col space-y-4 max-w-fit gap-0 mx-auto border p-6 rounded-lg my-2'
                >
                    <input 
                        type="password" 
                        name="password" 
                        maxLength="15" 
                        placeholder="Password" 
                        className="border p-2 rounded-lg"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button 
                        type="submit" 
                        className="bg-black text-xs text-white p-2 rounded-2xl cursor-pointer mt-2"
                        disabled={loading}
                    >
                        {loading ? "Updating..." : "Continue"}
                    </button>
                </form>
            </div>
        )
    }

    return null // fallback
}

export default Page
