"use client";
import Card from '@/components/Card';
import Login from '@/components/Login';
import Signup from '@/components/Signup'
import { useSession } from 'next-auth/react';
import React, { useState } from 'react'

export default function Page() {

    const { data: session, status } = useSession();

    return (
        <div>

            <Card/>
        </div>
    );
}
