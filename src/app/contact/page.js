"use client";

import Contactcard from '@/components/Contactcard';
import MainLoader from '@/components/MainLoader';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

function Page() {
  const { data: session, status } = useSession();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signup');
    }
  }, [status, router]);

  useEffect(() => {
    const getContacts = async () => {
      if (!session?.user?.email) return;

      try {
        const response = await axios.post("/api/contact/get", {
          email: session.user.email,
        });
        setData(response.data.details);
      } catch (err) {
        console.error("Error fetching contacts", err);
      } finally {
        setLoading(false);
      }
    };

    if (status === "authenticated") {
      getContacts();
    }
  }, [session, status]);

  if (loading || status === "loading") return <MainLoader />;

  return (
    <div className="flex flex-col mx-auto max-w-2xl border border-gray-300 p-6 py-10 rounded-lg mt-20 relative">
      {/* <button
        className="absolute top-2 right-5 text-gray-700 hover:text-black transition"
        onClick={() => router.push("/contact/request")}
        title="Add Contact"
      >
        <span className="material-symbols-outlined">group_add</span>
      </button> */}

      <h1 className="text-2xl font-bold text-center mb-3">Contacts</h1>

      <div className="flex flex-col items-center gap-4 h-[70vh] overflow-scroll scrollbar-hide">
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
          <p className="text-gray-500">No contacts found</p>
        )}
      </div>
    </div>
  );
}

export default Page;
