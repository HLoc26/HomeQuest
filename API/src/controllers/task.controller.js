import AttachmentService from "../services/attachment.service.js";
import TaskService from "../services/task.service.js";
import { decode } from "../utils/decodeJwt.js";
import { handleRequest } from "../utils/handleRequest.js";
const TaskController = {
	getAll: handleRequest(async () => {
		return await TaskService.getAll();
	}),
	getAssigned: handleRequest(async (req) => {
		const user = decode(req.cookies.jwt);
		if (!user) {
			throw new Error("user not found");
		}
		return await TaskService.getAssigned(user.userId);
	}),
	getCreated: handleRequest(async (req) => {
		const user = decode(req.cookies.jwt);
		return await TaskService.getCreated(user.userId);
	}),
	getCompleted: handleRequest(async (req) => {
		const token = req.cookies.jwt;
		const user = decode(token);

		try {
			const tasks = await TaskService.getCompleted(user.userId);
			return tasks;
		} catch (error) {
			throw error;
		}
	}),

	getAttachments: handleRequest(async (req) => {
		const taskId = req.query.taskId;
		try {
			const attachments = await AttachmentService.getAttachments(taskId);
			if (!attachments.length) {
				throw new Error("No attachment found");
			}

			// Tạo danh sách URL để React hiển thị ảnh
			const baseUrl = `${req.protocol}://${req.get("host")}`;
			const imageUrls = attachments.map((att) => ({
				id: att.attachment_id,
				url: `${baseUrl}/${att.attachment_path}`,
			}));
			return imageUrls;
		} catch (error) {
			throw error;
		}
	}),

	assignTask: handleRequest(async (req) => {
		try {
			const { userId, taskId } = req.body;
			const [res] = await TaskService.assignTask(userId, taskId);
			return res;
		} catch (error) {
			console.error(error);
		}
	}),
	createTask: handleRequest(async (req) => {
		const taskData = req.body;
		const token = req.cookies.jwt;
		const creator = decode(token);
		try {
			return await TaskService.createTask(creator, taskData);
		} catch (error) {
			console.error(error);
		}
	}),
	completeTask: handleRequest(async (req) => {
		const { task } = req.body;
		const token = req.cookies.jwt;
		const user = decode(token);
		const userId = user.userId;

		try {
			return await TaskService.completeTask(userId, task.id);
		} catch (error) {
			console.error(error);
			throw new Error(error.message);
		}
	}),
	submitProof: handleRequest(async (req) => {
		try {
			const { taskId } = req.body;
			const files = req.files;
			return await AttachmentService.saveProof(taskId, files);
		} catch (error) {
			throw error;
		}
	}),
	confirmCompleteTask: handleRequest(async (req) => {
		try {
			const { taskId } = req.body;
			const [taskConfirmed] = await TaskService.confirmCompleteTask(taskId);
			return taskConfirmed;
		} catch (error) {
			throw error;
		}
	}),
};

export default TaskController;
