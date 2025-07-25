import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbconfig";

import Contact from "@/models/contactmodel";
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

        const details = await Contact.find({ receiver_email: email }).populate("sender_id","-password -post -contacts", User);
        if (!details) {
            return NextResponse.json({ message: "user not found" }, { status: 400 });
        }


        return NextResponse.json({
            message: "user contacts fetch successfully",
            details
        }, { status: 200 });

    } catch (error) {
        console.error("Update Contact Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}  


