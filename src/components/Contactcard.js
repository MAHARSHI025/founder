"use client";

import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import ConfirmDeletePopup from './ConfirmDeletePopup';
import {
  IconMessageCircle,
  IconTrash,
  IconMapPin,
  IconUser,
} from '@tabler/icons-react';

function Contactcard({ _id, currentUserId, email, organization_name, city, image, onDelete }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const handleDeleteContact = async () => {
    if (!_id || !currentUserId || isDeleting) {
      return;
    }

    setIsDeleting(true);
    try {
      await axios.post('/api/contact/delete', {
        user_id: currentUserId,
        contact_id: _id,
      });
      toast.success('Contact removed');
      if (onDelete) {
        onDelete(_id);
      }
    } catch (error) {
      const message = error?.response?.data?.message || 'Failed to remove contact';
      toast.error(message);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex items-center gap-4 px-4 sm:px-5 py-3.5 hover:bg-neutral-50 transition-colors">
      {/* Avatar */}
      <div className="shrink-0">
        {image ? (
          <img
            src={image}
            alt={organization_name}
            className="h-11 w-11 rounded-full object-cover border border-neutral-200"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        <div
          className={`h-11 w-11 rounded-full bg-neutral-100 items-center justify-center border border-neutral-200 ${
            image ? 'hidden' : 'flex'
          }`}
        >
          <IconUser size={20} className="text-neutral-400" />
        </div>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-sm truncate">
          {organization_name || 'Unknown'}
        </h3>
        <p className="text-xs text-neutral-500 truncate">{email}</p>
        {city && (
          <p className="text-xs text-neutral-400 flex items-center gap-0.5 mt-0.5">
            <IconMapPin size={11} /> {city}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 shrink-0">
        <button
          onClick={() => router.push(`/chat?email=${encodeURIComponent(email)}`)}
          className="p-2 rounded-lg text-neutral-400 hover:text-black hover:bg-neutral-100 transition-colors cursor-pointer"
          title="Chat"
        >
          <IconMessageCircle size={18} />
        </button>
        <button
          onClick={() => setShowDeletePopup(true)}
          disabled={isDeleting}
          className="p-2 rounded-lg text-neutral-400 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
          title="Remove contact"
        >
          <IconTrash size={18} />
        </button>
      </div>

      <ConfirmDeletePopup
        open={showDeletePopup}
        title="Delete Contact"
        message={`Are you sure you want to remove ${organization_name || 'this contact'}?`}
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={isDeleting}
        onCancel={() => setShowDeletePopup(false)}
        onConfirm={async () => {
          await handleDeleteContact();
          setShowDeletePopup(false);
        }}
      />
    </div>
  );
}

export default Contactcard
