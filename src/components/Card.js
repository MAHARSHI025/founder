'use client';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import MainLoader from './MainLoader';

function Card() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [isFetched, setIsFetched] = useState(false); 
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.post('/api/user/getuser', {
          email: session?.user?.email
        });
        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
        setIsFetched(true); 
      }
    };

    if (session?.user?.email && !isFetched) {
      getUser();
    }
  }, [session, isFetched]);

  if (loading) return <MainLoader />;

  if (!user) return <p className="text-center mt-10">User not found.</p>;

  return (
    <div className=' flex justify-center items-center h-[80vh] mx-4'>
      <div className="profile-card flex justify-center items-center flex-col bg-white shadow-md rounded-2xl max-w-sm mx-auto ">
        <div className="flex flex-col ">
          <div className="top border-2 border-gray-800 rounded-lg max-w-3xl relative">
            <img className="w-full object-cover h-40" src={user?.coverimage} alt="Cover" loading='lazy' />
          </div>

          <div className="flex profile-image items-end p-1">
            <img className="h-20 w-20 bg-cover rounded-full border-2 border-white object-cover" loading='lazy' src={user?.profileimage} alt="Profile" />
            <div className='flex flex-col ml-3 '>
              <div className='flex items-center'>
                <h1 className="font-bold text-2xl ">{user?.organization_name}</h1>
                {user?.isverified &&
                  <span className="material-symbols-outlined text-green-600">
                    check_circle
                  </span>}
              </div>
              <h1 className='font-light text-xs text-gray-500'>
                {user?.city || "City not provided"}
              </h1>
            </div>
          </div>

          <h3 className='ml-6'>{user?.description}</h3>
          <h3 className='ml-6'>{user?.bio}</h3>
          <h3 className='ml-6'>{user?.about}</h3>

          <div className='flex justify-between items-center'>
            <h3 className='font-light text-xs text-gray-500 mt-10 ml-6'> Last updated at {user?.updatedAt?.slice(0, 10)}</h3>
            <h3 className='font-light text-xs text-gray-500 mt-10 mr-6'>Contact by {user?.likecount}</h3>
          </div>
          <button className="bg-black p-2 rounded-2xl text-white mt-2 cursor-pointer">Contact us</button>
        </div>
      </div>
    </div>
  );
}

export default Card;
