import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/usermodel";
import Contact from "@/models/contactmodel";

connect();

export async function POST(req) {
    try {
        const body = await req.json();
        const { sender_id, receiver_id } = body;

        console.log(sender_id, receiver_id);


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

        const newContact = new Contact({
            sender_id: sender._id,
            sender_email: sender.email,
            receiver_id: receiver._id,
            receiver_email: receiver.email
        });

        await newContact.save();

        if (!Array.isArray(sender.contacts)) {
            sender.contacts = [];
        }
        sender.contacts.push(newContact._id);

        if (!Array.isArray(receiver.contacts)) {
            receiver.contacts = [];
        }
        receiver.contacts.push(newContact._id);


        return NextResponse.json({
            message: "Contact updated successfully",
            contact: newContact
        }, { status: 200 });

    } catch (error) {
        console.error("Update Contact Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
