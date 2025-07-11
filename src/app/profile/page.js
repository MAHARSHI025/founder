"use client";
import Login from '@/components/Login';
import Profile from '@/components/Profile.js';
import Signup from '@/components/Signup'
import { useSession } from 'next-auth/react';
import React, { useState } from 'react'

export default function Page() {

    // const { data: session, status } = useSession();
    // const [action, setaction] = useState('signup');

    // if (session && status === 'authenticated') {
    //     return <Profile />;
    // }
    // if (action === 'signup') {
    //     return <Signup setaction={setaction} />;
    // }

    return (
        <div>
            {/* <Login setaction={setaction}/> */}
            <Profile />
        </div>
    );
}
