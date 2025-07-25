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
  const [profileFile, setProfileFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/profile");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchUser = async () => {
      if (!session?.user?.email) return;

      try {
        const response = await axios.post('/api/user/getuser', { email: session.user.email });
        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [session?.user?.email]);

  const uploadFile = async (file, type) => {
    if (!file) return console.error("No file selected.");

    const formData = new FormData();
    formData.append("image", file);
    formData.append("email", session?.user.email);
    formData.append("type", type);

    try {
      const response = await axios.post("/api/upload", formData);
      const imageUrl = response.data.url;
      setlink(imageUrl);

      await axios.post("/api/user/image", {
        link: imageUrl,
        email: session?.user.email,
        type,
      });

      setUser((prev) => ({
        ...prev,
        [`${type}image`]: imageUrl,
      }));
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  const isLoading = status === "loading";

  return (
    <div className="flex justify-center items-center flex-col mt-4 ">
      <div className="flex flex-col mx-auto max-w-min border border-gray-300 p-6 py-10 rounded-lg  min-w-80 shadow-lg">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-center mb-3">Update image</h1>

            <div className="text-left mb-10">
              <h1>Profile image</h1>
              <img src={user?.profileimage} className="h-20 mb-2" alt="Profile" />
              <input
                type="file"
                onChange={(e) => setProfileFile(e.target.files[0])}
                className="border rounded-lg p-1 mb-2"
              />
              <button
                className="bg-black p-2 rounded-2xl text-white mt-2 cursor-pointer w-full"
                onClick={() => uploadFile(profileFile, "profile")}
              >
                Upload Profile Image
              </button>
            </div>

            <div className="text-left mb-8">
              <h1>Cover image</h1>
              <img src={user?.coverimage} className="h-20 mb-2" alt="Cover" />
              <input
                type="file"
                onChange={(e) => setCoverFile(e.target.files[0])}
                className="border rounded-lg p-1 mb-2"
              />
              <button

                className="bg-black p-2 rounded-2xl text-white mt-2 cursor-pointer w-full"
                onClick={() => uploadFile(coverFile, "cover")}
              >
                Upload Cover Image
              </button>
            </div>

            <button
              onClick={() => router.push("/profile")}
              className="bg-white text-black border-black border p-2 rounded-2xl  mt-2 cursor-pointer w-full"
            >
              Back
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Page;
