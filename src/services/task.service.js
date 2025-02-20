import { Task } from "../models/index.js";

class TaskService {
	static getAll() {
		return Task.findAll();
	}

	static getAssigned(id) {
		return Task.findAll({ where: { assigned_to: id } });
	}

	static getCreated(id) {
		return Task.findAll({ where: { created_by: id } });
	}
}
export default TaskService;
