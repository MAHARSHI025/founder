import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/usermodel";
import bcryptjs from "bcryptjs";

connect();

export async function POST(req) {
    try {
        const body = await req.json();
        const { organization_name, email, password } = body;
        console.log("Received signup request with data:", { organization_name, email });

        if (!organization_name || !email || !password) {
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
        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            organization_name,
            email,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();
        console.log("New User added:", savedUser);

        return NextResponse.json({
            message: "Signup successful",
            user: {
                _id: savedUser._id,
                organization_name: savedUser.organization_name,
                email: savedUser.email,
            },
        }, { status: 200 });
    } catch (error) {
        console.error("Signup Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
