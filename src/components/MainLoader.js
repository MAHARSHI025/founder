import React from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';


function MainLoader() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
            <div className="flex space-x-2">
                <div className="w-5 h-5 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-5 h-5 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-5 h-5 bg-black rounded-full animate-bounce"></div>
            </div>
        </div>
    )
}

export default MainLoader
