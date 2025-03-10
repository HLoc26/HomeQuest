import styles from "./TaskItem.module.css";
import { useTask } from "~/store";
function TaskItem({ task }) {
	const { selected } = useTask();
	return (
		<li
			key={task.id}
			onClick={() => {
				selected.setter(task);
			}}
			className={styles.taskItem}
		>
			{task.title}
		</li>
	);
}
export default TaskItem;
