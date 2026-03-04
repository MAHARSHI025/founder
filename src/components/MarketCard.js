"use client";

import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Postpopup from './Postpopup';
import {
  IconCheck,
  IconMapPin,
  IconUsersGroup,
  IconArticle,
  IconWorld,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconUserPlus,
  IconLoader2,
  IconUser,
  IconPhoto,
} from '@tabler/icons-react';

function MarketCard({ user }) {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();

  if (!user) return null;

  const contacthandle = async (receiver_id) => {
    if (!session?.user?.id) {
      toast.error('Please login to add contacts');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post('/api/contact/add', {
        sender_id: session.user.id,
        receiver_id: receiver_id,
      });
      toast.success('Contact Added Successfully');
      router.push('/contact');
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error.response?.status === 409) {
        toast.error('Contact already exists');
      } else if (error.response?.status === 400) {
        toast.error('Invalid request');
      } else {
        toast.error('Failed to add contact. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const hasSocials = user?.linkedin || user?.instagram || user?.website;

  return (
    <>
      <div className="flex flex-col bg-white border border-neutral-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full">
        {/* Cover Image */}
        <div className="relative h-36 sm:h-40 bg-neutral-100">
          {user?.coverimage ? (
            <img
              className="w-full h-full object-cover"
              src={user.coverimage}
              alt=""
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-linear-to-br from-neutral-200 to-neutral-300 flex items-center justify-center">
              <IconPhoto size={32} className="text-neutral-400" />
            </div>
          )}

          {/* Badges overlay */}
          {user?.badges && user.badges.length > 0 && (
            <div className="absolute top-2 left-2 flex flex-wrap gap-1">
              {user.badges.slice(0, 3).map((badge, i) => (
                <span
                  key={i}
                  className="bg-white/90 backdrop-blur-sm text-[10px] font-semibold px-2 py-0.5 rounded-full text-neutral-700"
                >
                  {badge}
                </span>
              ))}
              {user.badges.length > 3 && (
                <span className="bg-white/90 backdrop-blur-sm text-[10px] font-semibold px-2 py-0.5 rounded-full text-neutral-500">
                  +{user.badges.length - 3}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Avatar + Name area */}
        <div className="relative px-4 pt-0">
          {/* Avatar - overlaps cover */}
          <div className="relative -mt-8">
            {user?.profileimage ? (
              <img
                className="h-16 w-16 rounded-full border-[3px] border-white object-cover shadow-sm"
                src={user.profileimage}
                alt=""
                loading="lazy"
              />
            ) : (
              <div className="h-16 w-16 rounded-full border-[3px] border-white bg-neutral-100 flex items-center justify-center shadow-sm">
                <IconUser size={24} className="text-neutral-400" />
              </div>
            )}
          </div>

          {/* Name + Location */}
          <div className="mt-2">
            <div className="flex items-center gap-1.5">
              <h2 className="font-bold text-lg leading-tight truncate">
                {user?.organization_name}
              </h2>
              {user?.isverified && (
                <span className="bg-green-500 text-white rounded-full p-0.5 shrink-0">
                  <IconCheck size={12} stroke={3} />
                </span>
              )}
            </div>
            {user?.city && (
              <p className="text-xs text-neutral-500 flex items-center gap-0.5 mt-0.5">
                <IconMapPin size={12} /> {user.city}
              </p>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="px-4 mt-2.5 flex-1">
          {user?.description && (
            <p className="text-sm text-neutral-700 leading-relaxed line-clamp-2">
              {user.description}
            </p>
          )}
          {user?.bio && (
            <p className="text-xs text-neutral-500 mt-1 line-clamp-1">{user.bio}</p>
          )}
        </div>

        {/* Social + Meta */}
        <div className="px-4 mt-3">
          <div className="flex items-center justify-between text-xs text-neutral-400">
            <span className="flex items-center gap-1">
              <IconUsersGroup size={13} /> {user?.contacts?.length || 0} contacts
            </span>
            <span>{user?.updatedAt?.slice(0, 10)}</span>
          </div>

          {hasSocials && (
            <div className="flex items-center gap-2 mt-2">
              {user.linkedin && (
                <a
                  href={user.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-black transition-colors"
                >
                  <IconBrandLinkedin size={18} />
                </a>
              )}
              {user.instagram && (
                <a
                  href={user.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-black transition-colors"
                >
                  <IconBrandInstagram size={18} />
                </a>
              )}
              {user.website && (
                <a
                  href={user.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-black transition-colors"
                >
                  <IconWorld size={18} />
                </a>
              )}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="px-4 pt-3 pb-4 mt-auto flex gap-2">
          <button
            onClick={() => contacthandle(user._id)}
            disabled={isLoading}
            className="flex-1 inline-flex items-center justify-center gap-1.5 bg-black text-white font-semibold py-2.5 rounded-xl hover:bg-neutral-800 transition-colors text-sm disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? (
              <>
                <IconLoader2 size={15} className="animate-spin" /> Adding...
              </>
            ) : (
              <>
                <IconUserPlus size={15} /> Connect
              </>
            )}
          </button>
          <button
            onClick={() => setShowPopup(true)}
            className="inline-flex items-center justify-center gap-1.5 border border-neutral-200 font-semibold py-2.5 px-4 rounded-xl hover:bg-neutral-50 transition-colors text-sm cursor-pointer"
          >
            <IconArticle size={15} /> Posts
          </button>
        </div>
      </div>

      {/* Post Popup */}
      {showPopup && (
        <Postpopup posts={user} onClose={() => setShowPopup(false)} />
      )}
    </>
  );
}

export default MarketCard;
