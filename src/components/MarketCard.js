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

    const item = user[currentIndex];
    console.log(item);
    

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
        <div className=' flex flex-col justify-center items-center m-4 mt-20'>
            <div className="flex justify- items-center flex-col rounded-2xl max-w-sm mx-auto h-[80vh]">
                <div className='flex flex-row items-center justify-center px-10 gap-5 mb-4'>

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
                <div className="flex flex-col shadow-xs border rounded-xl profile-card bg-white ">

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
                            <button onClick={() => setShowPopup(true)} className={`absolute right-5 bottom-2 px-4 cursor-pointer border p-1 rounded-xl text-black border-neutral-400`}>
                                Posts
                            </button>
                            {showPopup && (
                                <Postpopup posts={item} onClose={() => setShowPopup(false)} />
                            )}
                        </div>
                    </div>

                    <h3 className='ml-6'>{item?.description}</h3>
                    <h3 className='ml-6'>{item?.bio}</h3>
                    <h3 className='ml-6'>{item?.about}</h3>

                    <div className="flex gap-4 ml-6 mt-15 grayscale-100">
                        {item?.linkedin && (
                            <a 
                                href={item.linkedin} 
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
                        {item?.instagram && (
                            <a 
                                href={item.instagram} 
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
                        {item?.website && (
                            <a 
                                href={item.website} 
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
                            Last updated at {item?.updatedAt?.slice(0, 10)}
                        </h3>
                        <h3 className='font-light text-xs text-gray-500 mt-5 mr-6'>
                            Contact by {item?.contacts.length}
                        </h3>
                    </div>

                    <button
                        onClick={() => contacthandle(item._id)}
                        disabled={isLoading}
                        className={`bg-black p-2 rounded-2xl text-white mt-2 cursor-pointer ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {isLoading ? 'Adding...' : 'Contact us'}
                    </button>
                </div>
            </div>


        </div>
    );
}

export default MarketCard;
