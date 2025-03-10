import { memo } from "react";
import { Accordion } from "react-bootstrap";

import styles from "./TaskList.module.css";
import TaskItem from "~/components/TaskItem/TaskItem";

function TaskList({ eventKey, listName, tasks, emptyText }) {
	// prettier-ignore
	return (
		<Accordion.Item eventKey={eventKey}>
			<Accordion.Header>{listName}</Accordion.Header>
			<Accordion.Body className={styles.taskList}>
				{tasks?.length > 0
					? tasks.map((task) =>
						<TaskItem
							key={task.id}
							task={task}
						/>)
					: <p>{emptyText}</p>
				}
			</Accordion.Body>
		</Accordion.Item>
	);
}

export default TaskList;
