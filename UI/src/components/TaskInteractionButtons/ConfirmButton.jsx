import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "~/api/axios";

function ConfirmButton({ task }) {
	const navigate = useNavigate();

	const handleConfirm = async () => {
		try {
			if (task.proof_required) {
				navigate(`/tasks/${task.id}/proof`);
			}
			const response = await axios.post(
				"/task/confirm",
				{
					taskId: task.id,
				},
				{ withCredentials: true }
			);

			if (response.data.success) {
				alert(`Đã xác nhận hoàn thành nhiệm vụ ${task.title}`);
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Button variant="success" className=" px-3 py-2 btn my-3" onClick={handleConfirm}>
			Xác nhận hoàn thành
		</Button>
	);
}

export default ConfirmButton;
