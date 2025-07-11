import Link from 'next/link'
import React from 'react'

function Navbar() {
    return (
        <div className='flex justify-center'>
            <div className=' flex gap-6 justify-center bg-black text-white mb-2 px-5 py-3 rounded-full mt-1 '>

                <Link href={'/'}>Home</Link>
                <Link href={'/profile'}>Market</Link>
                <Link href={'/profile'}>User</Link>
            </div>
        </div>
    )
}

export default Navbar
