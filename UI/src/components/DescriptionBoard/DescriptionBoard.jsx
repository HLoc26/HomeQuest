import styles from "./DescriptionBoard.module.css";
function DescriptionBoard({ task }) {
	return (
		<div>
			<h2>{task?.description ? task.description : "Chọn một nhiệm vụ để xem"}</h2>
		</div>
	);
}

export default DescriptionBoard;
