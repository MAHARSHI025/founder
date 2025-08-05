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

        if (sender_id === receiver_id) {
            return NextResponse.json(
                { message: "Sender and receiver cannot be the same user." },
                { status: 400 }
            );
        }

        const sender = await User.findById(sender_id);
        if (!sender) {
            return NextResponse.json({ message: "Sender not found" }, { status: 404 });
        }

        const receiver = await User.findById(receiver_id);
        if (!receiver) {
            return NextResponse.json({ message: "Receiver not found" }, { status: 404 });
        }

        // Prevent duplicate contacts
        const existingContact = await Contact.findOne({
            sender_id: sender._id,
            receiver_id: receiver._id
        });
        if (existingContact) {
            return NextResponse.json(
                { message: "Contact already exists between these users." },
                { status: 409 }
            );
        }

        const newContact = new Contact({
            sender_id: sender._id,
            sender_email: sender.email,
            receiver_id: receiver._id,
            receiver_email: receiver.email
        });

        await newContact.save();

        // Update sender's contacts - add receiver to sender's contacts
        if (!Array.isArray(sender.contacts)) {
            sender.contacts = [];
        }
        // Check if receiver ID already exists in sender's contacts
        const senderHasReceiver = sender.contacts.some(contactId => 
            contactId.toString() === receiver._id.toString()
        );
        if (!senderHasReceiver) {
            sender.contacts.push(receiver._id);
        }
        await sender.save();

        // Update receiver's contacts - add sender to receiver's contacts
        if (!Array.isArray(receiver.contacts)) {
            receiver.contacts = [];
        }
        // Check if sender ID already exists in receiver's contacts
        const receiverHasSender = receiver.contacts.some(contactId => 
            contactId.toString() === sender._id.toString()
        );
        if (!receiverHasSender) {
            receiver.contacts.push(sender._id);
        }
        await receiver.save();

        return NextResponse.json({
            message: "Contact created successfully",
            contact: {
                _id: newContact._id,
                sender_id: newContact.sender_id,
                receiver_id: newContact.receiver_id
            }
        }, { status: 201 });

    } catch (error) {
        console.error("Add Contact Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}