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

		const data = {
			title: taskData.title,
			description: taskData.description,
			type: taskData.type,
			difficulty: taskData.difficulty,
			assigned_to: null,
			xp_reward: taskData.xpReward,
			gold_reward: taskData.goldReward,
			created_by: creator.userId,
			proof_required: taskData.proofRequired,
		};

		try {
			const newTask = await TaskService.createTask(data);
			return newTask;
		} catch (error) {
			console.error(error);
		}
	}),
	completeTask: handleRequest(async (req) => {
		const { task } = req.body;
		const token = req.cookies.jwt;
		const user = decode(token);

		const id = user.userId;

		const assignedTasks = await TaskService.getAssigned(id);

		const taskExists = assignedTasks.some((assignedTask) => assignedTask.id === task.id);

		if (!taskExists) {
			throw new Error("Task not found");
		}

		try {
			return await TaskService.completeTask(task.id);
		} catch (error) {
			console.error(error);
			throw new Error(error.message);
		}
	}),
	submitProof: handleRequest(async (req) => {
		try {
			const { taskId } = req.body;
			const files = req.files;
			const attachments = files.map((file) => ({
				attachment_path: file.path,
				task_id: taskId,
			}));

			return await AttachmentService.saveProof(attachments);
		} catch (error) {
			throw error;
		}
	}),
	confirmTask: handleRequest(async (req) => {
		try {
			const { taskId } = req.body;

			const proofStatusUpdated = await TaskService.approveProofStatus(taskId);
			const taskConfirmed = await TaskService.confirmTask(taskId);
			return { proofStatusUpdated, taskConfirmed };
		} catch (error) {
			throw error;
		}
	}),
};

export default TaskController;
