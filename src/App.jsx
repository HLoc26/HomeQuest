import { Routes, Route } from "react-router-dom";

import "./App.css";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

function App() {
	return (
		<>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/user" element={<Profile />} />
			</Routes>
		</>
	);
}

export default App;
