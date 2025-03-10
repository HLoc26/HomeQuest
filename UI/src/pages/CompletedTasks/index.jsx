import { useEffect, useState } from "react";

import { TaskList } from "~/components";
import axios from "~/api/axios";
import { useTask } from "~/store";
import TaskPage from "../../components/TaskPage/TaskPage";

function CompletedTasks() {
	const { completed } = useTask();
	useEffect(() => {
		async function fetchCompletedTasks() {
			try {
				const response = await axios.get("task/completed", { withCredentials: true });

				completed.setter(response.data.success ? response.data.payload : []);
			} catch (error) {
				console.error(error);
			}
		}
		fetchCompletedTasks();
	});

	return (
		<>
			<TaskPage tasks={[completed]} />
		</>
	);
}
export default CompletedTasks;
