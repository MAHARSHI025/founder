import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/usermodel";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function GET(req) {
    try {

        const searchParams = req.nextUrl.searchParams;
        const page = Number(searchParams.get("page")) || 1;
        const limit = 10;
        const skip = (page - 1) * limit;

        const user = await User.find({ isverified: false }).skip(skip).limit(limit);

        console.log(user);

        return NextResponse.json({
            user,
            message: "get user successfully",
            success: true
        })

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error: error.message,
            Status: "400"
        })
    }
}
