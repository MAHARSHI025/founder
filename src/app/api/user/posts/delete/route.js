import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/usermodel";
import bcryptjs from "bcryptjs";
import Post from "@/models/postmodel";

connect();

export async function POST(req) {
    try {
        const body = await req.json();
        const { id } = body;
        console.log("Post data from frontend", { id });

        if (!id) {
            return NextResponse.json(
                { message: 'Post id is required.' },
                { status: 400 }
            );
        }

        const existingPost = await Post.findByIdAndDelete(id);
        if (!existingPost) {
            return NextResponse.json({ error: "Post not found" }, { status: 400 });
        }


        return NextResponse.json({
            message: "Delete post successfully",
            existingPost,
        }, { status: 200 });

    } catch (error) {
        console.error("Post get:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
