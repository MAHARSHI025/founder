"use client"
import React from 'react'
import Maincard from '../components/Maincard'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import Profileimage from '../components/Profieimage'



function page() {


  const { data: session, status } = useSession()

  if (status === 'loading') return <p>Loading...</p>
  if (status === 'unauthenticated') {
    // This will rarely be hit if middleware is used
    redirect('/signup')
    return 'Access denied'
  }

  return (
    <>
      <div className='h-screen flex flex-col justify-center items-center mt-4'>
        {/* <h1>Welcome, {session?.user?.name}</h1> */}
        <Maincard />
        {/* <Profileimage/> */}
      </div>
    </>
  )
}

export default page
