'use client';

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

function Page() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [user, setUser] = useState({});
    const [link, setlink] = useState("");
    // const [type, settype] = useState("profile");
    console.log("Session Data:", session);


    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/profile");
        }
    }, [status, router]);

    if (status === "loading") {
        return <p>Loading...</p>;
    }

    const uploadfile = async (e, type) => {
        console.log("File upload initiated for type:", type);
        if (!e.target.files || e.target.files.length === 0) {
            return console.error("No files selected for upload.");
        }

        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("image", file);
        formData.append("email", session?.user.email);
        formData.append("type", type);

        try {
            const response = await axios.post("/api/upload", formData); 
            const imageUrl = response.data.url;
            console.log("File uploaded successfully:", imageUrl);

            setlink(imageUrl); 
            await axios.post("/api/user/image", {
                link: imageUrl,
                email: session?.user.email,
                type,
            });

        } catch (error) {
            if (error.response) {
                console.error("Server responded with error:", error.response.status);
                console.error("Error details:", error.response.data);
            } else if (error.request) {
                console.error("No response received from server:", error.request);
            } else {
                console.error("Error during setup:", error.message);
            }
        }
    };


    useEffect(() => {
        const fetchUser = async () => {
            if (!session?.user?.email) return;

            try {
                console.log("Session Data:", session);
                const response = await axios.post('/api/user/getuser', { email: session.user.email });
                const userData = response.data.user;

                setUser(userData);
            } catch (error) {
                console.error("Error fetching user data:", error);
                setMessage('Failed to fetch user data.');
            }
        };

        fetchUser();
    }, [session]);


    return (
        <>
            <div className=" flex justify-center items-center flex-col m-10 ">
                <div className=" border-2 border-gray-200 text-center  w-auto rounded-2xl   flex justify-center items-center flex-col p-4 gap-4">

                    <div>
                        <h1>Hello</h1>
                        <h1>{session?.user?.email}</h1>
                    </div>

                    <div className="text-left">
                        <h1>Profile image</h1>
                        <img src={user?.profileimage} className="h-20" alt="" />
                        <input type="file" name="file" id="file" onChange={(e) => { uploadfile(e, "profile"), "profile" }} className="border rounded-lg p-1" />
                    </div>
                    <div className="text-left">
                        <h1>Cover image</h1>
                        <img src={user?.coverimage} className="h-20" alt="" />
                        <input type="file" name="file" id="file" onChange={(e) => { uploadfile(e, "cover"), "cover" }} className="border rounded-lg p-1" />
                    </div>
                    <button onClick={() => router.push("/profile")} className="bg-black p-2 rounded-2xl text-white mt-2  cursor-pointer w-full">Back</button>
                </div>
            </div>
        </>
    )

}

export default Page
