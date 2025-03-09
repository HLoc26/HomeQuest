import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

import axios from "~/api/axios";

function CompleteButton({ task, setter }) {
	const navigate = useNavigate();
	console.log(task);
	const handleComplete = useCallback(async () => {
		if (task.proof_required) {
			navigate("/tasks/proof", { state: { task } });
			return;
		}

		const response = await axios.post(
			"/task/complete",
			{
				task: task,
			},
			{ withCredentials: true }
		);
		console.log(response);

		if (response.data.success) {
			setter.setAssignedTasks((prev) => prev.filter((t) => t.id !== task.id));
		}
	}, [task, setter]);

	return (
		<Button variant="success" className="px-3 py-2 btn my-3" onClick={handleComplete}>
			Hoàn thành
		</Button>
	);
}
export default CompleteButton;
