import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

import axios from "~/api/axios";
import { useUser, actions } from "~/store";

function ProtectedRoute() {
	const [userState, userDispatch] = useUser();
	const [isLoading, setIsLoading] = useState(true); // Add loading state

	useEffect(() => {
		const validateAuth = async () => {
			try {
				setIsLoading(true);
				const response = await axios.get("/user/me", {
					withCredentials: true,
				});
				// console.log(response.data);
				if (response.data.success) {
					userDispatch(actions.setUser(response.data.payload));
				}
			} catch (error) {
				console.error("Auth error:", error.message);
			} finally {
				setIsLoading(false);
			}
		};

		validateAuth();
	}, [userDispatch]);

	if (isLoading) return <div>Loading...</div>;
	if (!userState.user) return <Navigate to="/login" />;

	return <Outlet />;
}

export default ProtectedRoute;
