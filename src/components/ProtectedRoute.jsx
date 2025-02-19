import { Navigate, Outlet } from "react-router-dom";
import { useLayoutEffect } from "react";

import axios from "../api/axios";
import { useStore, actions } from "../store";

function ProtectedRoute() {
	const [state, dispatch] = useStore();

	console.log(state);

	useLayoutEffect(() => {
		const fetchUser = async () => {
			try {
				const response = await axios.get("/user", { withCredentials: true });
				console.log("Data:", response.data);
				if (response.data) {
					dispatch(actions.setUser(response.data.user));
				} else {
					// Có thể thêm hành động nếu không có user
					console.log("Không tìm thấy user");
				}
			} catch (error) {
				console.error("Lỗi khi lấy thông tin người dùng:", error);
			}
		};

		// Chỉ gọi API nếu chưa có user
		if (!state.user) {
			fetchUser();
			console.log("user30:", state.user);
		}
	});

	const user = state.user;
	console.log("35", user);
	if (!user) {
		return <Navigate to="/login" />;
	}

	console.log("ProtectedRoute:", user);
	return <Outlet />;
}

export default ProtectedRoute;
