import { AuthService } from "../../services/index.js";
import { handleRequest } from "../../utils/handleRequest.js";
export const postRegister = handleRequest(async (req) => {
	const { usn, pwd } = req.body;
	return await AuthService.register({ usn, pwd });
});
