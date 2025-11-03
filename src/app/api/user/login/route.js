import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/usermodel";
import bcryptjs from "bcryptjs";

await connect();

export async function POST(req) {
    try {
        const body = await req.json();
        const { email, password } = body;

        if ( !email || !password) {
            return NextResponse.json(
                { message: 'All fields are required.' },
                { status: 400 }
            );
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
        }

        const existingUser = await User.findOne({ email: email });
        if (!existingUser) {
            return NextResponse.json({ message: "User not found" }, { status: 400 });
        }
        const isPasswordValid = await bcryptjs.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return NextResponse.json({ message: "Invalid password" }, { status: 400 });
        }
        if (existingUser.isverified === false){
             return NextResponse.json({ message: "Not verified" }, { status: 400 });
        }
        console.log("User logged in:", existingUser);
        console.log('mmmmmmmm',existingUser.isverified);
        

        return NextResponse.json({
            message: "Login successful",
            user: {
                _id: existingUser._id,
                organization_name: existingUser.organization_name,
                email: existingUser.email,  
            },
        }, { status: 200 });
    } catch (error) {
        console.error("Login Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
