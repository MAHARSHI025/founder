import { NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/usermodel";
import Request from "@/models/requestmodel";

await connect();

export async function POST(req) {
    try {
        const body = await req.json();
        const { receiver_id } = body;

        if (!receiver_id) {
            return NextResponse.json(
                { message: 'All fields are required.' },
                { status: 400 }
            );
        }

        const user = await User.findOne({ _id: receiver_id });
        if (!user) {
            return NextResponse.json({ message: "Receiver not found" }, { status: 404 });
        }

        const requests = await Request.find({ receiver_id }).sort({ createdAt: -1 }).lean();

        const senderIds = requests.map((reqItem) => reqItem.sender_id).filter(Boolean);
        const senders = await User.find({ _id: { $in: senderIds } })
            .select('organization_name email city profileimage isverified')
            .lean();

        const senderMap = new Map(senders.map((sender) => [sender._id.toString(), sender]));

        const formattedRequests = requests.map((reqItem) => ({
            _id: reqItem._id,
            sender_id: reqItem.sender_id,
            receiver_id: reqItem.receiver_id,
            status: reqItem.status,
            createdAt: reqItem.createdAt,
            sender: senderMap.get(reqItem.sender_id?.toString()) || null
        }));


        return NextResponse.json({
            message: "request fetch successfully",
            requests: formattedRequests
        }, { status: 200 });

    } catch (error) {
        console.error("Update Contact Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
