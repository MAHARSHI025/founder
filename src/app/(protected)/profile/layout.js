"use client"
import Login from '@/components/Login';
// layout.jsx
import dynamic from "next/dynamic";
const Signup = dynamic(() => import('@/components/Signup'), { ssr: false });

import { signOut, useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { redirect } from 'next/navigation';

function Layout({ children }) {

    const { data: session, status } = useSession();


    return (
        <div className=' flex flex-col '>

            {children}
        </div>
    )
}

export default Layout
