import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/usermodel";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connect();
        const { email } = await req.json();
        console.log("Received request", email);

        if (!email) {
            return NextResponse.json({ message: 'Email are required' }, { status: 400 });
        }

        let user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: 'User does not exist' }, { status: 404 });
        }



        return NextResponse.json({ message: 'User found successfully', user }, { status: 200 });

    } catch (error) {
        console.error('Error updating password:', error);
        return NextResponse.json({ message: 'Error updating password', error: error.message }, { status: 500 });
    }
}
