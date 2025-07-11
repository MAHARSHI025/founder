"use client"
import Fetchpost from '@/components/Fetchpost'
import UploadPost from '@/components/Uploadpost'
import React, { useState } from 'react'

function Page() {

    const [action, setaction] = useState("posts")

    if (action === "add") {
        return (
            <UploadPost setaction={setaction} />
        )
    }
    return (
        <div className=' flex justify-center flex-col items-center m-4'>
            <Fetchpost/>
            <div className='flex justify-start items-start fixed bottom-5 right-5'>
                <button className=' bg-black text-white px-3 flex justify-center items-center py-1 rounded-full cursor-pointer h-16 w-16 z-50' onClick={() => { setaction("add") }}>
                    <span className="material-symbols-outlined">
                        add_2
                    </span>
                </button>
            </div>
        </div>
    )
}

export default Page
