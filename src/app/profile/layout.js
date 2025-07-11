"use client"
import Login from '@/components/Login';
// layout.jsx
import dynamic from "next/dynamic";
const Signup = dynamic(() => import('@/components/Signup'), { ssr: false });

import { signOut, useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'

function Layout({ children }) {

    const { data: session, status } = useSession();
    const [action, setaction] = useState('signup');

    useEffect(() => {

        if (session && status === 'authenticated') {
            setaction("authenticated");
        }
    }, [session, status]);


    if (action === 'signup') {
        return <Signup setaction={setaction} />;
    }
    if (action === 'login') {
        return <Login setaction={setaction} />;
    }


    return (
        <div className=' flex flex-col mt-4 '>

            {children}
        </div>
    )
}

export default Layout
