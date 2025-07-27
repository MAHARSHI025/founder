"use client"
import Contactcard from '@/components/Contactcard'
import MainLoader from '@/components/MainLoader';
import axios from 'axios'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

function Page() {
  const { data: session } = useSession();
  const [data, setData] = useState([]);
  const [loading, setloading] = useState(false);

  const router = useRouter()

  useEffect(() => {
    setloading(true)
    const getContacts = async () => {
      if (!session?.user?.email) return;

      try {
        const response = await axios.post("/api/contact/get", {
          email: session.user.email,
        });
        console.log("API data:", response.data);
        setData(response.data.details);
      } catch (err) {
        console.error("Error fetching contacts", err);
      } finally {
        setloading(false)
      }
    };

    getContacts();
  }, [session]);




  return loading ? <MainLoader /> : (
    <div className='flex flex-col mx-auto max-w-2xl border border-gray-300 p-6 py-10 rounded-lg mt-6 relative'>
      <button className=' absolute top-2 right-5' onClick={() => { router.push("/contact/request") }}><span className="material-symbols-outlined">
        group_add
      </span></button>
      <h1 className='text-2xl font-bold text-center mb-3'>Contacts</h1>

      <div className='flex justify-center items-center flex-col gap-4'>
        <div className='flex justify-center items-center flex-col gap-4'>
          {data.length > 0 ? (
            data.map((item, index) => (
              <Contactcard
                key={index}
                email={item.sender_id.email}
                city={item.sender_id.city}
                image={item.sender_id.profileimage}
              />
            ))
          ) : (
            <p>No contacts found</p>
          )}
        </div>

      </div>
    </div>
  );
}

export default Page;
