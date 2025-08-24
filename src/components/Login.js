'use client';
import React, { useEffect, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

function Login() {

    const [user, setUser] = useState({ email: '', password: '' });
    const { data: session, status } = useSession();

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const router = useRouter();

    useEffect(() => {
        if (status === "authenticated") {
            router.push("/profile");
        }
    }, [status, router]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        const res = await signIn('credentials', {
            email: user.email,
            password: user.password,
            redirect: false,
        });

        setLoading(false);
        console.log(res);


        if (res?.ok) {
            toast.success('Successfully logged in!');
            router.push('/profile');
        } else {
            setMessage(res.error)
            toast.error(res.error || 'Error in login');

        }
    };


    return (
        <div className=' flex-col '>
            <button onClick={() => router.push('/')} className=' cursor-pointer flex items-center mb-5'>
                <span className="material-symbols-outlined" style={{ fontSize: '16px', marginRight: "5px" }}>
                    arrow_back
                </span>
                Home
            </button>
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

            <div className='text-center mt-4 '>
                <button onClick={() => router.push('/signup')} className='cursor-pointer'>
                    Dont have an account? Signup
                </button>
            </div>
            <div className=' flex justify-center items-center mt-4 flex-col gap-2'>

                <button
                    type="button"
                    onClick={() => signIn('google', { callbackUrl: '/profile' })}
                    className='flex cursor-pointer items-center justify-center gap-2 border border-gray-400 rounded-lg px-15 py-4 hover:bg-gray-100'
                >
                    <img
                        src="https://www.svgrepo.com/show/355037/google.svg"
                        alt="Google"
                        className="w-6 h-6"
                    />
                    Continue with Google
                </button>
                <button
                    type="button"
                    onClick={() => signIn('github', { callbackUrl: '/profile' })}
                    className='flex cursor-pointer items-center justify-center gap-2 border border-gray-400 rounded-lg px-15 py-4 hover:bg-gray-100'
                >
                    <img
                        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
                        alt="GitHub"
                        className="w-6 h-6"
                    />

                    Continue with Github
                </button>
            </div>
        </div>
    );
}

export default Login;
