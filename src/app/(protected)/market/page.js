'use client';
import MarketCard from '@/components/MarketCard';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import MainLoader from '@/components/MainLoader';

function Page() {
  const { data: session, status } = useSession();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const router = useRouter();
  const limit = 4; 

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const excludeIds = users.map(u => u._id); 
      const response = await axios.post('/api/market/get', { limit, excludeIds });
      const newUsers = response.data.allUser;
      setUsers(prev => [...prev, ...newUsers]);
      setHasMore(newUsers.length === limit);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (session?.user?.email) fetchUsers();
    if (status === 'unauthenticated') router.push('/signup');
  }, [session?.user?.email, status, page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        if (hasMore && !loading) setPage(prev => prev + 1);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, loading]);

  if (!users.length && loading) return <MainLoader />;

  return (
    <div className="p-4 mt-20 flex justify-evenly items-center flex-col">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 max-w-7xl">
        {users.map((temp, index) => (
          <MarketCard user={temp} key={index} />
        ))}
      </div>
      {loading && <p className="text-center mt-4">Loading...</p>}
    </div>
  );
}

export default Page;
