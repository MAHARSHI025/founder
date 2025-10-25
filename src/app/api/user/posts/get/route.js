import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/usermodel";
import bcryptjs from "bcryptjs";
import Post from "@/models/postmodel";

await connect();

export async function POST(req) {
    try {
        const body = await req.json();
        const { email } = body;
        console.log("Post data from frontend", { email });

        if (!email) {
            return NextResponse.json(
                { message: 'Email is required.' },
                { status: 400 }
            );
        }

        const existingUser = await User.findOne({ email: email });
        if (!existingUser) {
            return NextResponse.json({ error: "User not found" }, { status: 400 });
        }

        const findpost = await Post.find({ email: email })
        // console.log(findpost);

        if (!findpost || findpost === null) {
            return NextResponse.json(
                { message: 'No post found.' },
                { status: 400 }
            );
        }




        return NextResponse.json({
            message: "add post successful",
            findpost,
        }, { status: 200 });

    } catch (error) {
        console.error("Post get:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
