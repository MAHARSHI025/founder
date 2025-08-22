import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/usermodel";
import jwt from "jsonwebtoken";

export async function GET(req, { params }) {
    try {
        await connect();
        const { token } = await params;

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findOne({ email: decoded.email });
        if (!user) {
            return new Response(JSON.stringify({ msg: "Invalid token" }), { status: 400 });
        }

        if (user.isverified) {
            return new Response(JSON.stringify({ msg: "User already verified" }));
        }

        user.isverified = true;
        await user.save();

        return new Response(JSON.stringify({ message: "Email verified sucessfully" }), { status: 200 });

    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ message: "Invalid or expired token" }), { status: 400 });
    }
}
