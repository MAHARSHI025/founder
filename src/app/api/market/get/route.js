import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/usermodel";
import Post from "@/models/postmodel";
import mongoose from "mongoose";

connect();

export async function POST(req) {
  try {
    const body = await req.json();
    const limit = parseInt(body.limit) || 4;

    const excludeIds = (body.excludeIds || []).map(id => new mongoose.Types.ObjectId(id));

    const allUserRandom = await User.aggregate([
      { $match: { _id: { $nin: excludeIds } } },
      { $sample: { size: limit } }
    ]);

    const allUser = await User.populate(allUserRandom, { path: 'posts' });

    return NextResponse.json({ allUser }, { status: 200 });
  } catch (err) {
    console.error("Fetch Users Error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}