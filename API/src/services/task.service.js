import { Attachment, Task } from "../models/index.js";

class TaskService {
	static getAll() {
		return Task.findAll({ where: { status: "UNASSIGNED" } });
	}

	static getAssigned(id) {
		return Task.findAll({ where: { assigned_to: id, status: "ASSIGNED" } });
	}

	static getCreated(id) {
		return Task.findAll({ where: { created_by: id } });
	}

	static getCompleted(userId) {
		return Task.findAll({ where: { status: "DONE", assigned_to: userId } });
	}

	static assignTask(userId, taskId) {
		return Task.update({ status: "ASSIGNED", assigned_to: userId }, { where: { id: taskId } });
	}

	static createTask(creator, taskData) {
		const data = {
			title: taskData.title,
			description: taskData.desciption,
			type: taskData.type,
			difficulty: taskData.difficulty,
			assigned_to: null,
			xp_reward: taskData.xpReward,
			gold_reward: taskData.goldReward,
			created_by: creator.userId,
			proof_required: taskData.proofRequired,
		};
		return Task.create(data);
	}

	static async completeTask(userId, taskId) {
		const assignedTasks = await this.getAssigned(userId);

		const taskExists = assignedTasks.some((assigned) => assigned.id === taskId);

		if (!taskExists) {
			throw new Error("Task not found");
		}
		return Task.update({ status: "PENDING_CONFIRM" }, { where: { id: taskId } });
	}

	static approveProofStatus(taskId) {
		return;
	}

	static async confirmCompleteTask(taskId) {
		await Task.update({ proof_status: "APPROVED" }, { where: { id: taskId } });
		return await Task.update({ status: "DONE" }, { where: { id: taskId } });
	}
}
export default TaskService;
