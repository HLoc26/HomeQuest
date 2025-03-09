import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";

import styles from "./ProvideProof.module.css";

function ProvideProof() {
	const location = useLocation();
	const navigate = useNavigate();
	const task = location.state?.task;

	// State for selected files and previews
	const [selectedFiles, setSelectedFiles] = useState([]);
	const [previews, setPreviews] = useState([]);

	// Handle file selection
	const handleFileSelect = (event) => {
		if (event.target.files) {
			const filesArray = Array.from(event.target.files);

			// Update selected files
			setSelectedFiles((prev) => [...prev, ...filesArray]);

			// Generate previews
			const newPreviews = filesArray.map((file) => {
				return URL.createObjectURL(file);
			});

			setPreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
		}
	};

	// Remove a selected image
	const removeImage = (index) => {
		// Remove the file and preview
		setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));

		// Revoke the object URL to avoid memory leaks
		URL.revokeObjectURL(previews[index]);
		setPreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		// Here you would typically upload the files to your server
		console.log("Files to upload:", selectedFiles);

		// Simple alert that file is upload, will implement post to backend later
		console.log("Uploaded");
	};

	return (
		<Container className="py-4">
			<Card className="shadow-sm">
				<Card.Header as="h4" className="text-white">
					Tải ảnh minh chứng hoàn thành
				</Card.Header>

				<Card.Body>
					{task && <Card.Title className="mb-4">Task: {task.title}</Card.Title>}

					<Form onSubmit={handleSubmit}>
						<Form.Group className="mb-4">
							<Form.Label>Tải ảnh minh chứng</Form.Label>
							<Form.Control type="file" multiple accept="image/*" onChange={handleFileSelect} />
							<Form.Text className="text-muted">Chọn ảnh minh chứng</Form.Text>
						</Form.Group>

						{/* Image Previews */}
						{previews.length > 0 && (
							<>
								<h5 className="mt-4 mb-4">Các ảnh đã chọn:</h5>
								<Row xs={1} md={2} lg={3} className={`${styles.previewContainer} g-3 mb-4 overflow-y-scroll`}>
									{previews.map((preview, index) => (
										<Col key={index} className="mt-0">
											<Card className="h-100">
												<Card.Img variant="top" src={preview} className="preview-image" style={{ height: "200px", objectFit: "cover" }} />
												<Card.Body className="d-flex justify-content-between align-items-center">
													<small className="text-muted">
														{selectedFiles[index]?.name?.length > 20 ? selectedFiles[index]?.name?.substring(0, 17) + "..." : selectedFiles[index]?.name}
													</small>
													<Button variant="outline-danger" size="sm" onClick={() => removeImage(index)}>
														Remove
													</Button>
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
									if (window.confirm("Dừng quá trình upload ảnh minh chứng?")) {
										navigate("/");
									}
								}}
							>
								Cancel
							</Button>
							<Button variant="success" type="submit" disabled={previews.length === 0}>
								Submit Proof
							</Button>
						</div>
					</Form>
				</Card.Body>
			</Card>
		</Container>
	);
}

export default ProvideProof;
