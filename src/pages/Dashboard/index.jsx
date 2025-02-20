import { useCallback, useEffect, useState } from "react";

import { useStore } from "../../store";
import axios from "../../api/axios.js";
import TaskList from "../../components/TaskList/TaskList.jsx";

function Dashboard() {
	const [state] = useStore();
	const [allTasks, setAllTasks] = useState([]);
	const [assignedTasks, setAssignedTasks] = useState([]); // user's assigned task
	const [createdTasks, setCreatedTasks] = useState([]); // user's created task

	const user = state.user;

	// console.log("Dashboard", user);

	const fetchData = useCallback(async () => {
		try {
			const [all, assigned, created] = await Promise.all([
				axios.get("/task/all", { withCredentials: true }),
				axios.get("/task/assigned", { withCredentials: true }),
				axios.get("/task/created", { withCredentials: true }),
			]);

			// console.log("all", all.data);
			if (all.data.success) setAllTasks(all.data.payload);
			else console.error("All error", all.data.message);

			// console.log("assign", assigned.data);
			if (assigned.data.success) setAssignedTasks(assigned.data.payload);
			else console.error("Assigned error", assigned.data.message);

			// console.log("created", created.data);
			if (created.data.success) setCreatedTasks(created.data.payload);
			else console.error("Created error", created.data.message);
		} catch (error) {
			console.error("Lỗi khi tải dữ liệu:", error);
		}
	}, []);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	return (
		<>
			<h1>Bảng nhiệm vụ</h1>
			<h2>Nhiệm vụ chưa nhận</h2>
			<TaskList tasks={allTasks} emptyText="Không có nhiệm vụ chưa nhận" />

			<h2>Nhiệm vụ đã nhận</h2>
			<TaskList tasks={assignedTasks} emptyText="Bạn chưa nhận nhiệm vụ nào" />

			<h2>Nhiệm vụ đã tạo</h2>
			<TaskList tasks={createdTasks} emptyText="Bạn chưa tạo nhiệm vụ nào" />
		</>
	);
}

export default Dashboard;
