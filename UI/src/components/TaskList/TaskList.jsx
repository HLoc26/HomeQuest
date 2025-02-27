import { memo } from "react";

import styles from "./TaskList.module.css";
import TaskItem from "~/components/TaskItem/TaskItem";
function TaskList({ tasks, emptyText, onTaskSelect }) {
	// prettier-ignore
	return (
		<ul className={styles.taskList}>
			{tasks instanceof Array && tasks.length > 0 ? (
				tasks.map((task) => (
					<TaskItem key={task.id} task={task} setSelectedTask={ onTaskSelect } />
				))
			) : (
				<p>{emptyText}</p>
			)}
		</ul>
	);
}

export default memo(TaskList);
