import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/usermodel";
import bcryptjs from "bcryptjs";

 await connect();

export async function POST(req) {
    try {
        const body = await req.json();
        const { email } = body;
        console.log("Received email:", { email });

        if (!email) {
            return NextResponse.json(
                { message: 'Can not get email.' },
                { status: 400 }
            );
        }

        const existingUser = await User.findOne({ email: email });
        if (!existingUser) {
            return NextResponse.json({ error: "User not found" }, { status: 400 });
        }

        // const salt = await bcryptjs.genSalt(10);
        // const hashedPassword = await bcryptjs.hash(password, salt);



        return NextResponse.json({
            message: "User found successfully",
            user: existingUser
        }, { status: 200 });
        
    } catch (error) {
        console.error("Signup Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
