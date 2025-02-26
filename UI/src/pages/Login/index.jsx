import { Alert, Button, Card, Form, InputGroup } from "react-bootstrap";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../api/axios.js";
import { useStore } from "../../store/hooks.js";
import { actions } from "../../store";

function Login() {
	const [inputField, setInput] = useState({ usn: "", pwd: "" });
	const [errorText, setErrorText] = useState("");
	const [showError, setShowError] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [state, dispatch] = useStore();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const user = { usn: inputField.usn, pwd: inputField.pwd };

		try {
			const response = await api.post("/login", user, { withCredentials: true });
			if (response.data.success) {
				// console.log(response.data);
				dispatch(actions.logIn(response.data.payload));
				navigate("/");
			} else {
				setErrorText("Invalid username or password");
				setShowError(true);
			}
		} catch (error) {
			setErrorText("Login failed. Please try again.");
			setShowError(true);
		}
	};

	return (
		<>
			<Form onSubmit={handleSubmit} className="d-flex justify-content-center align-items-center vh-100">
				<Card className="p-4 shadow rounded">
					<Card.Header className="rounded">
						<h2 className="text-center">Login</h2>
					</Card.Header>
					<Card.Body>
						{showError && (
							<Alert variant="danger" className="p-2">
								{errorText}
							</Alert>
						)}
						<InputGroup className="mb-3">
							<InputGroup.Text>
								<i className="bi bi-person-fill"></i>
							</InputGroup.Text>
							<Form.Control
								type="text"
								value={inputField.usn}
								onChange={(e) => {
									setShowError(false);
									setInput({ ...inputField, usn: e.target.value });
								}}
								placeholder="Username"
							/>
						</InputGroup>
						<InputGroup>
							<InputGroup.Text>
								<i className="bi bi-key-fill"></i>
							</InputGroup.Text>
							<Form.Control
								type={showPassword ? "text" : "password"}
								value={inputField.pwd}
								onChange={(e) => {
									setShowError(false);
									setInput({ ...inputField, pwd: e.target.value });
								}}
								placeholder="Password"
							/>
							<Button
								onClick={() => {
									setShowPassword((prev) => !prev);
								}}
								variant={state.theme}
								className="border"
							>
								{showPassword ? <i className="bi bi-eye-slash-fill"></i> : <i className="bi bi-eye-fill"></i>}
							</Button>
						</InputGroup>
					</Card.Body>
					<Button type="submit">Login</Button>
				</Card>
			</Form>
		</>
	);
}

export default Login;
