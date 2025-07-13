"use client"
import Contactcard from '@/components/Contactcard'
import axios from 'axios'
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'

function Page() {
  const { data: session } = useSession();
  const [data, setData] = useState([]);

  useEffect(() => {
    const getContacts = async () => {
      if (!session?.user?.email) return;

      try {
        const response = await axios.post("/api/contact/get", {
          email: session.user.email,
        });
        console.log("API data:", response.data.data); // check the array
        setData(response.data.data);
      } catch (err) {
        console.error("Error fetching contacts", err);
      }
    };

    getContacts();
  }, [session]);

  return (
    <div>
      <h1>hello</h1>
      <div className='flex justify-center items-center flex-col gap-4'>
        {data.length > 0 ? (
          data.map((email, index) => (
            <Contactcard key={index} email={email} />
          ))
        ) : (
          <p>No contacts found</p>
        )}
      </div>
    </div>
  );
}

export default Page;
