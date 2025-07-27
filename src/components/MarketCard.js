"use client";

import { data } from 'autoprefixer';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

function MarketCard({ user }) {
    const { data: session, status } = useSession();
    const [currentIndex, setCurrentIndex] = useState(0);

    const router = useRouter()

    if (!user || user.length === 0) return <p>No users available</p>;

    const item = user[currentIndex];

    const handleNext = () => {
        if (currentIndex < user.length - 1) {
            setCurrentIndex(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        }
    };

    const contacthandle = async (receiver_id) => {
        try {
            const response = await axios.post('/api/contact/add', { sender_id: session.user.id, receiver_id: receiver_id })
            console.log(response.data);

            toast.success("Contact Added")
            router.push("/contact")

        } catch (error) {
            console.log("error", error);

        }
    }

    return (
        <div className=' flex flex-col justify-center items-center m-4'>
            <div className="flex justify-center items-center flex-col rounded-2xl max-w-sm mx-auto h-[80vh]">
                <div className="flex flex-col shadow-xs border rounded-xl profile-card bg-white">

                    <div className="top border-2 border-gray-800 rounded-lg max-w-3xl relative">
                        <img className="w-full object-cover h-40 rounded-lg" src={item?.coverimage} alt="" loading='lazy' />
                    </div>

                    <div className="flex profile-image items-end p-1">
                        <img className="h-20 w-20 bg-cover rounded-full border-2 border-white object-cover" loading='lazy' src={item?.profileimage} alt="" />
                        <div className='flex flex-col ml-3'>
                            <div className='flex items-center'>
                                <h1 className="font-bold text-2xl">{item?.organization_name}</h1>
                                {item?.isverified &&
                                    <span className="material-symbols-outlined text-green-600">
                                        check_circle
                                    </span>}
                            </div>

                            <h1 className='font-light text-xs text-gray-500'>
                                {item?.city || "City not provided"}
                            </h1>
                            <button className={`absolute right-5 bottom-2 px-4 cursor-pointer border p-1 rounded-xl text-black border-neutral-400`}>
                                Posts
                            </button>
                        </div>
                    </div>

                    <h3 className='ml-6'>{item?.description}</h3>
                    <h3 className='ml-6'>{item?.bio}</h3>
                    <h3 className='ml-6'>{item?.about}</h3>

                    <div className='flex justify-between items-center'>
                        <h3 className='font-light text-xs text-gray-500 mt-10 ml-6'>
                            Last updated at {item?.updatedAt?.slice(0, 10)}
                        </h3>
                        <h3 className='font-light text-xs text-gray-500 mt-10 mr-6'>
                            Contact by {item?.likecount}
                        </h3>
                    </div>

                    <button onClick={() => contacthandle(item._id)} className="bg-black p-2 rounded-2xl text-white mt-2 cursor-pointer">
                        Contact us
                    </button>
                </div>
            </div>

            <div className='flex flex-row items-center justify-center px-10 gap-5 mt-4'>

                <button
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    className={`flex gap-2 items-center w-1/2 px-6 border p-2 rounded-2xl mt-2 ${currentIndex === 0 ? 'text-gray-400 border-gray-300 cursor-not-allowed' : 'text-black border-neutral-300 cursor-pointer'}`}
                >
                    <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
                        arrow_back
                    </span>
                    Prev
                </button>

                <button
                    onClick={handleNext}
                    disabled={currentIndex >= user.length - 1}
                    className={`flex gap-2 items-center w-1/2 px-6 border  p-2 rounded-2xl mt-2 ${currentIndex >= user.length - 1 ? 'text-gray-400 border-gray-300 cursor-not-allowed ' : 'text-black border border-neutral-300 cursor-pointer'}`}
                >
                    Next
                    <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
                        arrow_forward
                    </span>
                </button>

            </div>
        </div>
    );
}

export default MarketCard;
