import { useCallback } from "react";
import { Button } from "react-bootstrap";

import axios from "~/api/axios.js";
import { useStore } from "~/store";

function AssignButton({ task, setter }) {
	const [state, dispatch] = useStore();

	const user = state.user;

	const handleAssign = useCallback(async () => {
		try {
			const response = await axios.post(
				"/task/assign",
				{
					userId: user.userId,
					taskId: task.id,
				},
				{
					withCredentials: true,
				}
			);
			if (response.data.success) {
				const newTaskData = { ...task, status: "ASSIGNED", assigned_to: user.userId };

				setter.setAllTasks((prev) => {
					prev.filter((t) => t.id !== task.id);
				});

				setter.setAssignedTasks((prev) => {
					if (prev.some((t) => t.id === task.id)) {
						return prev.map((t) => (t.id === task.id ? newTaskData : t));
					} else {
						return [...prev, newTaskData];
					}
				});

				setter.setCreatedTasks((prev) => {
					if (prev.some((t) => t.id === task.id)) {
						return prev.map((t) => (t.id === task.id ? newTaskData : t));
					} else {
						return prev;
					}
				});

				setter.setSelectedTask(newTaskData);
			}
		} catch (error) {
			console.error("Lỗi khi nhận nhiệm vụ:", error);
		}
	}, [user, task, setter]);

	return (
		<Button className="px-3 py-2 btn my-3" onClick={handleAssign}>
			Nhận nhiệm vụ
		</Button>
	);
}

export default AssignButton;
