import { useCallback, useEffect, useState } from "react";
import { useStore } from "../../store";
import axios from "../../api/axios.js";

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

	console.log(allTasks);
	console.log(assignedTasks);

	return (
		<>
			<h1>Bảng nhiệm vụ</h1>
			<h2>Nhiệm vụ chưa nhận</h2>
			<ul style={{ listStyle: "none" }}>
				{allTasks.length > 0 ? (
					allTasks.map((task) => (
						<li key={task.id}>
							{task.title} - {task.type} - {task.difficulty} - xp: {task.xp_reward} - vàng: {task.gold_reward}
						</li>
					))
				) : (
					<p>Không có nhiệm vụ chưa nhận</p>
				)}
			</ul>
			<h2>Nhiệm vụ đã nhận</h2>
			<ul>
				{assignedTasks.length > 0 ? (
					assignedTasks.map((task) => (
						<li key={task.id}>
							{task.title} - {task.type} - {task.difficulty} - xp: {task.xp_reward} - vàng: {task.gold_reward}
						</li>
					))
				) : (
					<p>Chưa nhận nhiệm vụ nào</p>
				)}
			</ul>
			<h2>Nhiệm vụ đã tạo</h2>
			<ul>
				{createdTasks.length > 0 ? (
					createdTasks.map((task) => (
						<li key={task.id}>
							{task.title} - {task.type} - {task.difficulty} - xp: {task.xp_reward} - vàng: {task.gold_reward}
						</li>
					))
				) : (
					<p>Chưa tạo nhiệm vụ nào</p>
				)}
			</ul>
		</>
	);
}

export default Dashboard;
