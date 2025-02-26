import { Routes, Route } from "react-router-dom";
import { useStore } from "./store";
import { useEffect } from "react";

import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";

function App() {
	const [state, dispatch] = useStore();

	const theme = state.theme;

	useEffect(() => {
		console.log("Hello");
		const html = document.getElementsByTagName("html")[0];
		if (theme == "light") {
			html.setAttribute("data-bs-theme", "light");
		} else {
			html.setAttribute("data-bs-theme", "dark");
		}
	}, []);

	return (
		<>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route element={<ProtectedRoute />}>
					<Route path="/" element={<Dashboard />} />
					<Route path="/user/me" element={<Profile />} />
				</Route>
			</Routes>
		</>
	);
}

export default App;
