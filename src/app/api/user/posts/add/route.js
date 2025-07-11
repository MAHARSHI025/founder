import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/usermodel";
import bcryptjs from "bcryptjs";
import Post from "@/models/postmodel";

connect();

export async function POST(req) {
    try {
        const body = await req.json();
        const { email, img_url, description } = body;
        console.log("Post data from frontend", { email, img_url, description });

        if (!email || !img_url || !description) {
            return NextResponse.json(
                { message: 'All fields are required.' },
                { status: 400 }
            );
        }

        const existingUser = await User.findOne({ email: email });
        if (!existingUser) {
            return NextResponse.json({ error: "User not found" }, { status: 400 });
        }

        const newpost = await Post.create({
            email: email,
            postimage: img_url,
            description: description
        })
        if (!newpost) {
            console.log("error while create new post");
            return NextResponse.json({
                message: "Error for create new post",
            }, { status: 400 });
        }

        const updatedUser = await User.findOneAndUpdate(
            { email },
            { $addToSet: { post: newpost._id } },
            { new: true }
        );



        return NextResponse.json({
            message: "add post successful",
            updatedUser
        }, { status: 200 });
    } catch (error) {
        console.error("Signup Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
