'use client';
import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

function Signup({ setaction }) {

    const [user, setUser] = useState({
        organization_name: '',
        email: '',
        password: ''
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');



    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const response = await axios.post('/api/user/signup', user);
            setMessage(response.data.message || 'Signup successful!');
            toast.success('Successfully created!');
            setaction('login');
            setUser({ organization_name: '', email: '', password: '' });
        } catch (error) {
            console.error('Signup error:', error);
            setMessage(
                error.response?.data?.error || error.response?.data?.message || 'Something went wrong.'
            );
        }

        setLoading(false);
    };



    return (
        <div className=' w-full flex flex-col items-center  mt-6 justify-center'>
            <form onSubmit={handleSubmit}>
                <div className='flex flex-col gap-4 mx-auto max-w-min min-w-xs border border-gray-300 p-6 py-10 rounded-lg drop-shadow-2xl'>
                    <h1 className='text-2xl font-bold text-center'>Signup</h1>

                    <input
                        type="text"
                        name="organization_name"
                        placeholder="Enter organization name"
                        value={user.organization_name}
                        onChange={handleChange}
                        required
                        className='border rounded-lg px-2 py-1 border-gray-400'
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        value={user.email}
                        onChange={handleChange}
                        required
                        className='border rounded-lg px-2 py-1 border-gray-400'
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        value={user.password}
                        onChange={handleChange}
                        required
                        className='border rounded-lg px-2 py-1 border-gray-400'
                    />

                    <button
                        type="submit"
                        className='bg-black text-white rounded-lg px-2 py-1.5 mt-4'
                        disabled={loading}
                    >
                        {loading ? 'Submitting...' : 'Continue'}
                    </button>

                    {message && (
                        <p className='text-sm text-center mt-2 text-red-500'>{message}</p>
                    )}
                </div>

            </form>
            <div className='text-center mt-4'>
                <button onClick={() => setaction('login')}>
                    Already have an account? Login
                </button>
            </div>
        </div>
    )
}

export default Signup
