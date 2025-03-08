import { useCallback, useEffect, useState } from "react";
import { Button, Offcanvas, Accordion } from "react-bootstrap";
import axios from "~/api/axios.js";
import styles from "./Dashboard.module.css";
import { useStore } from "~/store";
import { TaskList, DescriptionBoard } from "~/components";

function Dashboard() {
	const [state] = useStore();
	const [allTasks, setAllTasks] = useState([]);
	const [assignedTasks, setAssignedTasks] = useState([]);
	const [createdTasks, setCreatedTasks] = useState([]);
	const [selectedTask, setSelectedTask] = useState(null);
	const [showOffcanvas, setShowOffcanvas] = useState(false);

	const user = state.user;

	const fetchData = useCallback(async () => {
		try {
			const [all, assigned, created] = await Promise.all([
				axios.get("/task/all", { withCredentials: true }),
				axios.get("/task/assigned", { withCredentials: true }),
				axios.get("/task/created", { withCredentials: true }),
			]);

			if (all.data.success) setAllTasks(all.data.payload);
			else console.error("All error", all.data.message);

			if (assigned.data.success) setAssignedTasks(assigned.data.payload);
			else console.error("Assigned error", assigned.data.message);

			if (created.data.success) setCreatedTasks(created.data.payload);
			else console.error("Created error", created.data.message);
		} catch (error) {
			// console.log("Lỗi khi tải dữ liệu:", error.message);
		}
	}, []);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	const handleClose = () => setShowOffcanvas(false);
	const handleShow = () => setShowOffcanvas(true);

	return (
		<div className="d-grid">
			<h1 className="col-sm-12 text-center">Bảng nhiệm vụ</h1>
			{/* Nút để mở Offcanvas trên màn hình nhỏ */}
			<Button variant="primary" className="d-sm-none mb-3" onClick={handleShow}>
				Xem TaskList
			</Button>
			<div className="row">
				{/* TaskList hiển thị bình thường trên màn hình lớn */}
				<div className={`col-sm-3 d-none d-sm-block ${styles.taskContainer}`}>
					<Accordion alwaysOpen>
						<TaskList eventKey={1} listName="All tasks" tasks={allTasks} emptyText="None" onTaskSelect={setSelectedTask} />
						<TaskList eventKey={2} listName="Assigned tasks" tasks={assignedTasks} emptyText="None" onTaskSelect={setSelectedTask} />
						<TaskList eventKey={3} listName="Created tasks" tasks={createdTasks} emptyText="None" onTaskSelect={setSelectedTask} />
					</Accordion>
				</div>

				{/* DescriptionBoard */}
				<div className="col">
					<DescriptionBoard task={selectedTask} setter={{ setAllTasks, setAssignedTasks, setCreatedTasks, setSelectedTask }} />
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
							<TaskList
								eventKey={1}
								listName="All tasks"
								tasks={allTasks}
								emptyText="None"
								onTaskSelect={(task) => {
									setSelectedTask(task);
									handleClose();
								}}
							/>
							<TaskList
								eventKey={2}
								listName="Assigned tasks"
								tasks={assignedTasks}
								emptyText="None"
								onTaskSelect={(task) => {
									setSelectedTask(task);
									handleClose();
								}}
							/>
							<TaskList
								eventKey={3}
								listName="Created tasks"
								tasks={createdTasks}
								emptyText="None"
								onTaskSelect={(task) => {
									setSelectedTask(task);
									handleClose();
								}}
							/>
						</Accordion>
					</div>
				</Offcanvas.Body>
			</Offcanvas>
		</div>
	);
}

export default Dashboard;
