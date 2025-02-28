import "dotenv/config";
import { handleRequest } from "../utils/handleRequest.js";
import { decode } from "../utils/decodeJwt.js";
export const getUser = handleRequest(async (req) => {
	const token = req.cookies.jwt;
	// console.log("token", token);
	const user = decode(token);
	// console.log("HELLO", user);
	const ret = {
		userId: user.userId,
		usn: user.usn,
		level: user.level,
		xp: user.xp,
		gold: user.gold,
		goldMultiplier: user.goldMultiplier,
	};
	return ret;
});
