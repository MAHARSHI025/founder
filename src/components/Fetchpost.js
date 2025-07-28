"use client";
import axios from 'axios';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

function Fetchpost() {
    const { data: session, status } = useSession();
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                if (!session?.user?.email) return; 

                const response = await axios.post("/api/user/posts/get", {
                    email: session.user.email,
                });

                console.log(response);
                setData(response.data);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        if (status === "authenticated") {
            fetchPost();
        }
    }, [status, session]);

    const deletepost = async (id) => {
        try {
            console.log("post id for delete route from frontend",id);
            
            await axios.post("/api/user/posts/delete", { id });
            setData((prev) => ({
                ...prev,
                findpost: prev.findpost.filter((post) => post._id !== id),
            }));
        } catch (error) {
            console.error("Failed to delete post", error);
        }
    };

    if (status === "loading" || !session?.user?.email) {
        return <p>Loading...</p>;
    }

    return (
        <div className='flex mt-15  gap-3  flex-wrap justify-center'>
            {data && data.findpost.length > 0 ? (
                data.findpost.map((res) => (
                    <div className="flex justify-center items-center flex-col mb-3" key={res._id}>
                        <div className="shadow border border-gray-300 text-center rounded-2xl max-w-sm mx-auto flex justify-center items-center flex-col p-4 gap-4 relative">
                            <button className='absolute top-2 right-5 text-xl' onClick={() => deletepost(res._id)}>
                                <span className="material-symbols-outlined text-red-200 hover:text-red-600 cursor-pointer">
                                    delete
                                </span>
                            </button>
                            <div className="text-left mt-8">
                                <img src={res.postimage} alt="" className='rounded-2xl object-cover max-h-80' />
                                <h5 className='text-sm text-neutral-600 my-2'>{res.createdAt.split("T")[0]}</h5>
                                <h3>{res.description}</h3>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p className='text-center text-gray-500'>No posts found.</p>
            )}
        </div>
    );
}

export default Fetchpost;
