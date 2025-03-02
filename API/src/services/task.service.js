import { Task } from "../models/index.js";

class TaskService {
	static getAll() {
		return Task.findAll({ where: { status: "PENDING" } });
	}

	static getAssigned(id) {
		return Task.findAll({ where: { assigned_to: id } });
	}

	static getCreated(id) {
		return Task.findAll({ where: { created_by: id } });
	}

	static assignTask(userId, taskId) {
		return Task.update({ status: "ASSIGNED", assigned_to: userId }, { where: { id: taskId } });
	}
}
export default TaskService;
