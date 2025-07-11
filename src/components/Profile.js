import { signOut, useSession } from 'next-auth/react';
import React, { useState } from 'react'
import Uploadimage from './Uploadimage';
import Card from './Card';

function Profile() {

    const { data: session, status } = useSession();
    const [action, setAction] = useState('profile');

    if (status === 'loading') {
        return <p>Loading...</p>;
    }


    // console.log("Session Data:", session);
    // console.log("Session name:", session.user.organization_name);

    if (action === 'image') {
        return (
            <Uploadimage setaction={setAction} />
        );

    }
    if (action === 'profile') {
        return (
            <div>
                <Card  />
                
            </div>
        );

    }

    return (
        <div>
            <h1 onClick={() => { setAction('image') }}>image</h1>
            {/* <Card setaction={setAction} /> */}
        </div>
    )
}

export default Profile
