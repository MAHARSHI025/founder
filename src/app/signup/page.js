'use client'
import Login from '@/components/Login'
import Signup from '@/components/Signup'
import React, { useState } from 'react'

function Page() {

    const [action, setaction] = useState('signup')

    if (action === 'login') {
        return <div className=' h-screen flex justify-center items-center'>
            
            <Login setaction={setaction}/>
        </div>
    }

    return (
        <div className=' h-screen flex justify-center items-center'>
            
            <Signup setaction={setaction}/>
        </div>
    )
}

export default Page
