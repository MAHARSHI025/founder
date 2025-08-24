"use client"
import axios from 'axios'
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'

function Page() {
  const { data: session, status } = useSession();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const getRequest = async () => {
      try {
        const response = await axios.post('/api/request/get', { receiver_id: session?.user?.id });
        console.log("Request data:", response.data);
        setRequests(response.data.requests || []);
      } catch (err) {
        console.error("Error fetching requests:", err);
      }
    };

    if (status === "authenticated") {
      getRequest();
    }
  }, [session, status]);

  const deletereq = async (id) => {
    try {
      const response = await axios.post('/api/request/change', { id: id });
      console.log("Request deleted:", response.data);

      setRequests(prev => prev.filter(req => req._id !== id));
    } catch (err) {
      console.error("Error deleting request:", err);
    }
  }


  return (
    <div className=' flex justify-center items-center  flex-col gap-3 mt-5'>
      {requests.map((data, index) => (
        <div key={index} className=' flex items-center justify-center p-4 border border-black rounded-2xl gap-8'>
          <div>
            <h1>{data.sender_id}</h1>

          </div>
          <div className=' '>

            <span className="material-symbols-outlined text-green-800 cursor-pointer">
              check
            </span>
            <span className="material-symbols-outlined text-red-800 cursor-pointer " onClick={() => deletereq(data._id)}>
              close
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Page;
