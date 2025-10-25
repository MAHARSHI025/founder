import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/usermodel";

await connect();

export async function POST(req) {
    try {
        const body = await req.json();
        const { email } = body;

        if (!email) {
            return NextResponse.json(
                { message: 'Email is required.' },
                { status: 400 }
            );
        }

        // Find user and populate contacts with user details
        const user = await User.findOne({ email }).populate({
            path: 'contacts',
            select: 'organization_name email profileimage coverimage city description bio about isverified likecount createdAt',
            model: User
        });

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        return NextResponse.json({
            message: "User contacts fetched successfully",
            user: {
                _id: user._id,
                organization_name: user.organization_name,
                email: user.email,
                contacts: user.contacts || []
            }
        }, { status: 200 });

    } catch (error) {
        console.error("Get Contact Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}  


