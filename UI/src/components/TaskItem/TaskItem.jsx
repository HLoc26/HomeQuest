import styles from "./TaskItem.module.css";
function TaskItem({ task, setSelectedTask }) {
	return (
		<li
			key={task.id}
			onClick={() => {
				setSelectedTask(task);
			}}
			className={styles.taskItem}
		>
			{task.title} - {task.type} - {task.difficulty} - xp: {task.xp_reward} - vàng: {task.gold_reward}
		</li>
	);
}
export default TaskItem;
