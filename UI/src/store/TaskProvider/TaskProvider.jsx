import { useState } from "react";
import TaskContext from "./TaskContext";
function TaskProvider({ children }) {
	const [allTasks, setAllTasks] = useState([]);
	const [assignedTasks, setAssignedTasks] = useState([]);
	const [createdTasks, setCreatedTasks] = useState([]);
	const [completedTasks, setCompletedTasks] = useState([]);
	const [selectedTask, setSelectedTask] = useState(null);

	return (
		<TaskContext.Provider
			value={{
				all: {
					tasks: allTasks,
					setter: setAllTasks,
					title: "Tất cả nhiệm vụ",
				},
				assigned: {
					tasks: assignedTasks,
					setter: setAssignedTasks,
					title: "Nhiệm vụ đã nhận",
				},
				created: {
					tasks: createdTasks,
					setter: setCreatedTasks,
					title: "Nhiệm vụ đã tạo",
				},
				completed: {
					tasks: completedTasks,
					setter: setCompletedTasks,
					title: "Nhiệm vụ đã hoàn thành",
				},
				selected: {
					task: selectedTask,
					setter: setSelectedTask,
					title: "Nhiệm vụ đang chọn",
				},
			}}
		>
			{children}
		</TaskContext.Provider>
	);
}

export default TaskProvider;
