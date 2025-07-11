'use client';

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

function Uploadpost({ setaction }) {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [link, setlink] = useState("");
    const [description, setdescription] = useState("");
    const [fileUploading, setFileUploading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/profile");
        }
    }, [status, router]);

    if (status === "loading") return <p>Loading...</p>;

    const handleFileChange = async (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            setError("No files selected.");
            return;
        }

        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("image", file);

        try {
            setFileUploading(true);
            const response = await axios.post("/api/upload", formData);

            setlink(response.data.url);
            setError("");
        } catch (error) {
            console.error("Upload failed:", error);
            setError("File upload failed. Try again.");
        } finally {
            setFileUploading(false);
        }
    };

    const handleSubmit = async () => {
        if (!link) {
            setError("Please upload an image first.");
            return;
        }

        if (!description.trim()) {
            setError("Please enter a description.");
            return;
        }

        try {
            const setpost = await axios.post("/api/user/posts/add", {
                email: session?.user.email,
                img_url: link,
                description,
            });

            console.log("Post created:", setpost.data);
            setError("");
            setaction("posts"); // Go back after successful post
        } catch (error) {
            console.error("Error creating post:", error);
            setError("Failed to create post.");
        }
    };

    return (
        <div className="flex justify-center items-center flex-col m-4">
            <div className="border-2 border-gray-200 text-center rounded-2xl max-w-sm mx-auto flex justify-center items-center flex-col p-4 gap-4">
                <div>
                    <h1>Hello</h1>
                    <h1>{session?.user?.email}</h1>
                </div>

                <div className="text-left w-full">
                    <h1>Post image</h1>
                    <textarea
                        className="text-xl border rounded-lg p-1 w-full"
                        rows={5}
                        maxLength={80}
                        onChange={(e) => setdescription(e.target.value)}
                        placeholder="Enter post description"
                    />
                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="border rounded-lg p-1 w-full mt-2"
                    />
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}
                {fileUploading && <p className="text-blue-500 text-sm">Uploading image...</p>}
                {link && <img src={link} alt="Uploaded preview" className="w-32 h-32 object-cover rounded-lg" />}

                <button
                    onClick={handleSubmit}
                    className="bg-black p-2 rounded-2xl text-white mt-2 border cursor-pointer w-full"
                >
                    Submit
                </button>
                <button
                    onClick={() => setaction("posts")}
                    className="bg-white p-2 rounded-2xl text-black border  cursor-pointer w-full"
                >
                    Back
                </button>
            </div>
        </div>
    );
}

export default Uploadpost;
