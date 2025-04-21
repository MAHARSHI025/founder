import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/usermodel";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connect();
        const { email, password } = await req.json();
        console.log("Received request", email);

        if (!email || !password) {
            return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
        }

        let user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: 'User does not exist' }, { status: 404 });
        }

        if (password != user.password) {
            return NextResponse.json({ message: 'Incorrect password' }, { status: 401 });
        }

        

        return NextResponse.json({ message: 'User login successfully' }, { status: 200 });

    } catch (error) {
        console.error('Error updating password:', error);
        return NextResponse.json({ message: 'Error updating password', error: error.message }, { status: 500 });
    }
}
