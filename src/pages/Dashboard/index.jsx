import { useEffect, useState } from "react";
import { useStore } from "../../store";
import axios from "../../api/axios.js";

function Dashboard() {
	const [state] = useStore();
	const [allTasks, setAllTasks] = useState([]);
	const [assignedTasks, setAssignedTasks] = useState([]); // user's assigned task
	const [createdTasks, setCreatedTasks] = useState([]); // user's created task

	const user = state.user;

	console.log("Dashboard", user);

	useEffect(() => {
		const fetchData = async () => {
			const all = await axios.get("/task/all", { withCredentials: true });
			if (all.data.success) {
				setAllTasks(all.data.tasks);
			} else {
				console.log("All error", all.data.message);
			}
			const assigned = await axios.get("/task/assigned", { withCredentials: true });
			if (assigned.data.success) {
				setAssignedTasks(assigned.data.tasks);
			} else {
				console.log("Assigned error", assigned.message);
			}
			const created = await axios.get("/task/created", { withCredentials: true });
			if (created.data.success) {
				setCreatedTasks(created.data.tasks);
			} else {
				console.log("Created error", created.message);
			}
		};
		fetchData();
	}, []);

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
