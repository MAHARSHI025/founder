"use client"
import React, { useState } from 'react'
import { HoveredLink, Menu, MenuItem, ProductItem } from './ui/navbar-menu'
import Link from 'next/link';
import { signOut } from 'next-auth/react';

function Navbar2() {

    const [active, setActive] = useState(null);

    return (
        <div className=' fixed left-1/2 right-1/2 z-[500] top-1 '>

            <Menu setActive={setActive} >


                <Link href={"/"}>Home</Link>
                <Link href={"/market"}>Market</Link>

                <MenuItem item="About" active={active} setActive={setActive}>
                    <div className="flex flex-col space-y-2 ">
                        <HoveredLink href="/about">Our Story</HoveredLink >
                        <HoveredLink href="/about">Portfolio</HoveredLink>
                        <HoveredLink href="/about">Developer</HoveredLink>
                    </div>
                </MenuItem>
                <MenuItem item="User" active={active} setActive={setActive}>
                    <div className="flex flex-col space-y-2 ">
                        <HoveredLink href="/profile">Profile</HoveredLink>
                        <HoveredLink href="/profile/edit">Edit</HoveredLink>
                        <HoveredLink href="/profile/posts">Posts</HoveredLink>
                        <HoveredLink href="/profile/updateimage">Edit image</HoveredLink>
                        <HoveredLink href="/contact">Contacts</HoveredLink>
                        <button onClick={() => signOut()} className=' bg-red-800 px-3 py-1 rounded-lg cursor-pointer  '>Signout</button>
                    </div>
                </MenuItem>
            </Menu>
        </div>
    )
}

export default Navbar2
