import TaskService from "../services/task.service.js";
import { decode } from "../utils/decodeJwt.js";
const TaskController = {
	getAll: async (req, res) => {
		try {
			const tasks = await TaskService.getAll(); // Should have {where: {status: "PENDING"}}
			res.json({
				success: true,
				tasks,
			});
		} catch (error) {
			res.json({
				success: false,
				message: error.message,
			});
		}
	},
	getAssigned: async (req, res) => {
		try {
			const user = decode(req.cookies.jwt);

			const tasks = await TaskService.getAssigned(user.userId); // Should have {where: {status: "PENDING"}}
			res.json({
				success: true,
				tasks,
			});
		} catch (error) {
			res.json({
				success: false,
				message: error.message,
			});
		}
	},
};

export default TaskController;
