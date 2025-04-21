"use client";

import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function Loginform() {
  const { data: session, status } = useSession();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      email: formData.email,
      password: formData.password,
    });

    if (res.error) {
      setError("Invalid email or password");
    } else {
      // Successful login
      router.refresh(); // or router.push("/dashboard") if you want
    }

    setLoading(false);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="signup-input flex flex-col space-y-4 max-w-fit gap-0 mx-auto border p-6 rounded-lg my-2"
      >
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border p-2 rounded-lg"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
          required
        />

        <input
          type="password"
          name="password"
          maxLength="15"
          placeholder="Password"
          className="border p-2 rounded-lg"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required
        />

        <button
          type="submit"
          className="bg-black text-xs text-white p-2 rounded-2xl cursor-pointer mt-2 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Continue"}
        </button>

        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>
    </div>
  );
}

export default Loginform;
