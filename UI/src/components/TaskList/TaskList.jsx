import { memo } from "react";
import { Accordion } from "react-bootstrap";

import styles from "./TaskList.module.css";
import TaskItem from "~/components/TaskItem/TaskItem";

function TaskList({ eventKey, listName, tasks, emptyText, onTaskSelect }) {
	// prettier-ignore
	return (
		<>
				<Accordion.Item eventKey={eventKey}>
					<Accordion.Header>{listName}</Accordion.Header>
					<Accordion.Body className={styles.taskList}>
					{tasks instanceof Array && tasks.length > 0 ?
						tasks.map((task) => <TaskItem key={task.id} task={task} setSelectedTask={onTaskSelect} />)
						: <p>{emptyText}</p>}
					</Accordion.Body>
				</Accordion.Item>
		</>
	);
}

export default memo(TaskList);
