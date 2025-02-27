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
			{task.title}
		</li>
	);
}
export default TaskItem;
