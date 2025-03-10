import { useState, useEffect } from "react";
import { Button, Accordion, Offcanvas } from "react-bootstrap";

import { TaskList, DescriptionBoard } from "~/components";
import { useTask } from "~/store";

import styles from "./TaskPage.module.css";

function TaskPage({ tasks, title }) {
	const [showOffcanvas, setShowOffcanvas] = useState(false);
	const { selected } = useTask();

	const handleClose = () => setShowOffcanvas(false);
	const handleShow = () => setShowOffcanvas(true);

	return (
		<div className="d-grid">
			<h1 className="col-sm-12 text-center">{title}</h1>
			{/* Nút để mở Offcanvas trên màn hình nhỏ */}
			<Button variant="primary" className="d-sm-none mb-3" onClick={handleShow}>
				Xem TaskList
			</Button>
			<div className="row">
				{/* TaskList hiển thị bình thường trên màn hình lớn */}
				<div className={`col-sm-3 d-none d-sm-block ${styles.taskContainer}`}>
					<Accordion alwaysOpen>
						{tasks.map((task, index) => (
							<TaskList eventKey={index + 1} key={index} listName={task.title} tasks={task.tasks} emptyText="Không có" />
						))}
					</Accordion>
				</div>

				{/* DescriptionBoard */}
				<div className="col">
					<DescriptionBoard task={selected} />
				</div>
			</div>
			{/* Offcanvas cho TaskList trên màn hình nhỏ */}
			<Offcanvas show={showOffcanvas} onHide={handleClose} responsive="xxl" className={styles.offcanvasXXL}>
				<Offcanvas.Header closeButton>
					<Offcanvas.Title>TaskList</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body style={{ overflowY: "hidden" }}>
					<div className={styles.taskContainer}>
						<Accordion alwaysOpen>
							{tasks.map((task, index) => (
								<TaskList
									eventKey={index + 1}
									key={index}
									listName={task.title}
									emptyText="Không có"
									onTaskSelect={(task) => {
										selected.setter(task);
										handleClose();
									}}
									tasks={task.tasks}
								></TaskList>
							))}
						</Accordion>
					</div>
				</Offcanvas.Body>
			</Offcanvas>
		</div>
	);
}

export default TaskPage;
