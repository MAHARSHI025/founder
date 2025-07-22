import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/usermodel";
import Request from "@/models/requestmodel";

connect();

export async function POST(req) {
    try {
        const body = await req.json();
        const { sender_id, receiver_id } = body;

        if (!sender_id || !receiver_id) {
            return NextResponse.json(
                { message: 'All fields are required.' },
                { status: 400 }
            );
        }

        const sender = await User.findOne({ _id: sender_id });
        if (!sender) {
            return NextResponse.json({ message: "Sender not found" }, { status: 400 });
        }

        const receiver = await User.findOne({ _id: receiver_id });
        if (!receiver) {
            return NextResponse.json({ message: "Receiver not found" }, { status: 400 });
        }

        const newRequest = new Request({
            sender_id: sender._id,
            receiver_id: receiver._id,
            status: false
        });

        await newRequest.save();

        return NextResponse.json({
            message: "request add successfully",
            newRequest
        }, { status: 200 });

    } catch (error) {
        console.error("Update Contact Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
