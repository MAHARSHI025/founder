import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbconfig";
import Post from "@/models/postmodel";
import cloudinary from "@/lib/cloudinary";

await connect();

export async function POST(req) {
    try {
        const body = await req.json();
        const { id } = body;
        console.log(id);


        if (!id) {
            return NextResponse.json(
                { message: "Post id is required." },
                { status: 400 }
            );
        }

        const existingPost = await Post.findById(id);

        if (!existingPost) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }
        


        const result = await cloudinary.uploader.destroy(existingPost.imageid);

        if (result.result !== "ok") {
            return NextResponse.json(
                { error: "Failed to delete image from Cloudinary" },
                { status: 500 }
            );
        }

        await Post.findByIdAndDelete(id);

        return NextResponse.json(
            {
                message: "Post and image deleted successfully",
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Delete Post Error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
