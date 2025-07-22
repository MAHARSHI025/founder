import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/usermodel";
import Request from "@/models/requestmodel";

connect();

export async function POST(req) {
    try {
        const body = await req.json();
        const { sender_id, receiver_id } = body;

        if (!receiver_id || !sender_id) {
            return NextResponse.json(
                { message: 'All fields are required.' },
                { status: 400 }
            );
        }

        const senduser = await User.findOne({ _id: receiver_id });
        if (!senduser) {
            return NextResponse.json({ message: "Sender not found" }, { status: 400 });
        }
        const receiveuser = await User.findOne({ _id: receiver_id });
        if (!receiveuser) {
            return NextResponse.json({ message: "Sender not found" }, { status: 400 });
        }

        


        return NextResponse.json({
            message: "request fetch successfully",
        }, { status: 200 });

    } catch (error) {
        console.error("Update Contact Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
