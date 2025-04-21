"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

function Navbar() {
    const { data: session, status } = useSession()
    const [image, setImage] = useState("")
    const router = useRouter()

    useEffect(() => {
        if (session?.user?.image) {
            setImage(session.user.image)
        }
    }, [session])

    const redirect = () => {
        router.push("/signup")
    }

    return (
        <div className='flex justify-center items-center navbar'>
            <div className='flex items-center justify-center bg-black text-white gap-5 w-min rounded-full px-10 py-2 mt-1'>
                <h3  className='cursor-pointer'><Link href="/">Home</Link></h3>
                <h3  className='cursor-pointer'><Link href="/market">Market</Link></h3>

                {image ? (
                    <img 
                        onClick={redirect}
                        src={image}
                        alt="User"
                        className="w-7 h-7 rounded-full object-cover cursor-pointer"
                    />
                ) : (
                    <h3 className='cursor-pointer' ><Link href="/signup">Profile</Link></h3>
                )}

            </div>
        </div>
    )
}

export default Navbar
