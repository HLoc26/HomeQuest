import RewardItem from "~/components/RewardItem/RewardItem";
import styles from "./DescriptionBoard.module.css";
function DescriptionBoard({ task }) {
	// console.log(task);
	return (
		<>
			{task ? (
				<div className={`px-3 w-100 ${styles.descriptionBoard}`}>
					<h2 className={`${styles.description}`}>{task.description}</h2>
					<hr style={{ width: "100%" }} />
					<div className={`${styles.rewardPanel} d-flex`}>
						<RewardItem type={"gold"} amount={task.gold_reward} />
						<RewardItem type={"exp"} amount={task.xp_reward} />
					</div>
				</div>
			) : (
				<h2>{"Chọn một nhiệm vụ để xem"}</h2>
			)}
		</>
	);
}

export default DescriptionBoard;
