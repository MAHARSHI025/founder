import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbconfig";
import Request from "@/models/requestmodel";

connect();

export async function POST(req) {
    try {
        const body = await req.json();
        const { id } = body;

        if (!id) {
            return NextResponse.json(
                { message: 'All fields are required.' },
                { status: 400 }
            );
        }

        const deleterequest = await Request.findByIdAndDelete(id)
        if (!deleterequest) {
             return NextResponse.json(
                { message: 'Error in delete request' },
                { status: 400 }
            );
        }



        return NextResponse.json({
            message: "request add successfully",
            deleterequest
        }, { status: 200 });

    } catch (error) {
        console.error("Update Contact Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
