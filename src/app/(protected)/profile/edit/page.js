"use client";
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import BadgeDropdown from '@/components/BadgeDropdown';
import {
  IconArrowLeft,
  IconBuilding,
  IconMapPin,
  IconFileDescription,
  IconInfoCircle,
  IconUser,
  IconWorld,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconLoader2,
  IconCheck,
  IconAlertCircle,
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
  const router = useRouter();
  const { data: session, status } = useSession();
  const email = session?.user?.email;

  const [user, setUser] = useState({});
  const [selectedBadges, setSelectedBadges] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    const fetchUser = async () => {
      if (!email) return;
      try {
        const response = await axios.post('/api/user/getuser', { email });
        setUser(response.data.user);
        if (response.data.user.badges) {
          setSelectedBadges(response.data.user.badges);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setMessage({ text: 'Failed to fetch user data.', type: 'error' });
      } finally {
        setFetching(false);
      }
    };
    fetchUser();
  }, [email]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const response = await axios.post('/api/user/editprofile', {
        organization_name: user.organization_name,
        sessionemail: email,
        city: user.city,
        description: user.description,
        bio: user.bio,
        about: user.about,
        website: user.website,
        instagram: user.instagram,
        linkedin: user.linkedin,
        badges: selectedBadges,
      });

      setMessage({ text: response.data.message || 'Profile updated!', type: 'success' });
      setTimeout(() => router.push('/profile'), 1200);
    } catch (error) {
      console.error('Update error:', error);
      setMessage({
        text: error.response?.data?.error || error.response?.data?.message || 'Something went wrong.',
        type: 'error',
      });
    }
    setLoading(false);
  };

  if (status === 'loading' || fetching) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <IconLoader2 size={32} className="animate-spin text-neutral-400" />
      </div>
    );
  }

  return (
    <div className="flex justify-center px-4 py-8 mt-10">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0}
        className="w-full max-w-2xl"
      >
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="flex items-center gap-3 mb-6"
        >
          <button
            onClick={() => router.push('/profile')}
            className="p-2 rounded-xl border border-neutral-200 hover:bg-neutral-50 transition-colors cursor-pointer"
          >
            <IconArrowLeft size={18} />
          </button>
          <div>
            <h1 className="text-2xl font-bold">Edit Profile</h1>
            <p className="text-sm text-neutral-500">{email}</p>
          </div>
        </motion.div>

        {/* Message */}
        {message.text && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-5 px-4 py-3 rounded-xl text-sm flex items-center gap-2 ${
              message.type === 'success'
                ? 'bg-green-50 border border-green-200 text-green-700'
                : 'bg-red-50 border border-red-200 text-red-600'
            }`}
          >
            {message.type === 'success' ? <IconCheck size={16} /> : <IconAlertCircle size={16} />}
            {message.text}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Basic Info Section */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="border border-neutral-200 rounded-2xl p-5 bg-white"
          >
            <h2 className="font-semibold text-sm uppercase tracking-wide text-neutral-400 mb-4">
              Basic Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-neutral-600 mb-1 flex items-center gap-1">
                  <IconBuilding size={13} /> Organization Name
                </label>
                <input
                  type="text"
                  name="organization_name"
                  placeholder="Your organization"
                  value={user?.organization_name || ''}
                  onChange={handleChange}
                  required
                  className="w-full border border-neutral-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black/10 transition-shadow"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-neutral-600 mb-1 flex items-center gap-1">
                  <IconMapPin size={13} /> City
                </label>
                <input
                  type="text"
                  name="city"
                  placeholder="Your city"
                  value={user?.city || ''}
                  onChange={handleChange}
                  required
                  className="w-full border border-neutral-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black/10 transition-shadow"
                />
              </div>
            </div>
          </motion.div>

          {/* Description & Bio Section */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="border border-neutral-200 rounded-2xl p-5 bg-white"
          >
            <h2 className="font-semibold text-sm uppercase tracking-wide text-neutral-400 mb-4">
              About You
            </h2>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-neutral-600 mb-1 flex items-center gap-1">
                  <IconFileDescription size={13} /> Description
                </label>
                <textarea
                  name="description"
                  value={user?.description || ''}
                  placeholder="A short tagline for your business"
                  maxLength={80}
                  rows={2}
                  onChange={handleChange}
                  className="w-full border border-neutral-200 rounded-xl px-3 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-black/10 transition-shadow"
                />
                <p className="text-xs text-neutral-400 mt-0.5 text-right">
                  {(user?.description || '').length}/80
                </p>
              </div>

              <div>
                <label className="text-xs font-medium text-neutral-600 mb-1 flex items-center gap-1">
                  <IconUser size={13} /> Bio
                </label>
                <textarea
                  name="bio"
                  value={user?.bio || ''}
                  placeholder="Tell people about yourself"
                  maxLength={80}
                  rows={2}
                  onChange={handleChange}
                  className="w-full border border-neutral-200 rounded-xl px-3 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-black/10 transition-shadow"
                />
                <p className="text-xs text-neutral-400 mt-0.5 text-right">
                  {(user?.bio || '').length}/80
                </p>
              </div>

              <div>
                <label className="text-xs font-medium text-neutral-600 mb-1 flex items-center gap-1">
                  <IconInfoCircle size={13} /> About
                </label>
                <textarea
                  name="about"
                  value={user?.about || ''}
                  placeholder="More details about your organization"
                  maxLength={80}
                  rows={3}
                  onChange={handleChange}
                  className="w-full border border-neutral-200 rounded-xl px-3 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-black/10 transition-shadow"
                />
                <p className="text-xs text-neutral-400 mt-0.5 text-right">
                  {(user?.about || '').length}/80
                </p>
              </div>
            </div>
          </motion.div>

          {/* Badges Section */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
            className="border border-neutral-200 rounded-2xl p-5 bg-white"
          >
            <h2 className="font-semibold text-sm uppercase tracking-wide text-neutral-400 mb-4">
              Industry Badges
            </h2>
            <BadgeDropdown
              selectedBadges={selectedBadges}
              onBadgeChange={setSelectedBadges}
              placeholder="Select your industry badges..."
            />
          </motion.div>

          {/* Social Links Section */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={4}
            className="border border-neutral-200 rounded-2xl p-5 bg-white"
          >
            <h2 className="font-semibold text-sm uppercase tracking-wide text-neutral-400 mb-4">
              Social Links
            </h2>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-neutral-600 mb-1 flex items-center gap-1">
                  <IconWorld size={13} /> Website
                </label>
                <input
                  type="text"
                  name="website"
                  placeholder="https://yourwebsite.com"
                  value={user?.website || ''}
                  onChange={handleChange}
                  className="w-full border border-neutral-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black/10 transition-shadow"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-neutral-600 mb-1 flex items-center gap-1">
                  <IconBrandInstagram size={13} /> Instagram
                </label>
                <input
                  type="text"
                  name="instagram"
                  placeholder="https://instagram.com/yourhandle"
                  value={user?.instagram || ''}
                  onChange={handleChange}
                  className="w-full border border-neutral-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black/10 transition-shadow"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-neutral-600 mb-1 flex items-center gap-1">
                  <IconBrandLinkedin size={13} /> LinkedIn
                </label>
                <input
                  type="text"
                  name="linkedin"
                  placeholder="https://linkedin.com/in/yourprofile"
                  value={user?.linkedin || ''}
                  onChange={handleChange}
                  className="w-full border border-neutral-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black/10 transition-shadow"
                />
              </div>
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={5}
            className="flex flex-col sm:flex-row gap-3 pt-1 pb-4"
          >
            <button
              type="submit"
              disabled={loading}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-black text-white font-semibold py-3 rounded-xl hover:bg-neutral-800 transition-colors text-sm disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <>
                  <IconLoader2 size={16} className="animate-spin" /> Saving...
                </>
              ) : (
                <>
                  <IconCheck size={16} /> Update Profile
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => router.push('/profile')}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 border border-neutral-300 font-semibold py-3 px-6 rounded-xl hover:bg-neutral-50 transition-colors text-sm cursor-pointer"
            >
              Cancel
            </button>
          </motion.div>
        </form>

        {/* Last updated footer */}
        {user?.updatedAt && (
          <p className="text-center text-xs text-neutral-400 pb-4">
            Last updated {user.updatedAt.split('T')[0]}
          </p>
        )}
      </motion.div>
    </div>
  );
}

export default Page;
