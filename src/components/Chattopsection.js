"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { IconArrowLeft, IconPointFilled } from "@tabler/icons-react";

function Chattopsection({ email }) {
    const router = useRouter();
    const initial = email ? email.charAt(0).toUpperCase() : "?";

    return (
        <div className="sticky top-0 z-10 w-full bg-white/95 backdrop-blur border-b border-neutral-200 px-3 sm:px-4 py-3">
            <div className="flex items-center gap-3">
                <button
                    className="h-9 w-9 rounded-lg border border-neutral-200 flex items-center justify-center cursor-pointer hover:bg-neutral-50 transition-colors"
                    onClick={() => router.push("/contact")}
                    aria-label="Back to contacts"
                >
                    <IconArrowLeft size={18} />
                </button>

                <div className="h-9 w-9 rounded-full bg-neutral-100 text-neutral-700 flex items-center justify-center text-sm font-semibold shrink-0">
                    {initial}
                </div>

                <div className="min-w-0 flex-1">
                    <h1 className="text-sm sm:text-base font-semibold text-neutral-900 truncate">
                        {email || "Unknown contact"}
                    </h1>
                    <p className="text-xs text-neutral-400 flex items-center gap-1">
                        <IconPointFilled size={10} className="text-green-500" /> Active chat
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Chattopsection;
