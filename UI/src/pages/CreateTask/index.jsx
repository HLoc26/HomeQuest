import { useState, useEffect } from "react";
import { Form, Button, Alert, Container, Row, Col } from "react-bootstrap";
import axios from "~/api/axios";

function CreateTask() {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [type, setType] = useState("DAILY");
	const [difficulty, setDifficulty] = useState("EASY");
	const [xpReward, setXpReward] = useState(0);
	const [goldReward, setGoldReward] = useState(0);
	const [error, setError] = useState("");

	const difficultyValues = {
		EASY: 60,
		MEDIUM: 500,
		HARD: 1000,
	};

	const typeMultipliers = {
		DAILY: 0.8,
		WEEKLY: 1.2,
		MONTHLY: 2,
		EPIC: 3.5,
	};

	useEffect(() => {
		const calculateRewards = () => {
			const baseXp = difficultyValues[difficulty];
			const multiplier = typeMultipliers[type];
			const xp = baseXp * multiplier;
			setXpReward(xp);
			setGoldReward(baseXp); // Assuming gold reward is the same as base XP
		};

		calculateRewards();
	}, [difficulty, type]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const baseXp = difficultyValues[difficulty];
		const multiplier = typeMultipliers[type];
		const defaultXp = baseXp * multiplier;
		const defaultGold = baseXp;

		const minXp = defaultXp * 0.8;
		const maxXp = defaultXp * 1.2;
		const minGold = defaultGold * 0.8;
		const maxGold = defaultGold * 1.2;

		if (xpReward < minXp || xpReward > maxXp || goldReward < minGold || goldReward > maxGold) {
			setError(`XP and Gold rewards must be within 20% of the default values. Default XP: ${defaultXp}, Default Gold: ${defaultGold}`);
			return;
		}

		try {
			const response = await axios.post("/task/create", { title, description, type, difficulty, xpReward, goldReward }, { withCredentials: true });
			if (response.data.success) {
				alert("Task created successfully!");
			}
		} catch (error) {
			console.error("Error creating task:", error);
		}
	};

	return (
		<Container className="px-5">
			<Form onSubmit={handleSubmit}>
				{error && <Alert variant="danger">{error}</Alert>}
				<Form.Group controlId="title">
					<Form.Label>Title</Form.Label>
					<Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
				</Form.Group>
				<Form.Group controlId="description" className="mt-3">
					<Form.Label>Description</Form.Label>
					<Form.Control as="textarea" height={"150px"} value={description} onChange={(e) => setDescription(e.target.value)} required />
				</Form.Group>
				<Row className="mt-3">
					<Col>
						<Form.Group controlId="type">
							<Form.Label>Type</Form.Label>
							<Form.Control as="select" value={type} onChange={(e) => setType(e.target.value)}>
								<option value="DAILY">Daily</option>
								<option value="WEEKLY">Weekly</option>
								<option value="MONTHLY">Monthly</option>
								<option value="EPIC">Epic</option>
							</Form.Control>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group controlId="difficulty">
							<Form.Label>Difficulty</Form.Label>
							<Form.Control as="select" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
								<option value="EASY">Easy</option>
								<option value="MEDIUM">Medium</option>
								<option value="HARD">Hard</option>
							</Form.Control>
						</Form.Group>
					</Col>
				</Row>
				<Row className="mt-3">
					<Col>
						<Form.Group controlId="xpReward">
							<Form.Label>XP Reward</Form.Label>
							<Form.Control type="number" value={xpReward} onChange={(e) => setXpReward(Number(e.target.value))} required />
						</Form.Group>
					</Col>
					<Col>
						<Form.Group controlId="goldReward">
							<Form.Label>Gold Reward</Form.Label>
							<Form.Control type="number" value={goldReward} onChange={(e) => setGoldReward(Number(e.target.value))} required />
						</Form.Group>
					</Col>
				</Row>
				<Button type="submit" className="w-100 mt-4">
					Create Task
				</Button>
			</Form>
		</Container>
	);
}

export default CreateTask;
