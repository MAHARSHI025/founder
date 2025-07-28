import { useRouter } from 'next/navigation'
import React from 'react'

function Contactcard({ email, organization_name, city, image }) {

  const router = useRouter()

  return (
    <div className=' border-neutral-600 border p-4 rounded-2xl flex justify-between '>
      <div className=' flex gap-2 items-center  sm:min-w-xs'>

        <div>
          <img src={image} alt="" className=' h-[50px] w-[50px]  object-cover rounded-full border' />
        </div>
        <div className=' flex flex-col'>
          <h1 className='text-[10px]'>{email}</h1>
          <h1>{organization_name}</h1>
          <h1 className=' text-neutral-400 text-[8px] '>{city}</h1>
        </div> 
      </div>
      <div className='flex gap-2 justify-center items-center'>
        <button className=' flex cursor-pointer'><span className="material-symbols-outlined text-sm text-neutral-300" style={{
          fontVariationSettings: "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 30"
        }}>
          delete
        </span></button>

        <button className=' flex cursor-pointer' onClick={() => router.push(`/chat?email=${encodeURIComponent(email)}`)}><span className="material-symbols-outlined text-sm text-neutral-300" style={{
          fontVariationSettings: "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 30"
        }}>
          chat
        </span></button>

      </div>
    </div>
  )
}

export default Contactcard
