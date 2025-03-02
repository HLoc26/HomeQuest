import "dotenv/config";
import { handleRequest } from "../utils/handleRequest.js";
import { decode } from "../utils/decodeJwt.js";
import UserService from "../services/user.service.js";
export const getMe = handleRequest(async (req) => {
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

export const getUser = handleRequest(async (req) => {
	const targetId = req.query.id;
	const user = await UserService.getUser(targetId);

	const ret = {
		userId: user.id,
		usn: user.usn,
	};
	return ret;
});
