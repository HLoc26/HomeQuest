import jwt from "jsonwebtoken";
import "dotenv/config";

export async function getUser(req, res) {
	const token = req.cookies.jwt;
	// console.log("token", token);

	const user = jwt.decode(token, process.env.JWT_SECRET);

	console.log("HELLO", user);
	res.json({
		success: true,
		user: { userId: user.userId, usn: user.usn },
	});
}
