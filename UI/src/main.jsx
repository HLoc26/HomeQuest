import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import "./index.css";
import App from "./App.jsx";
import { GlobalProvider } from "./store";

createRoot(document.getElementById("root")).render(
	// <StrictMode>
	<GlobalProvider>
		<Router>
			<App />
		</Router>
	</GlobalProvider>
	// </StrictMode>
);

