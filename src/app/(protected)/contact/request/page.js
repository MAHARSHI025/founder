"use client";

import axios from 'axios';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { IconCheck, IconX, IconClock, IconUser } from '@tabler/icons-react';

function Page() {
  const { data: session, status } = useSession();
  const [requests, setRequests] = useState([]);
  const [processingId, setProcessingId] = useState('');

  useEffect(() => {
    const getRequest = async () => {
      try {
        const response = await axios.post('/api/request/get', { receiver_id: session?.user?.id });
        setRequests(response.data.requests || []);
      } catch (err) {
        toast.error('Failed to fetch requests');
      }
    };

    if (status === "authenticated") {
      getRequest();
    }
  }, [session, status]);

  const handleRequestAction = async (id, action) => {
    setProcessingId(id);
    try {
      await axios.post('/api/request/change', {
        id,
        action,
        receiver_id: session?.user?.id,
      });

      if (action === 'accept') {
        toast.success('Request accepted and contact added');
      } else {
        toast.success('Request rejected');
      }

      setRequests(prev => prev.filter(req => req._id !== id));
    } catch (err) {
      const message = err?.response?.data?.message || 'Failed to update request';
      toast.error(message);
    } finally {
      setProcessingId('');
    }
  };


  return (
    <div className='flex justify-center px-4 py-8 mt-10'>
      <div className='w-full max-w-2xl'>
        <div className='flex items-center gap-2 mb-5'>
          <IconClock size={24} />
          <h1 className='text-2xl font-bold'>Connection Requests</h1>
        </div>

        {requests.length === 0 ? (
          <div className='border border-neutral-200 rounded-2xl p-10 text-center text-neutral-500'>
            No pending requests
          </div>
        ) : (
          <div className='space-y-3'>
            {requests.map((data) => (
              <div key={data._id} className='flex items-center justify-between p-4 border border-neutral-200 rounded-2xl bg-white'>
                <div className='flex items-center gap-3 min-w-0'>
                  {data?.sender?.profileimage ? (
                    <img
                      src={data.sender.profileimage}
                      alt='Sender profile'
                      className='h-10 w-10 rounded-full object-cover border border-neutral-200'
                    />
                  ) : (
                    <div className='h-10 w-10 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center'>
                      <IconUser size={18} className='text-neutral-500' />
                    </div>
                  )}

                  <div className='min-w-0'>
                    <p className='font-semibold text-sm truncate'>
                      {data?.sender?.organization_name || 'Unknown user'}
                    </p>
                    <p className='text-xs text-neutral-500 truncate'>
                      {data?.sender?.email || String(data.sender_id)}
                    </p>
                  </div>
                </div>

                <div className='flex items-center gap-2'>
                  <button
                    onClick={() => handleRequestAction(data._id, 'accept')}
                    disabled={processingId === data._id}
                    className='inline-flex items-center gap-1.5 bg-black text-white text-sm font-semibold px-3 py-2 rounded-xl hover:bg-neutral-800 transition-colors disabled:opacity-50 cursor-pointer'
                  >
                    <IconCheck size={15} /> Accept
                  </button>
                  <button
                    onClick={() => handleRequestAction(data._id, 'reject')}
                    disabled={processingId === data._id}
                    className='inline-flex items-center gap-1.5 border border-neutral-200 text-sm font-semibold px-3 py-2 rounded-xl hover:bg-neutral-50 transition-colors disabled:opacity-50 cursor-pointer'
                  >
                    <IconX size={15} /> Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
