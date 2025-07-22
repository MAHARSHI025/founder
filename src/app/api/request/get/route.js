import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/usermodel";
import Request from "@/models/requestmodel";

connect();

export async function POST(req) {
    try {
        const body = await req.json();
        const { receiver_id } = body;
        console.log(receiver_id);
        

        if (!receiver_id) {
            return NextResponse.json(
                { message: 'All fields are required.' },
                { status: 400 }
            );
        }

        const user = await User.findOne({ _id: receiver_id });
        if (!user) {
            return NextResponse.json({ message: "Sender not found" }, { status: 400 });
        }

        const requests = await Request.find({ receiver_id: receiver_id })


        return NextResponse.json({
            message: "request fetch successfully",
            requests
        }, { status: 200 });

    } catch (error) {
        console.error("Update Contact Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
