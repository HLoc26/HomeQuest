export const handleRequest = (controller) => {
	return async (req, res) => {
		try {
			const payload = await controller(req);
			// console.log(payload);
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
