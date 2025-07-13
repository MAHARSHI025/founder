import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/usermodel";

connect();

export async function POST(req) {
    try {
        const body = await req.json();
        const { sender_email, receiver_email } = body;

        if (!sender_email || !receiver_email) {
            return NextResponse.json(
                { message: 'All fields are required.' },
                { status: 400 }
            );
        }

        const sender = await User.findOne({ email: sender_email });
        if (!sender) {
            return NextResponse.json({ message: "Sender not found" }, { status: 400 });
        }

        const receiver = await User.findOne({ email: receiver_email });
        if (!receiver) {
            return NextResponse.json({ message: "Receiver not found" }, { status: 400 });
        }

        // ✅ Update contacts if not already added
        const updates = [];

        if (!sender.contacts.includes(receiver.email)) {
            sender.contacts.push(receiver.email);
            updates.push(sender.save());
        }

        if (!receiver.contacts.includes(sender.email)) {
            receiver.contacts.push(sender.email);
            updates.push(receiver.save());
        }

        await Promise.all(updates);

        return NextResponse.json({
            message: "Contact updated successfully",
            sender: {
                _id: sender._id,
                email: sender.email,
                contact: sender.contact,
            },
            receiver: {
                _id: receiver._id,
                email: receiver.email,
                contact: receiver.contact,
            }
        }, { status: 200 });

    } catch (error) {
        console.error("Update Contact Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
