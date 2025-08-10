import { useRouter } from 'next/navigation'
import React from 'react'

function Contactcard({ email, organization_name, city, image }) {

  console.log(organization_name);
  

  const router = useRouter()

  return (
    <div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:shadow-md transition-all duration-200 min-w-full'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-4 flex-1 min-w-0'>
          {/* Profile Image */}
          <div className='flex-shrink-0'>
            <img 
              src={image} 
              alt={`${organization_name} profile`} 
              className='h-12 w-12 object-cover rounded-full border-2 border-gray-200 dark:border-gray-600'
              onError={(e) => {
                e.target.src = '/icon.png' // Fallback image
              }}
            />
          </div>
          
          {/* Contact Information */}
          <div className='flex flex-col min-w-0 flex-1'>
            <h2 className='font-semibold text-gray-900 dark:text-white text-sm truncate'>
              {organization_name || 'Organization Name'}
            </h2>
            <p className='text-gray-600 dark:text-gray-300 text-xs truncate'>
              {email}
            </p>
            {city && (
              <p className='text-gray-500 dark:text-gray-400 text-xs truncate'>
              {city}
              </p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className='flex items-center gap-2 ml-4'>
          {/* Delete Button */}
          <button 
            className='p-2 text-gray-400 hover:text-red-500  dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200'
            title="Delete contact"
          >
            <span 
              className="material-symbols-outlined text-lg" 
              style={{
                fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24"
              }}
            >
              delete
            </span>
          </button>

          {/* Chat Button */}
          <button 
            className='p-2 text-gray-400 hover:text-blue-500 rounded-lg transition-colors duration-200'
            onClick={() => router.push(`/chat?email=${encodeURIComponent(email)}`)}
            title="Start chat"
          >
            <span 
              className="material-symbols-outlined text-lg" 
              style={{
                fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24"
              }}
            >
              chat
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Contactcard
