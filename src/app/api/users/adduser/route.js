import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/usermodel";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connect();
        const { name, email, image } = await req.json();
        console.log("Received data:", { name, email, image });

        if (!email) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        let user = await User.findOne({ email });
        if (user) {
            return NextResponse.json({ message: 'User already exists' }, { status: 400 });
        }

        const adduser = await User.create({
            username: name,
            email: email,
            password: "123456", // Note: You should hash passwords before saving in production!
            profileimage: image,
        });

        console.log("User created:", adduser);
        return NextResponse.json({ message: 'User created', user: adduser }, { status: 201 });

    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ message: 'Error in adduser', error: error.message }, { status: 500 });
    }
}
