import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

import axios from "~/api/axios.js";
import { useTask } from "~/store";

function ConfirmWork() {
	const navigate = useNavigate();
	const [attachments, setAttachments] = useState([]);
	const { selected } = useTask();

	useEffect(() => {
		const fetchAttachments = async () => {
			const response = await axios.get(`/task/attachments?taskId=${selected.task.id}`, { withCredentials: true });
			setAttachments(response.data.payload);
		};

		if (!selected.task) {
			navigate("/");
		}

		fetchAttachments();
	}, [selected]);

	const handleApprove = async () => {
		await axios.post("/task/confirm", { taskId: selected.task.id });
	};

	const handleRequireMore = async () => {
		await axios.post("/task/require-more", { taskId: selected.task.id });
	};

	return (
		<div>
			<h2>Xác nhận hoàn thành nhiệm vụ: {selected.task?.title}</h2>
			<div>
				{attachments.map((attachment) => (
					<img key={attachment.id} src={attachment.url} alt="Proof" width="200px" />
				))}
			</div>
			<Button onClick={handleApprove}>Approve</Button>
			<Button onClick={handleRequireMore}>Require More Proof</Button>
		</div>
	);
}

export default ConfirmWork;
