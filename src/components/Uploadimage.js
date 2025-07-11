'use client';

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

function Uploadimage({ setaction }) {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [link, setlink] = useState("");

    // Redirect to /profile if user is unauthenticated
    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/profile");
        }
    }, [status, router]);

    // Show loading while session is being fetched
    if (status === "loading") {
        return <p>Loading...</p>;
    }

    const uploadfile = async (e, type) => {
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

            const uploadedUrl = response.data.url;
            setlink(uploadedUrl);

            await axios.post("/api/user/image", {
                link: uploadedUrl,
                email: session?.user?.email,
                type: type,
            });

            console.log("Image uploaded and saved:", uploadedUrl);
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    return (
        <div className="flex justify-center items-center flex-col h-screen w-screen">
            <div className="border-2 border-gray-200 text-center rounded-2xl max-w-sm mx-auto flex justify-center items-center flex-col p-4 gap-4">
                <div>
                    <h1 className="text-lg font-semibold">Welcome</h1>
                    <h1 className="text-sm text-gray-600">{session?.user?.email}</h1>
                </div>

                <div className="text-left w-full">
                    <h1 className="font-medium mb-1">Profile Image</h1>
                    <input
                        type="file"
                        onChange={(e) => uploadfile(e, "profile")}
                        className="border rounded-lg p-1 w-full"
                    />
                </div>

                <div className="text-left w-full">
                    <h1 className="font-medium mb-1">Cover Image</h1>
                    <input
                        type="file"
                        onChange={(e) => uploadfile(e, "cover")}
                        className="border rounded-lg p-1 w-full"
                    />
                </div>

                <button
                    onClick={() => setaction("profile")}
                    className="bg-black p-2 rounded-2xl text-white mt-2 cursor-pointer w-full"
                >
                    Back
                </button>
            </div>
        </div>
    );
}

export default Uploadimage;
