import { Routes, Route } from "react-router-dom";
import { useUser, actions } from "~/store";
import { useCallback, useEffect } from "react";

import "./App.css";
import axios from "./api/axios.js";
import { ProtectedRoute, MainLayout } from "~/components";
import { Login, Dashboard, Profile, Logout, CreateTask, CompletedTasks, ProvideProof } from "~/pages";

function App() {
	const [userState, userDispatch] = useUser();

	const theme = userState.theme;

	const fetchXpReqs = useCallback(async () => {
		const response = await axios.get("/xpReqs", { withCredentials: true });
		const data = response.data.payload;
		userDispatch(actions.setXpReqs(data));
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
					<Route
						path="/logout"
						element={
							<MainLayout>
								<Logout />
							</MainLayout>
						}
					/>
					<Route
						path="/tasks/create"
						element={
							<MainLayout>
								<CreateTask />
							</MainLayout>
						}
					/>
					<Route
						path="/tasks/completed"
						element={
							<MainLayout>
								<CompletedTasks />
							</MainLayout>
						}
					/>
					<Route
						path="/tasks/proof"
						element={
							<MainLayout>
								<ProvideProof />
							</MainLayout>
						}
					/>
				</Route>
			</Routes>
		</>
	);
}

export default App;
