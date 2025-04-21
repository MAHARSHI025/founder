import React, { useEffect, useState } from 'react'
import { useSession, signOut } from 'next-auth/react'

function Preview({ onClose }) {

    const { data: session, status } = useSession()
    const [user, setuser] = useState()

    useEffect(() => {
        if (session) {
            const dataToSend = { email: session.user.email };

            fetch("/api/users/getprofile", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dataToSend),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log("Response:", data)
                    setuser(data.user)
                })
                .catch((err) => console.error("Error:", err));
        }
    }, [status, session]);

    return (
        <div>
            <div className='p-2 flex justify-center items-center drop-shadow-lg mt-20'>
                <div className='flex flex-col justify-center border p-4 rounded-2xl max-w-80 '>
                    <div className=' flex justify-between items-baseline'>
                        <h1 className='font-semibold text-2xl'>Preview</h1>
                        <button onClick={onClose} className='flex h-min cursor-pointer p-0'>
                            <span className="material-symbols-outlined ">
                                close
                            </span>
                        </button>

                    </div>

                    <div className="image-holder my-4 px-2 flex justify-center">
                        <img className=' h-60 w-60 rounded-2xl' src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2595" alt="" />
                    </div>

                    <div className="card-content">
                        <h1 className=' font-medium text-2xl cursor-pointer'>{user?.username || "Loading..."}</h1>
                        <h3 className=' text-neutral-600'>{user?.gender || "Not available"}</h3>
                        <h4 className=' text-neutral-400 text-wrap text-sm mt-2 max-w-60'>{user?.description }</h4>
                        <h4 className=' text-neutral-400 text-wrap text-sm mt-2'>Typeofdate:- {user?.typeofdate || "Loading..."}</h4>
                        <h4 className=' text-neutral-400 text-wrap text-sm mt-2'>Addiction:- {user?.addictions || "Loading..."}</h4>
                        <h4 className=' text-neutral-400 text-wrap text-sm mt-2'>hoobies:- {user?.hoobies || "Loading..."}</h4>
                    </div>

                    <div className="card-button flex justify-between mt-5 drop-shadow-lg">
                        <button className=' bg-red-600 rounded-full flex justify-center items-center text-white  p-2 cursor-pointer'>
                            <span className="material-symbols-outlined">
                                close
                            </span>
                        </button>
                        <button className=' bg-yellow-600 rounded-full flex justify-center items-center text-white  p-2 cursor-pointer'>
                            <span className="material-symbols-outlined">
                                favorite
                            </span>
                        </button>
                        <button className=' bg-green-600 rounded-full flex justify-center items-center text-white p-2 cursor-pointer'>
                            <span className="material-symbols-outlined">
                                check
                            </span>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Preview
