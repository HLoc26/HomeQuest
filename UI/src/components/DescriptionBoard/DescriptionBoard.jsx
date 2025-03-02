import { useStore } from "~/store";
import RewardItem from "~/components/RewardItem/RewardItem";
import styles from "./DescriptionBoard.module.css";
import AssignButton from "../TaskInteractionButtons/AssignButton";
import CompleteButton from "../TaskInteractionButtons/CompleteButton";
import CancelButton from "../TaskInteractionButtons/CancelButton";
function DescriptionBoard({ task }) {
	const [state, dispatch] = useStore();
	const user = state.user;

	return (
		<>
			{task ? (
				<div className={`px-3 w-100 ${styles.descriptionBoard}`}>
					<h2 className={`${styles.description}`}>{task.description}</h2>
					<hr style={{ width: "100%" }} />
					<div className={`${styles.rewardPanel} d-flex`}>
						<div className={`${styles.rewardPanel} d-flex flex-grow-1`}>
							<RewardItem type={"gold"} amount={task.gold_reward} />
							<RewardItem type={"exp"} amount={task.xp_reward} />
						</div>
						{task.status === "PENDING" && <AssignButton task={task} />}
						{task.assigned_to === user.userId && <CompleteButton task={task} />}
						{task.created_by === user.userId && <CancelButton task={task} />}
					</div>
				</div>
			) : (
				<h2>{"Chọn một nhiệm vụ để xem"}</h2>
			)}
		</>
	);
}

export default DescriptionBoard;
