import { useRouter } from 'next/navigation'
import React from 'react'

function Chattopsection({ email }) {

    const router = useRouter()

    return ( 
        <div className='  bg-white shadow sticky top-0 p-4 flex gap-2 items-center w-[calc(100vw-10px)] min-w-2xs max-w-7xl' >
            <button className=' flex cursor-pointer' onClick={() => router.push("/contact")}><span className="material-symbols-outlined "
                style={{
                    fontSize:"15px",
                    fontVariationSettings: "'FILL' 0, 'wght' 300, 'GRAD' 100, 'opsz' 30"
                }}
            >
                arrow_back
            </span></button>
            <h1>{email}</h1>
        </div>
    )
}

export default Chattopsection
