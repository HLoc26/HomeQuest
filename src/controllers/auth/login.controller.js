import { AuthService } from "../../services/index.js";

export async function postLogin(req, res) {
	const { usn, pwd } = req.body;

	try {
		if (!usn || !pwd) {
			throw new Error("Missing username or password");
		}

		const { token, user } = await AuthService.login({ usn, pwd });

		res.cookie("jwt", token, {
			httpOnly: true, // Prevent accessing using js
			secure: true, // Only for https
			sameSite: "Strict", // Prevent CSRF
		});

		res.status(200).json({
			success: true,
			payload: user,
		});
	} catch (error) {
		res.json({
			success: false,
			message: error.message,
		});
	}
}
