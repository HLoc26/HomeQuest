import { useCallback } from "react";
import { Button } from "react-bootstrap";

import axios from "~/api/axios.js";
import { useUser, useTask } from "~/store";

function AssignButton({ task }) {
	const [userState] = useUser();
	const { all, assigned, created, selected } = useTask();

	const user = userState.user;

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

				all.setter((prev) => {
					prev.filter((t) => t.id !== task.id);
				});

				assigned.setter((prev) => {
					if (prev.some((t) => t.id === task.id)) {
						return prev.map((t) => (t.id === task.id ? newTaskData : t));
					} else {
						return [...prev, newTaskData];
					}
				});

				created.setter((prev) => {
					if (prev.some((t) => t.id === task.id)) {
						return prev.map((t) => (t.id === task.id ? newTaskData : t));
					} else {
						return prev;
					}
				});

				selected.setter(newTaskData);
			}
		} catch (error) {
			console.error("Lỗi khi nhận nhiệm vụ:", error);
		}
	}, [user, task, all, assigned, created, selected]);

	return (
		<Button className="px-3 py-2 btn my-3" onClick={handleAssign}>
			Nhận nhiệm vụ
		</Button>
	);
}

export default AssignButton;
