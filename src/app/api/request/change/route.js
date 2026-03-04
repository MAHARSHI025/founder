import { NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbconfig";
import Request from "@/models/requestmodel";
import User from "@/models/usermodel";
import Contact from "@/models/contactmodel";

await connect();

export async function POST(req) {
    try {
        const body = await req.json();
        const { id, action, receiver_id } = body;

        if (!id || !action) {
            return NextResponse.json(
                { message: 'All fields are required.' },
                { status: 400 }
            );
        }

        if (action !== 'accept' && action !== 'reject') {
            return NextResponse.json(
                { message: 'Invalid action.' },
                { status: 400 }
            );
        }

        const request = await Request.findById(id);

        if (!request) {
            return NextResponse.json(
                { message: 'Request not found.' },
                { status: 404 }
            );
        }

        if (receiver_id && request.receiver_id.toString() !== receiver_id.toString()) {
            return NextResponse.json(
                { message: 'Unauthorized request action.' },
                { status: 403 }
            );
        }

        if (action === 'reject') {
            await Request.findByIdAndDelete(id);
            return NextResponse.json({ message: 'Request rejected successfully' }, { status: 200 });
        }

        const sender = await User.findById(request.sender_id);
        const receiver = await User.findById(request.receiver_id);

        if (!sender || !receiver) {
            return NextResponse.json(
                { message: 'Sender or receiver not found.' },
                { status: 404 }
            );
        }

        const existingContact = await Contact.findOne({
            $or: [
                { sender_id: sender._id, receiver_id: receiver._id },
                { sender_id: receiver._id, receiver_id: sender._id }
            ]
        });

        if (!existingContact) {
            const newContact = new Contact({
                sender_id: sender._id,
                sender_email: sender.email,
                receiver_id: receiver._id,
                receiver_email: receiver.email
            });

            await newContact.save();
        }

        if (!Array.isArray(sender.contacts)) {
            sender.contacts = [];
        }
        const senderHasReceiver = sender.contacts.some(
            (contactId) => contactId.toString() === receiver._id.toString()
        );
        if (!senderHasReceiver) {
            sender.contacts.push(receiver._id);
        }

        if (!Array.isArray(receiver.contacts)) {
            receiver.contacts = [];
        }
        const receiverHasSender = receiver.contacts.some(
            (contactId) => contactId.toString() === sender._id.toString()
        );
        if (!receiverHasSender) {
            receiver.contacts.push(sender._id);
        }

        await sender.save();
        await receiver.save();
        await Request.findByIdAndDelete(id);

        return NextResponse.json({
            message: "Request accepted and contact created successfully",
            contact: {
                sender_id: sender._id,
                receiver_id: receiver._id
            }
        }, { status: 200 });

    } catch (error) {
        console.error("Update Contact Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
