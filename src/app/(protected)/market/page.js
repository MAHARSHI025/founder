'use client';
import MarketCard from '@/components/MarketCard';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import MainLoader from '@/components/MainLoader';
import {
  IconSearch,
  IconLoader2,
  IconBuildingStore,
  IconMoodEmpty,
} from '@tabler/icons-react';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.06, ease: 'easeOut' },
  }),
};

function Page() {
  const { data: session, status } = useSession();
  const [users, setUsers] = useState([]);
  const [outgoingRequestIds, setOutgoingRequestIds] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState('');
  const router = useRouter();
  const limit = 6;
  const isFetchingRef = useRef(false);
  const usersRef = useRef([]);
  const requestedPagesRef = useRef(new Set());
  const scrollLockRef = useRef(false);

  useEffect(() => {
    usersRef.current = users;
  }, [users]);

  useEffect(() => {
    const fetchOutgoingRequests = async () => {
      if (!session?.user?.id) return;

      try {
        const response = await axios.post('/api/request/outgoing', {
          sender_id: session.user.id,
        });
        setOutgoingRequestIds(new Set(response?.data?.receiverIds || []));
      } catch (err) {
        console.error('Error fetching outgoing requests', err);
      }
    };

    if (status === 'authenticated') {
      fetchOutgoingRequests();
    }
  }, [session?.user?.id, status]);

  const handleRequestSent = useCallback((receiverId) => {
    setOutgoingRequestIds((prev) => {
      const next = new Set(prev);
      next.add(receiverId);
      return next;
    });
  }, []);

  const fetchUsers = useCallback(async (pageNumber) => {
    if (isFetchingRef.current || requestedPagesRef.current.has(pageNumber)) {
      return;
    }

    requestedPagesRef.current.add(pageNumber);
    isFetchingRef.current = true;
    try {
      setLoading(true);
      const excludeIds = usersRef.current.map((u) => u._id);
      const response = await axios.post('/api/market/get', { limit, excludeIds });
      const newUsers = response.data.allUser;

      setUsers((prev) => {
        const existingIds = new Set(prev.map((item) => item._id));
        const uniqueUsers = newUsers.filter((item) => !existingIds.has(item._id));
        return [...prev, ...uniqueUsers];
      });

      setHasMore(newUsers.length === limit);
    } catch (err) {
      requestedPagesRef.current.delete(pageNumber);
      console.error(err);
    } finally {
      setLoading(false);
      isFetchingRef.current = false;
      scrollLockRef.current = false;
    }
  }, [limit]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signup');
      return;
    }

    if (session?.user?.email) {
      fetchUsers(page);
    }
  }, [session?.user?.email, status, page, fetchUsers, router]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 100 >=
        document.documentElement.scrollHeight
      ) {
        if (hasMore && !isFetchingRef.current && !scrollLockRef.current) {
          scrollLockRef.current = true;
          setPage((prev) => prev + 1);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore]);

  const filtered = search.trim()
    ? users.filter((u) => {
        const q = search.toLowerCase();
        return (
          u.organization_name?.toLowerCase().includes(q) ||
          u.city?.toLowerCase().includes(q) ||
          u.description?.toLowerCase().includes(q)
        );
      })
    : users;

  if (!users.length && loading) return <MainLoader />;

  return (
    <div className="flex justify-center px-4 py-8 mt-10">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6"
        >
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <IconBuildingStore size={30} /> Market
            </h1>
            <p className="text-sm text-neutral-500 mt-0.5">
              Discover businesses and grow your network
            </p>
          </div>
          <p className="text-xs text-neutral-400">
            {users.length} businesses loaded
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="mb-6"
        >
          <div className="relative max-w-md">
            <IconSearch
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
            />
            <input
              type="text"
              placeholder="Search by name, city, or description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-neutral-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black/10 transition-shadow"
            />
          </div>
        </motion.div>

        {/* Cards Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filtered.map((temp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: (index % limit) * 0.06 }}
              >
                <MarketCard
                  user={temp}
                  isRequested={outgoingRequestIds.has(temp._id)}
                  onRequestSent={handleRequestSent}
                />
              </motion.div>
            ))}
          </div>
        ) : !loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-neutral-400">
            <IconMoodEmpty size={40} className="mb-3 opacity-50" />
            <p className="text-sm">
              {search.trim()
                ? `No results for "${search}"`
                : 'No businesses found'}
            </p>
          </div>
        ) : null}

        {/* Loading indicator */}
        {loading && users.length > 0 && (
          <div className="flex justify-center py-8">
            <IconLoader2 size={24} className="animate-spin text-neutral-400" />
          </div>
        )}

        {/* End of list */}
        {!hasMore && users.length > 0 && !search.trim() && (
          <p className="text-center text-xs text-neutral-400 py-8">
            You&apos;ve reached the end
          </p>
        )}
      </div>
    </div>
  );
}

export default Page;
