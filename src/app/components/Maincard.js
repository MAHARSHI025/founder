"use client"
import React, { useEffect, useState } from 'react'




function Maincard() {

    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);

    const fetchUsers = async (pageNum) => {
        try {
            const response = await fetch(`http://localhost:3000/api/users/getusers?page=${pageNum}`);
            const data = await response.json();
            console.log(data.user);

            setUsers(data.user);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        fetchUsers(page);
    }, [page]);

    // Handle Remove & Load Next User
    const handleRemoveUser = () => {
        setUsers((prevUsers) => prevUsers.slice(1)); // Remove first user
        if (users.length <= 1) setPage((prevPage) => prevPage + 1); // Load next set if empty
    };



    return (
        <>
            <div className='p-2 flex justify-center items-center'>

                <div className='flex flex-col justify-center border p-4 rounded-2xl max-w-80 drop-shadow-lg'>
                    <div className="image-holder mb-4 px-1 flex justify-center">
                        <img className=' h-60 w-60 rounded-2xl' src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2595" alt="" />
                    </div>

                    <div className="card-content">
                        <h1 className=' font-medium text-2xl cursor-pointer'>{users[0]?.username || "Loading..."}</h1>
                        <h3 className=' text-neutral-600'>{users[0]?.gender || "Not available"}</h3>
                        <h4 className=' text-neutral-400 text-wrap text-sm mt-2 max-w-60'>{users[0]?.description }</h4>
                        <h4 className=' text-neutral-400 text-wrap text-sm mt-2'>Typeofdate:- {users[0]?.typeofdate || "Loading..."}</h4>
                        <h4 className=' text-neutral-400 text-wrap text-sm mt-2'>Addiction:- {users[0]?.addictions || "Loading..."}</h4>
                        <h4 className=' text-neutral-400 text-wrap text-sm mt-2'>hoobies:- {users[0]?.hoobies || "Loading..."}</h4>
                    </div>

                    <div className="card-button flex justify-between mt-5 drop-shadow-lg">
                        <button onClick={handleRemoveUser} className=' bg-red-600 rounded-full flex justify-center items-center text-white  p-2 cursor-pointer'>
                            <span className="material-symbols-outlined">
                                close
                            </span>
                        </button>
                        <button className=' bg-yellow-600 rounded-full flex justify-center items-center text-white  p-2 cursor-pointer'>
                            <span className="material-symbols-outlined">
                                favorite
                            </span>
                        </button>
                        <button className=' bg-green-600 rounded-full flex justify-center items-center text-white p-2 cursor-pointer'>
                            <span className="material-symbols-outlined">
                                check
                            </span>
                        </button>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Maincard
