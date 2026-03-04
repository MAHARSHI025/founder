import { NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/usermodel";
import Request from "@/models/requestmodel";

await connect();

export async function POST(req) {
  try {
    const body = await req.json();
    const { sender_id } = body;

    if (!sender_id) {
      return NextResponse.json(
        { message: "Sender id is required." },
        { status: 400 }
      );
    }

    const sender = await User.findById(sender_id);
    if (!sender) {
      return NextResponse.json({ message: "Sender not found." }, { status: 404 });
    }

    const requests = await Request.find({ sender_id })
      .select("receiver_id")
      .lean();

    const receiverIds = requests
      .map((item) => item.receiver_id?.toString())
      .filter(Boolean);

    return NextResponse.json(
      {
        message: "Outgoing requests fetched successfully",
        receiverIds,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Outgoing Request Fetch Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
