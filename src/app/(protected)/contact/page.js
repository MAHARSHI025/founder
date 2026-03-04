"use client";

import Contactcard from '@/components/Contactcard';
import MainLoader from '@/components/MainLoader';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import {
  IconUsersGroup,
  IconSearch,
  IconUserPlus,
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
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const router = useRouter();

  useEffect(() => {
    const getContacts = async () => {
      if (!session?.user?.email) return;

      try {
        const response = await axios.post('/api/contact/get', {
          email: session.user.email,
        });
        setData(response.data.user.contacts);
      } catch (err) {
        console.error('Error fetching contacts', err);
      } finally {
        setLoading(false);
      }
    };

    if (status === 'authenticated') {
      getContacts();
    }
  }, [status, session?.user?.email]);

  const filtered = useMemo(() => {
    if (!search.trim()) return data;
    const q = search.toLowerCase();
    return data.filter(
      (c) =>
        c.organization_name?.toLowerCase().includes(q) ||
        c.email?.toLowerCase().includes(q) ||
        c.city?.toLowerCase().includes(q)
    );
  }, [data, search]);

  const handleContactDeleted = (contactId) => {
    setData((prev) => prev.filter((item) => item._id !== contactId));
  };

  if (loading || status === 'loading') return <MainLoader />;

  return (
    <div className="flex justify-center px-4 py-8 mt-10">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5"
        >
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <IconUsersGroup size={26} /> Contacts
            </h1>
            <p className="text-sm text-neutral-500 mt-0.5">
              {data.length} {data.length === 1 ? 'connection' : 'connections'}
            </p>
          </div>
          <button
            onClick={() => router.push('/contact/request')}
            className="inline-flex items-center gap-1.5 bg-black text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-neutral-800 transition-colors cursor-pointer self-start sm:self-auto"
          >
            <IconUserPlus size={16} /> Requests
          </button>
        </motion.div>

        {/* Search */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="mb-4"
        >
          <div className="relative">
            <IconSearch size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Search by name, email, or city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-neutral-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black/10 transition-shadow"
            />
          </div>
        </motion.div>

        {/* Contact List */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="border border-neutral-200 rounded-2xl bg-white overflow-hidden"
        >
          <div className="max-h-[65vh] overflow-y-auto">
            {filtered.length > 0 ? (
              <div className="divide-y divide-neutral-100">
                {filtered.map((item, index) => (
                  <motion.div
                    key={item._id || item.email || index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.04 }}
                  >
                    <Contactcard
                      _id={item._id}
                      currentUserId={session?.user?.id}
                      email={item.email}
                      organization_name={item.organization_name}
                      city={item.city}
                      image={item.profileimage}
                      onDelete={handleContactDeleted}
                    />
                  </motion.div>
                ))}
              </div>
            ) : search.trim() ? (
              <div className="flex flex-col items-center justify-center py-16 text-neutral-400">
                <IconSearch size={32} className="mb-2 opacity-50" />
                <p className="text-sm">No contacts match &ldquo;{search}&rdquo;</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-neutral-400">
                <IconMoodEmpty size={32} className="mb-2 opacity-50" />
                <p className="text-sm">No contacts yet</p>
                <button
                  onClick={() => router.push('/market')}
                  className="mt-3 text-sm font-semibold text-black hover:underline cursor-pointer"
                >
                  Browse the market to connect
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Page;
