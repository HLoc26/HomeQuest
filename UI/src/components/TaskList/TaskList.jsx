import styles from "./TaskList.module.css";
function TaskList({ tasks, emptyText }) {
	return (
		<ul className={styles.taskList}>
			{tasks instanceof Array && tasks.length > 0 ? (
				tasks.map((task) => (
					<li key={task.id}>
						{task.title} - {task.type} - {task.difficulty} - xp: {task.xp_reward} - vàng: {task.gold_reward}
					</li>
				))
			) : (
				<p>{emptyText}</p>
			)}
		</ul>
	);
}

export default TaskList;
