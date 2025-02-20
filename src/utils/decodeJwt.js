import jwt from "jsonwebtoken";
import "dotenv/config";
export function decode() {
	const data = jwt.decode(token, process.env.JWT_SECRET);
	return data;
}
