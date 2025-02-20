import { decode } from "../utils/decodeJwt.js";
import "dotenv/config";

export async function getUser(req, res) {
	const token = req.cookies.jwt;
	// console.log("token", token);

	try {
		const user = decode(token);

		console.log("HELLO", user);
		res.json({
			success: true,
			user: { userId: user.userId, usn: user.usn },
		});
	} catch (error) {
		res.json({
			success: false,
			message: "failed",
		});
	}
}
