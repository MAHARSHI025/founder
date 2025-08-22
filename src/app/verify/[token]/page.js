"use client"
import axios from "axios"
import { useRouter } from "next/navigation"
import { use } from "react"
import toast from "react-hot-toast"

export default function VerifyPage({ params }) {
    const router = useRouter()
    const { token } = use(params);

    const verifyFunction = async () => {
        try {
            const res = await axios.get(`/api/auth/verify/${token}`)
            if (res.status === 200) {
                toast.success(res.data.message)
                router.push("/login")
            }
        } catch (err) {
            console.error(err)
            toast.error("Verification failed.")
        }
    }

    return (
        <div className="text-center flex justify-center items-center flex-col h-screen w-screen">
            <h1 className="text-3xl">Please verify your email</h1>
            <button
                className="cursor-pointer bg-black text-white p-3 rounded-full px-6 mt-4"
                onClick={verifyFunction}
            >
                Verify your mail
            </button>
        </div>
    )
}
