"use client"
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import BadgeDropdown from '@/components/BadgeDropdown';

function Page() {
    const router = useRouter()

    const { data: session, status } = useSession();
    const data = session?.user || {};

    const [user, setUser] = useState({});
    const [selectedBadges, setSelectedBadges] = useState([]);

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            if (!session?.user?.email) return;

            try {
                console.log("Session Data:", session);
                const response = await axios.post('/api/user/getuser', { email: session.user.email });
                setUser(response.data.user);
                // Set selected badges from user data
                if (response.data.user.badges) {
                    setSelectedBadges(response.data.user.badges);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                setMessage('Failed to fetch user data.');
            }
        };

        fetchUser();
    }, [session]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const response = await axios.post('/api/user/editprofile', {
                organization_name: user.organization_name,
                sessionemail: data.email,
                city: user.city,
                description: user.description,
                bio: user.bio,
                about: user.about,
                website: user.website,
                instagram: user.instagram,
                linkedin: user.linkedin,
                badges: selectedBadges,
            });
            console.log("Response Data:", response.data);
            setMessage(response.data.message || 'edit successful!');


            router.push('/profile');
            setUser({ organization_name: '', email: '' });
        } catch (error) {
            console.error('update error:', error);
            setMessage(
                error.response?.data?.error || error.response?.data?.message || 'Something went wrong.'
            );
        }

        setLoading(false);
    };



    return (

        <div className='  m-2 mt-15 flex justify-center items-center mx-0'>

            <form onSubmit={handleSubmit}>
                <div className='flex flex-col mx-auto max-w-min border border-gray-300  py-10 rounded-lg drop-shadow-2xl min-w-80 sm:p-6'>
                    <h1 className='text-2xl font-bold text-center mb-3'>Update profile</h1>
                    <div className='text-center mb-4'>

                        <h5 className='text-center text-neutral-500'>Hello, {data.email}</h5>
                        {user.updatedAt && (
                            <h5 className='text-center text-neutral-500 text-xs'>
                                last updated at {user.updatedAt.split("T")[0]}
                            </h5>
                        )}
                    </div>


                    <div className=' flex gap-2  justify-center flex-wrap lg:flex-nowrap'>

                        <div className=' flex flex-col'>
                            <label htmlFor="city" className=' text-xs text-neutral-700' >Organization name</label>
                            <input type="text" name="organization_name" placeholder="Enter organization name" value={user?.organization_name || ''} onChange={handleChange} required className='border rounded-lg mb-2 px-2 py-1 border-gray-400' />

                            <label htmlFor="city" className=' text-xs text-neutral-700' >Description</label>
                            <textarea name="description" id="textarea" value={user?.description} placeholder='Description' maxLength={80} rows={5} className='border rounded-lg mb-2 px-2 py-1 border-gray-400' onChange={handleChange}></textarea>

                            <label htmlFor="about" className=' text-xs text-neutral-700' >About</label>
                            <textarea name="about" id="textarea" value={user?.about} placeholder='About' maxLength={80} rows={5} className='border rounded-lg mb-2 px-2 py-1 border-gray-400 w-max' onChange={handleChange}></textarea>
                        </div>

                        <div className=' flex flex-col'>


                            <label htmlFor="city" className=' text-xs text-neutral-700' >City</label>
                            <input type="text" name="city" placeholder="Enter your city" value={user?.city || ''} onChange={handleChange} required className='border rounded-lg mb-2 px-2 py-1 border-gray-400' />


                            <label htmlFor="bio" className=' text-xs text-neutral-700' >Bio</label>
                            <textarea name="bio" id="textarea" value={user?.bio} placeholder='Bio' maxLength={80} rows={5} className='border rounded-lg mb-2 px-2 py-1 border-gray-400' onChange={handleChange}></textarea>

                        </div>
                    </div>
                    <div className=' flex flex-col p-5 mt-2'>
                        <label className=' text-xs text-neutral-700 mb-2' >Badges</label>
                        <BadgeDropdown 
                            selectedBadges={selectedBadges}
                            onBadgeChange={setSelectedBadges}
                            placeholder="Select your industry badges..."
                        />
                    </div>
                   
                    <div className=' flex flex-col p-5 mt-2'>
                        <label htmlFor="website" className=' text-xs text-neutral-700' >Website</label>
                        <input type="text" name="website" placeholder="Enter Website url" value={user?.website || ''} onChange={handleChange} required className='border rounded-lg mb-2 px-2 py-1 border-gray-400' />
                       
                        <label htmlFor="instagram" className=' text-xs text-neutral-700' >instagram</label>
                        <input type="text" name="instagram" placeholder="Enter instagram url" value={user?.instagram || ''} onChange={handleChange} required className='border rounded-lg mb-2 px-2 py-1 border-gray-400' />
                       
                        <label htmlFor="linkedin" className=' text-xs text-neutral-700' >linkedin</label>
                        <input type="text" name="linkedin" placeholder="Enter linkedin url" value={user?.linkedin || ''} onChange={handleChange} required className='border rounded-lg mb-2 px-2 py-1 border-gray-400' />
                       
                    </div>

                  
                    <button
                        type="submit"
                        className='bg-black text-white rounded-lg px-2 py-1.5 mt-4'
                        disabled={loading}
                    >
                        {loading ? 'Submitting...' : 'Update Profile'}
                    </button>

                    {message && (
                        <p className='text-sm text-center mt-2 text-red-500'>{message}</p>
                    )}
                </div>

            </form>
        </div>



    )
}

export default Page
