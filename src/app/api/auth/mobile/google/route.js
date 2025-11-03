import { NextResponse } from "next/server";
import { OAuth2Client } from "google-auth-library";
import User from "@/models/usermodel";
import { connect } from "@/dbconfig/dbconfig";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const { id_token } = await req.json();
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

    const ticket = await client.verifyIdToken({
      idToken: id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    await connect();

    let user = await User.findOne({ email: payload.email });
    if (!user) {
      user = await User.create({
        email: payload.email,
        organization_name: payload.name || "Mobile Google User",
        profileimage: payload.picture,
        isverified: true,
        provider: "google",
      });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.NEXTAUTH_SECRET,
      { expiresIn: "7d" }
    );

    return NextResponse.json({ token });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
