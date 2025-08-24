import { signIn } from 'next-auth/react'
import React from 'react'

function ProviderCard() {
    return (
        <div>
            <div className=' flex justify-center items-center mt-4 flex-col gap-2'>

                <button
                    type="button"
                    onClick={() => signIn('google')}
                    className='flex cursor-pointer items-center justify-center gap-2 border border-gray-400 rounded-lg px-15 py-4 hover:bg-gray-100'
                >
                    <img
                        src="https://www.svgrepo.com/show/355037/google.svg"
                        alt="Google"
                        className="w-6 h-6"
                    />
                    Continue with Google
                </button>
                <button
                    type="button"
                    onClick={() => signIn('github')}
                    className='flex cursor-pointer items-center justify-center gap-2 border border-gray-400 rounded-lg px-15 py-4 hover:bg-gray-100'
                >
                    <img
                        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
                        alt="GitHub"
                        className="w-6 h-6"
                    />

                    Continue with Github
                </button>
            </div>
        </div>
    )
}

export default ProviderCard
