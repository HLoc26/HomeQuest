import "dotenv/config";
import { handleRequest } from "../utils/handleRequest.js";
import { decode } from "../utils/decodeJwt.js";
import xpReqs from "../data/levelRequirements.js";
export const getUser = handleRequest(async (req) => {
	const token = req.cookies.jwt;
	// console.log("token", token);
	const user = decode(token);
	// console.log("HELLO", user);
	const ret = { userId: user.userId, usn: user.usn };
	return ret;
});

export const getXpReqs = handleRequest(async () => {
	// console.log(xpReqs);
	return xpReqs;
});
