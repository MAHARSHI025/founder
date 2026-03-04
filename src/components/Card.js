'use client';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import {
  IconCheck,
  IconMapPin,
  IconCalendar,
  IconUsersGroup,
  IconPencil,
  IconPhoto,
  IconUser,
  IconPlus,
  IconTrash,
  IconX,
  IconArticle,
  IconCloudUpload,
  IconArrowLeft,
  IconLoader2,
  IconCamera,
} from '@tabler/icons-react';
import MainLoader from './MainLoader';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.08, ease: 'easeOut' },
  }),
};

function Card() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Posts state
  const [showPosts, setShowPosts] = useState(false);
  const [postView, setPostView] = useState('list'); // 'list' | 'add'
  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(false);

  // Bottom tab: 'none' | 'posts' | 'images'
  const [activeTab, setActiveTab] = useState('none');

  // Upload state (posts)
  const [uploadLink, setUploadLink] = useState('');
  const [uploadImgId, setUploadImgId] = useState('');
  const [uploadDesc, setUploadDesc] = useState('');
  const [fileUploading, setFileUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  // Image update state
  const [profileFile, setProfileFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [imageError, setImageError] = useState('');
  const [imageSuccess, setImageSuccess] = useState('');

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.post('/api/user/getuser', {
          email: session?.user?.email,
        });
        setUser(response.data.user);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user?.email) {
      getUser();
    }
  }, [session?.user?.email]);

  // Fetch posts when section opens
  useEffect(() => {
    const fetchPosts = async () => {
      if (!session?.user?.email) return;
      setPostsLoading(true);
      try {
        const response = await axios.post('/api/user/posts/get', {
          email: session.user.email,
        });
        setPosts(response.data.findpost || []);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setPostsLoading(false);
      }
    };

    if (activeTab === 'posts') {
      fetchPosts();
    }
  }, [activeTab, session?.user?.email]);

  const deletePost = async (id) => {
    try {
      await axios.post('/api/user/posts/delete', { id });
      setPosts((prev) => prev.filter((post) => post._id !== id));
    } catch (error) {
      console.error('Failed to delete post', error);
    }
  };

  const handleFileChange = async (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setUploadError('No file selected.');
      return;
    }
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    try {
      setFileUploading(true);
      const response = await axios.post('/api/upload', formData);
      setUploadLink(response.data.url);
      setUploadImgId(response.data.public_id);
      setUploadError('');
    } catch (error) {
      console.error('Upload failed:', error);
      setUploadError('File upload failed. Try again.');
    } finally {
      setFileUploading(false);
    }
  };

  const handlePostSubmit = async () => {
    if (!uploadLink || !uploadImgId) {
      setUploadError('Please upload an image first.');
      return;
    }
    if (!uploadDesc.trim()) {
      setUploadError('Please enter a description.');
      return;
    }
    try {
      await axios.post('/api/user/posts/add', {
        email: session?.user?.email,
        img_url: uploadLink,
        description: uploadDesc,
        img_id: uploadImgId,
      });
      // Reset & switch back to list
      setUploadLink('');
      setUploadImgId('');
      setUploadDesc('');
      setUploadError('');
      setPostView('list');
      // Refetch posts
      const response = await axios.post('/api/user/posts/get', {
        email: session.user.email,
      });
      setPosts(response.data.findpost || []);
    } catch (error) {
      console.error('Error creating post:', error);
      setUploadError('Failed to create post.');
    }
  };

  // Image upload handler (profile or cover)
  const uploadImage = async (file, type) => {
    if (!file) {
      setImageError('Please select a file first.');
      return;
    }
    const formData = new FormData();
    formData.append('image', file);
    formData.append('email', session?.user?.email);
    formData.append('type', type);

    try {
      setImageUploading(true);
      setImageError('');
      setImageSuccess('');
      const response = await axios.post('/api/upload', formData);

      await axios.post('/api/user/image', {
        link: response.data.url,
        email: session?.user?.email,
        type,
      });

      setUser((prev) => ({
        ...prev,
        [`${type}image`]: response.data.url,
      }));

      // Reset file input
      if (type === 'profile') setProfileFile(null);
      else setCoverFile(null);

      setImageSuccess(`${type.charAt(0).toUpperCase() + type.slice(1)} image updated!`);
      setTimeout(() => setImageSuccess(''), 3000);
    } catch (error) {
      console.error('Upload error:', error);
      setImageError('Upload failed. Please try again.');
    } finally {
      setImageUploading(false);
    }
  };

  if (status === 'loading' || loading) return <MainLoader />;

  if (!user) return <p className="text-center mt-10 text-neutral-500">User not found.</p>;

  const joinDate = user?.createdAt?.slice(0, 10);
  const updateDate = user?.updatedAt?.slice(0, 10);

  return (
    <div className="flex justify-center px-4 py-8 mt-10">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0}
        className="w-full max-w-2xl"
      >
        {/* Cover + Avatar */}
        <div className="relative">
          <div className="w-full h-44 sm:h-56 rounded-2xl overflow-hidden border border-neutral-200">
            {user?.coverimage ? (
              <img
                className="w-full h-full object-cover"
                src={user.coverimage}
                alt="Cover"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full bg-linear-to-br from-neutral-200 to-neutral-300 flex items-center justify-center">
                <IconPhoto size={40} className="text-neutral-400" />
              </div>
            )}
          </div>

          {/* Avatar */}
          <div className="absolute -bottom-12 left-5 sm:left-8">
            <div className="relative">
              {user?.profileimage ? (
                <img
                  className="h-24 w-24 rounded-full border-4 border-white object-cover shadow-md"
                  src={user.profileimage}
                  alt="Profile"
                  loading="lazy"
                />
              ) : (
                <div className="h-24 w-24 rounded-full border-4 border-white shadow-md bg-neutral-100 flex items-center justify-center">
                  <IconUser size={36} className="text-neutral-400" />
                </div>
              )}
              {user?.isverified && (
                <span className="absolute bottom-0 right-0 bg-green-500 text-white rounded-full p-0.5 shadow">
                  <IconCheck size={14} stroke={3} />
                </span>
              )}
            </div>
          </div>

          {/* Edit buttons */}
          <div className="absolute top-3 right-3 flex gap-2">
            <button
              onClick={() => {
                setActiveTab((prev) => prev === 'images' ? 'none' : 'images');
                setImageError('');
                setImageSuccess('');
              }}
              className={`backdrop-blur-sm p-2 rounded-full transition-colors shadow-sm cursor-pointer ${
                activeTab === 'images'
                  ? 'bg-black text-white hover:bg-neutral-800'
                  : 'bg-white/80 hover:bg-white'
              }`}
              title="Change images"
            >
              <IconCamera size={16} />
            </button>
            <Link
              href="/profile/edit"
              className="bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors shadow-sm"
              title="Edit profile"
            >
              <IconPencil size={16} />
            </Link>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-14 px-5 sm:px-8">
          {/* Name + Meta */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={1}>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-bold">{user?.organization_name}</h1>
              {user?.isverified && (
                <span className="inline-flex items-center gap-1 text-xs font-medium bg-green-50 text-green-600 px-2 py-0.5 rounded-full">
                  <IconCheck size={12} stroke={3} /> Verified
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-neutral-500">
              {user?.city && (
                <span className="flex items-center gap-1">
                  <IconMapPin size={14} /> {user.city}
                </span>
              )}
              {user?.likecount !== undefined && (
                <span className="flex items-center gap-1">
                  <IconUsersGroup size={14} /> {user.likecount} contacts
                </span>
              )}
              {joinDate && (
                <span className="flex items-center gap-1">
                  <IconCalendar size={14} /> Joined {joinDate}
                </span>
              )}
            </div>
          </motion.div>

          {/* Bio / Description / About */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="mt-4 space-y-3"
          >
            {user?.description && (
              <p className="text-base text-neutral-700 leading-relaxed">{user.description}</p>
            )}
            {user?.bio && (
              <p className="text-sm text-neutral-500 leading-relaxed">{user.bio}</p>
            )}
            {user?.about && (
              <div className="bg-neutral-50 rounded-xl p-4 text-sm text-neutral-600 leading-relaxed border border-neutral-100">
                <h3 className="font-semibold text-neutral-800 mb-1 text-xs uppercase tracking-wide">About</h3>
                {user.about}
              </div>
            )}
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
            className="mt-5 flex flex-wrap gap-3"
          >
            <Link
              href="/profile/edit"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-black text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-neutral-800 transition-colors text-sm"
            >
              <IconPencil size={16} /> Edit Profile
            </Link>
            <button
              onClick={() => {
                setActiveTab((prev) => prev === 'posts' ? 'none' : 'posts');
                setPostView('list');
              }}
              className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-2 border font-semibold px-6 py-2.5 rounded-xl transition-colors text-sm cursor-pointer ${
                activeTab === 'posts'
                  ? 'bg-black text-white border-black hover:bg-neutral-800'
                  : 'border-neutral-300 hover:bg-neutral-50'
              }`}
            >
              <IconArticle size={16} /> My Posts
            </button>
            <button
              onClick={() => {
                setActiveTab((prev) => prev === 'images' ? 'none' : 'images');
                setImageError('');
                setImageSuccess('');
              }}
              className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-2 border font-semibold px-6 py-2.5 rounded-xl transition-colors text-sm cursor-pointer ${
                activeTab === 'images'
                  ? 'bg-black text-white border-black hover:bg-neutral-800'
                  : 'border-neutral-300 hover:bg-neutral-50'
              }`}
            >
              <IconCamera size={16} /> Update Images
            </button>
          </motion.div>

          {/* Footer meta */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={4}
            className="mt-5 pt-4 border-t border-neutral-100 flex flex-wrap justify-between text-xs text-neutral-400"
          >
            {updateDate && <span>Last updated {updateDate}</span>}
            {user?.email && <span>{user.email}</span>}
          </motion.div>
        </div>

        {/* ── Inline Bottom Sections ── */}
        <AnimatePresence mode="wait">
          {activeTab === 'posts' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="mt-6 px-5 sm:px-8 pb-6">
                <div className="border-t border-neutral-200 pt-6">
                  {/* Posts Header */}
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                      <IconArticle size={22} /> My Posts
                    </h2>
                    {postView === 'list' ? (
                      <button
                        onClick={() => setPostView('add')}
                        className="inline-flex items-center gap-1.5 bg-black text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-neutral-800 transition-colors cursor-pointer"
                      >
                        <IconPlus size={16} /> New Post
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setPostView('list');
                          setUploadError('');
                          setUploadLink('');
                          setUploadImgId('');
                          setUploadDesc('');
                        }}
                        className="inline-flex items-center gap-1.5 border border-neutral-300 text-sm font-semibold px-4 py-2 rounded-xl hover:bg-neutral-50 transition-colors cursor-pointer"
                      >
                        <IconArrowLeft size={16} /> Back to Posts
                      </button>
                    )}
                  </div>

                  {/* Upload Form */}
                  <AnimatePresence mode="wait">
                    {postView === 'add' && (
                      <motion.div
                        key="upload"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="border border-neutral-200 rounded-2xl p-5 mb-5 bg-neutral-50"
                      >
                        <h3 className="font-semibold text-base mb-3">Create a new post</h3>

                        <textarea
                          className="w-full border border-neutral-200 rounded-xl p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-black/10 bg-white"
                          rows={3}
                          maxLength={80}
                          placeholder="What's on your mind? (max 80 chars)"
                          value={uploadDesc}
                          onChange={(e) => setUploadDesc(e.target.value)}
                        />

                        <label className="mt-3 flex items-center justify-center gap-2 border-2 border-dashed border-neutral-300 rounded-xl p-4 text-sm text-neutral-500 cursor-pointer hover:border-neutral-400 transition-colors">
                          <IconCloudUpload size={20} />
                          {fileUploading ? 'Uploading...' : uploadLink ? 'Change image' : 'Upload image'}
                          <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                        </label>

                        {uploadLink && (
                          <div className="mt-3 relative inline-block">
                            <img src={uploadLink} alt="Preview" className="w-24 h-24 object-cover rounded-xl border border-neutral-200" />
                            <button
                              onClick={() => { setUploadLink(''); setUploadImgId(''); }}
                              className="absolute -top-2 -right-2 bg-white border border-neutral-200 rounded-full p-0.5 shadow-sm hover:bg-red-50 cursor-pointer"
                            >
                              <IconX size={12} />
                            </button>
                          </div>
                        )}

                        {uploadError && (
                          <p className="text-red-500 text-xs mt-2">{uploadError}</p>
                        )}

                        <button
                          onClick={handlePostSubmit}
                          disabled={fileUploading}
                          className="mt-4 w-full bg-black text-white font-semibold py-2.5 rounded-xl hover:bg-neutral-800 transition-colors text-sm disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                        >
                          {fileUploading && <IconLoader2 size={16} className="animate-spin" />}
                          Publish Post
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Posts List */}
                  <AnimatePresence mode="wait">
                    {postView === 'list' && (
                      <motion.div
                        key="posts"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {postsLoading ? (
                          <div className="flex justify-center py-10">
                            <IconLoader2 size={28} className="animate-spin text-neutral-400" />
                          </div>
                        ) : posts.length > 0 ? (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {posts.map((post, i) => (
                              <motion.div
                                key={post._id}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: i * 0.06 }}
                                className="group relative border border-neutral-200 rounded-2xl overflow-hidden bg-white hover:shadow-md transition-shadow"
                              >
                                {post.postimage && (
                                  <img
                                    src={post.postimage}
                                    alt=""
                                    className="w-full h-48 object-cover"
                                    loading="lazy"
                                  />
                                )}
                                <div className="p-4">
                                  <p className="text-sm text-neutral-700 leading-relaxed">{post.description}</p>
                                  <p className="text-xs text-neutral-400 mt-2">{post.createdAt?.split('T')[0]}</p>
                                </div>
                                <button
                                  onClick={() => deletePost(post._id)}
                                  className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 hover:text-red-500 cursor-pointer shadow-sm"
                                  title="Delete post"
                                >
                                  <IconTrash size={16} />
                                </button>
                              </motion.div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-10 text-neutral-400">
                            <IconArticle size={32} className="mx-auto mb-2 opacity-50" />
                            <p className="text-sm">No posts yet. Create your first one!</p>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── Inline Image Update Section ── */}
          {activeTab === 'images' && (
            <motion.div
              key="images"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="mt-6 px-5 sm:px-8 pb-6">
                <div className="border-t border-neutral-200 pt-6">
                  <h2 className="text-xl font-bold flex items-center gap-2 mb-5">
                    <IconCamera size={22} /> Update Images
                  </h2>

                  {imageSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-4 px-4 py-2.5 bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl flex items-center gap-2"
                    >
                      <IconCheck size={16} /> {imageSuccess}
                    </motion.div>
                  )}
                  {imageError && (
                    <p className="mb-4 px-4 py-2.5 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl">
                      {imageError}
                    </p>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Profile Image Upload */}
                    <div className="border border-neutral-200 rounded-2xl p-5 bg-neutral-50">
                      <h3 className="font-semibold text-sm mb-3">Profile Image</h3>
                      <div className="flex items-center gap-3 mb-3">
                        {user?.profileimage ? (
                          <img
                            src={user.profileimage}
                            alt="Profile"
                            className="h-16 w-16 rounded-full object-cover border border-neutral-200"
                          />
                        ) : (
                          <div className="h-16 w-16 rounded-full bg-neutral-200 flex items-center justify-center">
                            <IconUser size={24} className="text-neutral-400" />
                          </div>
                        )}
                        <span className="text-xs text-neutral-400">Current image</span>
                      </div>
                      <label className="flex items-center justify-center gap-2 border-2 border-dashed border-neutral-300 rounded-xl p-3 text-sm text-neutral-500 cursor-pointer hover:border-neutral-400 transition-colors">
                        <IconCloudUpload size={18} />
                        {profileFile ? profileFile.name : 'Choose file'}
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={(e) => {
                            setProfileFile(e.target.files[0] || null);
                            setImageError('');
                          }}
                        />
                      </label>
                      <button
                        onClick={() => uploadImage(profileFile, 'profile')}
                        disabled={imageUploading || !profileFile}
                        className="mt-3 w-full bg-black text-white font-semibold py-2.5 rounded-xl hover:bg-neutral-800 transition-colors text-sm disabled:opacity-40 cursor-pointer flex items-center justify-center gap-2"
                      >
                        {imageUploading && <IconLoader2 size={16} className="animate-spin" />}
                        Upload Profile
                      </button>
                    </div>

                    {/* Cover Image Upload */}
                    <div className="border border-neutral-200 rounded-2xl p-5 bg-neutral-50">
                      <h3 className="font-semibold text-sm mb-3">Cover Image</h3>
                      <div className="mb-3 rounded-xl overflow-hidden border border-neutral-200 h-16">
                        {user?.coverimage ? (
                          <img
                            src={user.coverimage}
                            alt="Cover"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-neutral-200 flex items-center justify-center">
                            <IconPhoto size={20} className="text-neutral-400" />
                          </div>
                        )}
                      </div>
                      <label className="flex items-center justify-center gap-2 border-2 border-dashed border-neutral-300 rounded-xl p-3 text-sm text-neutral-500 cursor-pointer hover:border-neutral-400 transition-colors">
                        <IconCloudUpload size={18} />
                        {coverFile ? coverFile.name : 'Choose file'}
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={(e) => {
                            setCoverFile(e.target.files[0] || null);
                            setImageError('');
                          }}
                        />
                      </label>
                      <button
                        onClick={() => uploadImage(coverFile, 'cover')}
                        disabled={imageUploading || !coverFile}
                        className="mt-3 w-full bg-black text-white font-semibold py-2.5 rounded-xl hover:bg-neutral-800 transition-colors text-sm disabled:opacity-40 cursor-pointer flex items-center justify-center gap-2"
                      >
                        {imageUploading && <IconLoader2 size={16} className="animate-spin" />}
                        Upload Cover
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default Card;
