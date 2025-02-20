import jwt from "jsonwebtoken";
export const AuthMiddleware = {
	authenticate: (req, res, next) => {
		const token = req.cookies.jwt;
		if (!token) return res.status(401).json({ success: false, message: `Unauthorized` });

		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			req.user = decoded; // Thêm thông tin user vào req
			next();
		} catch (error) {
			res.status(401).json({ success: false, message: `Unauthorized` });
		}
	},
};
