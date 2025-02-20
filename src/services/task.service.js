import { Task } from "../models/index.js";

class TaskService {
	static async getAll() {
		return await Task.findAll();
	}

	static async getAssigned(id) {
		return await Task.findAll({ where: { assigned_to: id } });
	}
}
export default TaskService;
