'use client'
import MarketCard from '@/components/MarketCard'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

function page() {

    const { data: session, status } = useSession();
    const [user, setuser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const getuser = async () => {
            try {
                const response = await axios.post('/api/market/get');
                console.log(response.data);
                setuser(response.data.allUser);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        if (session?.user?.email) {
            getuser();
        }
    }, [session]);

    return (
        <div>
            <MarketCard user={user}></MarketCard>
        </div>
    )
}

export default page
