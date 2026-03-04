import { NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/usermodel";
import Request from "@/models/requestmodel";
import Contact from "@/models/contactmodel";

await connect();

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

        if (sender_id === receiver_id) {
            return NextResponse.json(
                { message: "You cannot send a request to yourself." },
                { status: 400 }
            );
        }

        const sender = await User.findOne({ _id: sender_id });
        if (!sender) {
            return NextResponse.json({ message: "Sender not found" }, { status: 404 });
        }

        const receiver = await User.findOne({ _id: receiver_id });
        if (!receiver) {
            return NextResponse.json({ message: "Receiver not found" }, { status: 404 });
        }

        const alreadyConnected = await Contact.findOne({
            $or: [
                { sender_id: sender._id, receiver_id: receiver._id },
                { sender_id: receiver._id, receiver_id: sender._id }
            ]
        });

        if (alreadyConnected) {
            return NextResponse.json(
                { message: "You are already connected." },
                { status: 409 }
            );
        }

        const existingRequest = await Request.findOne({
            $or: [
                { sender_id: sender._id, receiver_id: receiver._id },
                { sender_id: receiver._id, receiver_id: sender._id }
            ]
        });

        if (existingRequest) {
            return NextResponse.json(
                { message: "A pending request already exists between these users." },
                { status: 409 }
            );
        }

        const newRequest = new Request({
            sender_id: sender._id,
            receiver_id: receiver._id,
            status: false
        });

        await newRequest.save();

        return NextResponse.json({
            message: "Request sent successfully",
            request: {
                _id: newRequest._id,
                sender_id: newRequest.sender_id,
                receiver_id: newRequest.receiver_id,
                status: newRequest.status
            }
        }, { status: 201 });

    } catch (error) {
        console.error("Update Contact Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
