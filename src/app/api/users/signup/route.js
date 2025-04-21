import { NextResponse } from "next/server";
import { IncomingForm } from "formidable";
import { Readable } from "stream";
import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/usermodel";
import bcryptjs from "bcryptjs";

connect();

export const config = {
    api: {
        bodyParser: false,
    },
};

export async function POST(req) {
    try {
        const form = new IncomingForm({ multiples: false, keepExtensions: true });

        const reqBody = await req.arrayBuffer();
        const stream = Readable.from(Buffer.from(reqBody));
        stream.headers = Object.fromEntries(req.headers.entries());

        const [fields, files] = await new Promise((resolve, reject) => {
            form.parse(stream, (err, fields, files) => {
                if (err) return reject(err);
                resolve([fields, files]);
            });
        });

        // Flatten fields but keep hoobies as an array
        const flatFields = Object.fromEntries(
            Object.entries(fields).map(([key, value]) => {
                if (key === 'hoobies[]') return ['hoobies', value]; // keep array
                return [key, Array.isArray(value) ? value[0] : value];
            })
        );

        const {
            username,
            email,
            password,
            confirmPassword,
            description,
            gender,
            typeofdate,
            age,
            city,
            addictions,
            hoobies,
        } = flatFields;

        if (!username || !email || !password || !description || !city || !age) {
            return NextResponse.json({ error: "Missing required fields", status: 400 });
        }

        if (password !== confirmPassword) {
            return NextResponse.json({ error: "Passwords do not match", status: 400 });
        }

        if (isNaN(age)) {
            return NextResponse.json({ error: "Age must be a number", status: 400 });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: "User already exists", status: 400 });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            description,
            gender,
            typeofdate,
            city,
            age: Number(age),
            addictions,
            hoobies,
        });

        const savedUser = await newUser.save();
        console.log("New User added:", savedUser);

        return NextResponse.json({
            message: "Signup successful",
            savedUser,
            status: 200
        });
    } catch (error) {
        console.error("Signup Error:", error);
        return NextResponse.json({ error: error.message, status: 500 });
    }
}
