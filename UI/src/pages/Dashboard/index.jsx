import { useCallback, useEffect, useState } from "react";
import axios from "~/api/axios.js";
import { TaskPage } from "~/components";

import { useTask } from "~/store";

function Dashboard() {
	const { all, assigned, created } = useTask();

	const fetchData = useCallback(async () => {
		try {
			const [allTasks, assignedTasks, createdTasks] = await Promise.all([
				axios.get("/task/all", { withCredentials: true }),
				axios.get("/task/assigned", { withCredentials: true }),
				axios.get("/task/created", { withCredentials: true }),
			]);

			all.setter(allTasks.data.success ? allTasks.data.payload : []);
			assigned.setter(assignedTasks.data.success ? assignedTasks.data.payload : []);
			created.setter(createdTasks.data.success ? createdTasks.data.payload : []);
		} catch (error) {
			console.log("Lỗi khi tải dữ liệu:", error.message);
		}
	}, []);
	console.log({ all, assigned, created });

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	return <TaskPage title="Bảng tin" tasks={[all, assigned, created]} />;
}

export default Dashboard;
