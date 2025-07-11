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

  // ✅ Always call this
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/profile");
    }
  }, [status, router]);

  // ✅ Always call this
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

  const uploadfile = async (e, type) => {
    if (!e.target.files || e.target.files.length === 0) {
      return console.error("No files selected.");
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

  // ✅ Move conditional return to here, AFTER all hooks
  const isLoading = status === "loading";

  return (
    <div className="flex justify-center items-center flex-col m-10">
      <div className="border-2 border-gray-200 text-center w-auto rounded-2xl flex justify-center items-center flex-col p-4 gap-4">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div>
              <h1>Hello</h1>
              <h1>{session?.user?.email}</h1>
            </div>

            <div className="text-left">
              <h1>Profile image</h1>
              <img src={user?.profileimage} className="h-20" alt="Profile" />
              <input
                type="file"
                onChange={(e) => uploadfile(e, "profile")}
                className="border rounded-lg p-1"
              />
            </div>

            <div className="text-left">
              <h1>Cover image</h1>
              <img src={user?.coverimage} className="h-20" alt="Cover" />
              <input
                type="file"
                onChange={(e) => uploadfile(e, "cover")}
                className="border rounded-lg p-1"
              />
            </div>

            <button
              onClick={() => router.push("/profile")}
              className="bg-black p-2 rounded-2xl text-white mt-2 cursor-pointer w-full"
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
