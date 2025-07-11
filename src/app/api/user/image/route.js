import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/usermodel";
import bcryptjs from "bcryptjs";

connect();

export async function POST(req) {
    try {
        const body = await req.json();
        const { link, email, type } = body;
        console.log("Request Body:", body);

        if (!email || !link) {
            return NextResponse.json(
                { message: 'All fields are required.' },
                { status: 400 }
            );
        }

        if (type === "profile") {
            const existingUser = await User.findOneAndUpdate({ email: email },
                { $set: { profileimage: link } },
                { new: true, runValidators: true }
            );
            if (!existingUser) {
                return NextResponse.json({ message: "User not found" }, { status: 400 });
            }
        }
        if (type === "cover") {
            const existingUser = await User.findOneAndUpdate({ email: email },
                { $set: { coverimage: link } },
                { new: true, runValidators: true }
            );
            if (!existingUser) {
                return NextResponse.json({ message: "User not found" }, { status: 400 });
            }
        }
            

        return NextResponse.json({
            message: "image update successful",
            

        }, { status: 200 });
    } catch (error) {
        console.error("Login Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
