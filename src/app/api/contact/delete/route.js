import { NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/usermodel";
import Contact from "@/models/contactmodel";

await connect();

export async function POST(req) {
	try {
		const body = await req.json();
		const { user_id, contact_id } = body;

		if (!user_id || !contact_id) {
			return NextResponse.json(
				{ message: "user_id and contact_id are required." },
				{ status: 400 }
			);
		}

		if (user_id === contact_id) {
			return NextResponse.json(
				{ message: "Invalid contact delete request." },
				{ status: 400 }
			);
		}

		const [user, contactUser] = await Promise.all([
			User.findById(user_id),
			User.findById(contact_id),
		]);

		if (!user || !contactUser) {
			return NextResponse.json(
				{ message: "User or contact not found." },
				{ status: 404 }
			);
		}

		await Promise.all([
			User.findByIdAndUpdate(user_id, { $pull: { contacts: contact_id } }),
			User.findByIdAndUpdate(contact_id, { $pull: { contacts: user_id } }),
			Contact.deleteMany({
				$or: [
					{ sender_id: user_id, receiver_id: contact_id },
					{ sender_id: contact_id, receiver_id: user_id },
				],
			}),
		]);

		return NextResponse.json(
			{ message: "Contact removed successfully" },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Delete Contact Error:", error);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}
