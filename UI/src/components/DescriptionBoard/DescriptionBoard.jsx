import { useEffect, useCallback, useState } from "react";

import { useStore } from "~/store";
import RewardItem from "~/components/RewardItem/RewardItem";
import axios from "~/api/axios.js";
import styles from "./DescriptionBoard.module.css";
import AssignButton from "../TaskInteractionButtons/AssignButton";
import CompleteButton from "../TaskInteractionButtons/CompleteButton";
import CancelButton from "../TaskInteractionButtons/CancelButton";
function DescriptionBoard({ task, setter }) {
	const [state, dispatch] = useStore();
	const [creator, setCreator] = useState(null);
	const [assignee, setAssignee] = useState(null);
	const user = state.user;

	useEffect(() => {
		const fetchCreator = async () => {
			try {
				const response = await axios.get(`user?id=${task?.created_by}`, { withCredentials: true });
				if (response.data.success) {
					setCreator(response.data.payload);
				}
			} catch (error) {
				console.error(error);
			}
		};
		if (task?.created_by) {
			fetchCreator();
		}
	}, [task?.created_by]);

	useEffect(() => {
		const fetchAssignee = async () => {
			try {
				const response = await axios.get(`/user?id=${task?.assigned_to}`, { withCredentials: true });
				if (response.data.success) {
					setAssignee(response.data.payload);
				}
			} catch (error) {
				console.error(error);
			}
		};
		if (task?.assigned_to) {
			fetchAssignee();
		}
	}, [task?.assigned_to]);

	return (
		<>
			{task ? (
				<div className={`px-3 w-100 ${styles.descriptionBoard}`}>
					<div className={`${styles.description} pe-4`}>
						<div className="d-flex">
							<h2 className="flex-grow-1">{task.title}</h2>
							<h4>Tạo bởi {creator?.usn}</h4>
						</div>
						<p>{task.description}</p>
					</div>
					{task?.assigned_to ? task.assigned_to === user.userId ? <div>Bạn đã nhận nhiệm vụ này</div> : <div>Đã được nhận bởi {assignee?.usn}</div> : <div> Chưa ai nhận nhiệm vụ này</div>}

					<hr style={{ width: "100%" }} />
					<div className={`${styles.rewardPanel} d-flex`}>
						<div className={`${styles.rewardPanel} d-flex`}>
							<RewardItem type={"gold"} amount={task.gold_reward} />
							<RewardItem type={"exp"} amount={task.xp_reward} />
						</div>
						<div className={`${styles.rewardPanel} d-flex flex-grow-1 justify-content-end`}>
							{task.status === "PENDING" && <AssignButton task={task} setter={setter} />}
							{task.assigned_to === user.userId && <CompleteButton task={task} setter={setter} />}
							{task.created_by === user.userId && <CancelButton task={task} />}
						</div>
					</div>
				</div>
			) : (
				<h2>{"Chọn một nhiệm vụ để xem"}</h2>
			)}
		</>
	);
}

export default DescriptionBoard;
