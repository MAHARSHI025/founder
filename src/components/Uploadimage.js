'use client';

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

function Uploadimage({ setaction }) {

    const { data: session, status } = useSession();
    const router = useRouter();

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

        try {
            const response = await axios.post("http://localhost:8000/api/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log("File uploaded successfully:", response.data);
            setlink(response.data.url);

            const setimage = await axios.post("/api/user/image",
                {
                    link: link || response.data.url,
                    email: session?.user.email,
                    type: type
                }
            );
            // window.location.reload();

        } catch (error) {
            console.error("Error uploading file:", error);
        }
    }


    return (
        <>
            <div className=" flex justify-center items-center flex-col h-screen w-screen">
                <div className=" border-2 border-gray-200 text-center rounded-2xl max-w-sm mx-auto flex justify-center items-center flex-col p-4 gap-4">

                    <div>
                        <h1>Hello</h1>
                        <h1>{session?.user?.email}</h1>
                    </div>

                    <div className="text-left">
                        <h1>Profile image</h1>
                        <input type="file" name="file" id="file" onChange={(e) => { uploadfile(e, "profile"), "profile" }} className="border rounded-lg p-1" />
                    </div>
                    <div className="text-left">
                        <h1>Cover image</h1>
                        <input type="file" name="file" id="file" onChange={(e) => { uploadfile(e, "cover"), "cover" }} className="border rounded-lg p-1" />
                    </div>
                    <button onClick={() => setaction("profile")} className="bg-black p-2 rounded-2xl text-white mt-2  cursor-pointer w-full">Back</button>
                </div>
            </div>
        </>
    )
}

export default Uploadimage
