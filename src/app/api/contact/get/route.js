import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/usermodel";

connect();

export async function POST(req) {
    try {
        const body = await req.json();
        const { email } = body;

        if (!email) {
            return NextResponse.json(
                { message: 'All fields are required.' },
                { status: 400 }
            );
        }

        const details = await User.findOne({ email: email });
        if (!details) {
            return NextResponse.json({ message: "user not found" }, { status: 400 });
        }


        return NextResponse.json({
            message: "user contacts fetch successfully",
            data: details.contacts
        }, { status: 200 });

    } catch (error) {
        console.error("Update Contact Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
