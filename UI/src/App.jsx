import { Routes, Route } from "react-router-dom";
import { useStore, actions } from "~/store";
import { useCallback, useEffect } from "react";

import "./App.css";
import axios from "./api/axios.js";
import { ProtectedRoute, MainLayout } from "~/components";
import { Login, Dashboard, Profile } from "~/pages";

function App() {
	const [state, dispatch] = useStore();

	const theme = state.theme;

	const fetchXpReqs = useCallback(async () => {
		const response = await axios.get("/user/xpReqs", { withCredentials: true });
		const data = response.data.payload;
		dispatch(actions.setXpReqs(data));
	}, []);

	// At app start
	useEffect(() => {
		fetchXpReqs();
		// console.log("Hello");
		const html = document.getElementsByTagName("html")[0];
		if (theme == "light") {
			html.setAttribute("data-bs-theme", "light");
		} else {
			html.setAttribute("data-bs-theme", "dark");
		}
	}, [fetchXpReqs]);

	return (
		<>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route element={<ProtectedRoute />}>
					<Route
						path="/"
						element={
							<MainLayout>
								<Dashboard />
							</MainLayout>
						}
					/>
					<Route
						path="/user/me"
						element={
							<MainLayout>
								<Profile />
							</MainLayout>
						}
					/>
				</Route>
			</Routes>
		</>
	);
}

export default App;
