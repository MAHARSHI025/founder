import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/usermodel";
import bcryptjs from "bcryptjs";

await connect();

export async function POST(req) {
    try {
        const body = await req.json();
        const { organization_name, sessionemail, description, city, bio, about, website, instagram, linkedin, badges } = body;
        console.log("Received update request with data:", { organization_name, sessionemail });

        const existingUser = await User.findOne({ email: sessionemail });
        if (!existingUser) {
            return NextResponse.json({ error: "User not found" }, { status: 400 });
        }

        if (organization_name !== existingUser.organization_name) {
            const alreadytakenname = await User.findOne({ organization_name: organization_name });
            if (alreadytakenname) {
                return NextResponse.json({ error: "Organization name is already taken" }, { status: 400 });
            }

        }



        const updatedUser = await User.findOneAndUpdate(
            { email: sessionemail },
            {
                $set: {
                    organization_name,
                    description: description || existingUser.description,
                    city: city || existingUser.city,
                    bio: bio || existingUser.bio,
                    about: about || existingUser.about,
                    website: website || existingUser.website,
                    instagram: instagram || existingUser.instagram,
                    linkedin: linkedin || existingUser.linkedin,
                    badges: badges || existingUser.badges
                }
            },
            { new: true }
        );
        if (!updatedUser) {
            return NextResponse.json({ error: "Failed to update user" }, { status: 400 });
        }

        return NextResponse.json({
            message: "Update user successful",
            User: updatedUser
        }, { status: 200 });


    } catch (error) {
        console.error("update profile Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
