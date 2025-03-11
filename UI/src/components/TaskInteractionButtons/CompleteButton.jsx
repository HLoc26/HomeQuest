import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

import axios from "~/api/axios";
import { useTask } from "~/store";

function CompleteButton({ task, setter }) {
	const navigate = useNavigate();

	const { assigned } = useTask();

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

		if (response.data.success) {
			assigned.setter((prev) => prev.filter((t) => t.id !== task.id));
		}
	}, [task, assigned, navigate]);

	return (
		<Button variant="success" className="px-3 py-2 btn my-3" onClick={handleComplete}>
			Hoàn thành
		</Button>
	);
}
export default CompleteButton;
