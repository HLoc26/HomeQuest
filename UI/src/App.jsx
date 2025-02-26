import { Routes, Route } from "react-router-dom";

import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";

function App() {
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
