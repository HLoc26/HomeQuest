import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

import axios from "../../api/axios";
import { useStore, actions } from "../../store";

function ProtectedRoute() {
	const [state, dispatch] = useStore();
	const [isLoading, setIsLoading] = useState(true); // Add loading state

	useEffect(() => {
		const validateAuth = async () => {
			try {
				setIsLoading(true);
				const response = await axios.get("/user/me", {
					withCredentials: true,
				});
				console.log(response.data);
				if (response.data.success) {
					dispatch(actions.setUser(response.data.payload));
				}
			} catch (error) {
				console.error("Auth error:", error);
			} finally {
				setIsLoading(false);
			}
		};

		validateAuth();
	}, [dispatch]);

	if (isLoading) return <div>Loading...</div>;
	if (!state.user) return <Navigate to="/login" />;

	return <Outlet />;
}

export default ProtectedRoute;
