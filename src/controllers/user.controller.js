import { decode } from "../utils/decodeJwt.js";
import "dotenv/config";
import { handleRequest } from "../utils/handleRequest.js";

export const getUser = handleRequest(async (req) => {
	const token = req.cookies.jwt;
	// console.log("token", token);
	const user = decode(token);
	console.log("HELLO", user);
	const ret = { userId: user.userId, usn: user.usn };
	return ret;
});
