import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Card, Container, Row, Col } from "react-bootstrap";

import axios from "~/api/axios.js";
import { useTask } from "~/store";

import styles from "./ConfirmWork.module.css";

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
	}, [selected, navigate]);

	const handleApprove = async () => {
		const response = await axios.post("/task/confirm", { taskId: selected.task.id }, { withCredentials: true });
		alert(`Đã xác nhận hoàn thành nhiệm vụ ${selected.task.title}`);
		navigate("/");
	};

	const handleRequireMore = async () => {
		await axios.post("/task/require-more", { taskId: selected.task.id }, { withCredentials: true });
		alert("Đã yêu cầu thêm minh chứng cho nhiệm vụ");
	};

	return (
		<Container className="py-4">
			<Card className="shadow-sm">
				<Card.Header as="h4" className="text-white">
					Xác nhận hoàn thành nhiệm vụ: {selected.task?.title}
				</Card.Header>

				<Card.Body>
					{attachments.length > 0 && (
						<>
							<h5 className="mt-4 mb-4">Minh chứng đã tải lên:</h5>
							<Row xs={1} md={2} lg={3} className={`${styles.previewContainer} g-3 mb-4 overflow-y-scroll`}>
								{attachments.map((attachment) => (
									<Col key={attachment.id}>
										<Card className="h-100">
											<Card.Img variant="top" src={attachment.url} alt="Proof" style={{ height: "200px", objectFit: "cover" }} />
											<Card.Body>
												<small className="text-muted">
													{attachment.url.split("/").pop().length > 20 ? attachment.url.split("/").pop().substring(0, 17) + "..." : attachment.url.split("/").pop()}
												</small>
											</Card.Body>
										</Card>
									</Col>
								))}
							</Row>
						</>
					)}

					<div className="d-grid gap-2 d-md-flex justify-content-md-end">
						<Button
							variant="secondary"
							className="me-md-2"
							onClick={() => {
								if (window.confirm("Hủy quá trình xác nhận nhiệm vụ?")) {
									navigate("/");
								}
							}}
						>
							Cancel
						</Button>
						<Button variant="warning" onClick={handleRequireMore}>
							Require More Proof
						</Button>
						<Button variant="success" onClick={handleApprove}>
							Approve
						</Button>
					</div>
				</Card.Body>
			</Card>
		</Container>
	);
}

export default ConfirmWork;
