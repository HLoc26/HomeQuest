import { Task } from "../models/index.js";

class TaskService {
	static getAll() {
		return Task.findAll({ where: { status: "PENDING" } });
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

	static createTask(taskData) {
		return Task.create(taskData);
	}

	static completeTask(taskId) {
		return Task.update({ status: "DONE" }, { where: { id: taskId } });
	}
}
export default TaskService;
