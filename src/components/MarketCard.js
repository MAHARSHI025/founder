"use client";

import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Postpopup from './Postpopup';
import Link from 'next/link';

function MarketCard({ user }) {
    const { data: session, status } = useSession();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [showPopup, setShowPopup] = useState(false);


    const router = useRouter()

    if (!user || user.length === 0) return <p>No users available</p>;

    const contacthandle = async (receiver_id) => {
        if (!session?.user?.id) {
            toast.error("Please login to add contacts");
            return;
        }

        setIsLoading(true);
        try {
            const response = await axios.post('/api/contact/add', {
                sender_id: session.user.id,
                receiver_id: receiver_id
            });

            console.log(response.data);
            toast.success("Contact Added Successfully");
            router.push("/contact");

        } catch (error) {
            console.log("error", error);

            if (error.response?.data?.message) {
                toast.error(error.response.data.message);
            } else if (error.response?.status === 409) {
                toast.error("Contact already exists");
            } else if (error.response?.status === 400) {
                toast.error("Invalid request");
            } else {
                toast.error("Failed to add contact. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
            <div className="flex flex-col justify-between shadow-xs border rounded-xl profile-card bg-white ">

                <div className="top border-2 border-gray-800 rounded-lg max-w-3xl relative">
                    <img className="w-full object-cover h-40 rounded-lg" src={user?.coverimage} alt="" loading='lazy' />
                </div>

                <div className="flex profile-image items-end p-1">
                    <img className="h-20 w-20 bg-cover rounded-full border-2 border-white object-cover" loading='lazy' src={user?.profileimage} alt="" />
                    <div className='flex flex-col ml-3'>
                        <div className='flex items-center'>
                            <h1 className="font-bold text-2xl">{user?.organization_name}</h1>
                            {user?.isverified &&
                                <span className="material-symbols-outlined text-green-600">
                                    check_circle
                                </span>}
                        </div>

                        <h1 className='font-light text-xs text-gray-500'>
                            {user?.city || "City not provided"}
                        </h1>
                        <button onClick={() => setShowPopup(true)} className={`absolute right-5 bottom-2 px-4 cursor-pointer border p-1 rounded-xl text-black border-neutral-400`}>
                            Posts
                        </button>
                        {showPopup && (
                            <Postpopup posts={user} onClose={() => setShowPopup(false)} />
                        )}
                    </div>
                </div>

                {/* {user?.badges?.map((badges,index)=>(
                    <div key={index}>
                        <h1>{badges}</h1>
                    </div>
                ))} */}
                <h3 className='ml-6'>{user?.description}</h3>
                <h3 className='ml-6'>{user?.bio}</h3>
                <h3 className='ml-6'>{user?.about}</h3>

                <div className="flex gap-4 ml-6 mt-15 grayscale-100">
                    {user?.linkedin && (
                        <a
                            href={user.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:opacity-80 transition-opacity"
                        >
                            <img
                                width={25}
                                height={25}
                                src="https://www.citypng.com/public/uploads/preview/hd-linkedin-square-black-icon-transparent-background-7017516949739946gsykkwdmd.png?v=2025061905"
                                alt="LinkedIn Profile"
                            />
                        </a>
                    )}
                    {user?.instagram && (
                        <a
                            href={user.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:opacity-80 transition-opacity"
                        >
                            <img
                                width={25}
                                height={25}
                                src="https://images.rawpixel.com/image_png_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjk4Mi1kMi0wNC5wbmc.png"
                                alt="Instagram Profile"
                            />
                        </a>
                    )}
                    {user?.website && (
                        <a
                            href={user.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:opacity-80 transition-opacity"
                        >
                            <img
                                width={25}
                                height={25}
                                src="https://cdn-icons-png.flaticon.com/512/3037/3037366.png"
                                alt="Instagram Profile"
                            />
                        </a>
                    )}
                </div>



                <div className='flex justify-between items-center'>
                    <h3 className='font-light text-xs text-gray-500 mt-5 ml-6'>
                        Last updated at {user?.updatedAt?.slice(0, 10)}
                    </h3>
                    <h3 className='font-light text-xs text-gray-500 mt-5 mr-6'>
                        Contact by {user?.contacts.length}
                    </h3>
                </div>

                <button
                    onClick={() => contacthandle(user._id)}
                    disabled={isLoading}
                    className={`bg-black p-2 rounded-2xl text-white mt-2 cursor-pointer ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {isLoading ? 'Adding...' : 'Contact us'}
                </button>
            </div>


    );
}

export default MarketCard;
