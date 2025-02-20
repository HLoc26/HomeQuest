import { useState } from "react";

import api from "../../api/axios.js";
import { useStore } from "../../store/hooks.js";
import { actions } from "../../store";
import { useNavigate } from "react-router-dom";

function Login() {
	const [inputField, setInput] = useState({ usn: "", pwd: "" });
	const [errorText, setErrorText] = useState("");
	const [showError, setShowError] = useState(false);
	const [state, dispatch] = useStore();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const user = { usn: inputField.usn, pwd: inputField.pwd };

		const response = await api.post("/login", user, { withCredentials: true });
		if (response.data.success) {
			// console.log(response.data);
			dispatch(actions.logIn(response.data.user));
			navigate("/user");
		} else {
			setErrorText("Invalid username or password");
			setShowError(true);
		}
	};

	return (
		<>
			<form action="" onSubmit={handleSubmit}>
				<input
					type="text"
					value={inputField.usn}
					onChange={(e) => {
						setShowError(false);
						setInput({ ...inputField, usn: e.target.value });
					}}
					placeholder="Username"
				/>
				<br />
				<input
					type="text" /* Should be type="password" */
					value={inputField.pwd}
					onChange={(e) => {
						setShowError(false);
						setInput({ ...inputField, pwd: e.target.value });
					}}
					placeholder="Password"
				/>
				<br />
				{showError && <p style={{ color: "red" }}>{errorText}</p>}
				<button type="submit">Login</button>
			</form>
		</>
	);
}

export default Login;
