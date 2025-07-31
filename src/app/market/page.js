'use client';
import MarketCard from '@/components/MarketCard';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import MainLoader from '@/components/MainLoader';

function Page() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.post('/api/market/get');
        setUser(response.data.allUser);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user?.email) {
      getUser();
    } 
    if (status === 'unauthenticated') {
      router.push('/signup');
    }
  }, [session?.user?.email, status]);

  if (loading) return <MainLoader />;

  return (
    <div>
      <MarketCard user={user} />
    </div>
  );
}

export default Page;
