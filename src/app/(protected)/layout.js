'use client'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

function Layout({ children }) {
    const { data: session, status } = useSession();
    const router = useRouter()


    useEffect(() => {
        if (status === 'unauthenticated') {
            console.log('kkkkkkkkk');
            router.push('/login')
        }
    }, [status, router])

    console.log('calllllll');


    return (
        <>
            {children}
        </>
    )
}

export default Layout
