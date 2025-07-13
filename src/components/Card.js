import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

function Card() {

    const { data: session, status } = useSession();
    const [user, setuser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const getuser = async () => {
            try {
                const response = await axios.post('/api/user/getuser', {
                    email: session?.user?.email
                });
                console.log(response);
                setuser(response.data.user);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        if (session?.user?.email) {
            getuser();
        }
    }, [session]);


    return (
        <div className='h-80% top-0 left-0 right-0 bottom-0 flex justify-center items-center m-4 '>
            <div className="profile-card flex justify-center items-center flex-col bg-white shadow-md rounded-2xl max-w-sm mx-auto shadow-2xl">
                <div className="flex flex-col ">

                    <div className="top border-2 border-gray-800 rounded-lg max-w-3xl relative">
                        <img className=" w-full object-cover h-40" src={user?.coverimage} alt="" loading='lazy'/>
                    </div>

                    <div className="flex profile-image items-end p-1">
                        <img className=" h-20 w-20 bg-cover rounded-full border-2 border-white object-cover" loading='lazy' src={user?.profileimage} alt="" />
                        <div className='flex flex-col ml-3 '>
                            <div className='flex items-center'>
                                <h1 className="font-bold text-2xl ">{user?.organization_name}</h1>
                                {user?.isverified &&
                                    <span className="material-symbols-outlined text-green-600">
                                        check_circle
                                    </span>}
                            </div>
                            
                            <h1 className='font-light text-xs text-gray-500'>
                                {user?.city ? user?.city : "City not provided"}
                            </h1>
                        </div>
                    </div>

                    <h3 className='ml-6'>{user?.description}</h3>
                    <h3 className='ml-6'>{user?.bio}</h3>
                    <h3 className='ml-6'>{user?.about}</h3>


                    <div className='flex justify-between items-center'>
                        <h3 className='font-light text-xs text-gray-500 mt-10 ml-6'> Last updated at {user?.updatedAt.slice(0, 10)}</h3>
                        <h3 className='font-light text-xs text-gray-500 mt-10 mr-6'>Contact by {user?.likecount}</h3>
                    </div>
                    <button className=" bg-black p-2 rounded-2xl text-white mt-2  cursor-pointer">Contact us</button>

                </div>
            </div>

        </div>
    )
}

export default Card
