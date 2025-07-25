import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/usermodel";
import bcryptjs from "bcryptjs";

connect();

export async function POST(req) {
    try {
        const allUser = await User.find();
        if (!allUser) {
            return NextResponse.json({ error: "Error in User found" }, { status: 400 });
        }


        return NextResponse.json({
            message: "Users fetched successfully",
            allUser
        }, { status: 200 });
        
    } catch (error) {
        console.error("Signup Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
