import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import "./index.css";
import App from "./App.jsx";
import { UserProvider } from "./store";
import TaskProvider from "./store/TaskProvider/TaskProvider.jsx";

createRoot(document.getElementById("root")).render(
	// <StrictMode>
	<UserProvider>
		<TaskProvider>
			<Router>
				<App />
			</Router>
		</TaskProvider>
	</UserProvider>
	// </StrictMode>
);
