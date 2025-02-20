export const handleRequest = (controller) => {
	return async (req, res) => {
		try {
			const { payload, cookie } = await controller(req);
			res.json({
				success: true,
				payload,
			});
		} catch (error) {
			res.json({
				success: false,
				message: error.message,
			});
		}
	};
};
