import { useCallback, useEffect, useState } from "react";

import { useStore } from "../../store";
import axios from "../../api/axios.js";
import TaskList from "../../components/TaskList/TaskList.jsx";
import DescriptionBoard from "../../components/DescriptionBoard/DescriptionBoard.jsx";

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
			console.log("Lỗi khi tải dữ liệu:", error.message);
		}
	}, []);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	return (
		<div className="d-grid">
			<h1 className="col-sm-12 text-center">Bảng nhiệm vụ</h1>
			<div className="row">
				<div className="col-sm-4">
					<h2>All tasks</h2>
					<TaskList tasks={allTasks} emptyText="None" />
					<h2>Assigned tasks</h2>
					<TaskList tasks={assignedTasks} emptyText="None" />
					<h2>Created tasks</h2>
					<TaskList tasks={createdTasks} emptyText="None" />
				</div>
				<div className="col-sm-8">
					<DescriptionBoard description="Hello" />
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
