'use client';
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

function Login({ setaction }) {
    const [user, setUser] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        console.log(user);
        

        const res = await signIn('credentials', {
            email: user.email,
            password: user.password,
            redirect: false, 
        });
        toast.success('Successfully logged in!');

        setLoading(false);
    };

    return (
        <div className=' w-full flex items-center justify-center flex-col mt-6'>
            <form onSubmit={handleSubmit}>
                <div className='flex flex-col gap-4 mx-auto max-w-min min-w-xs border border-gray-300 p-6 py-10 rounded-lg drop-shadow-2xl'>
                    <h1 className='text-2xl font-bold text-center'>Login</h1>

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
                <button onClick={() => setaction('signup')}>
                    Dont have an account? Signup
                </button>
            </div>
        </div>
    );
}

export default Login;
