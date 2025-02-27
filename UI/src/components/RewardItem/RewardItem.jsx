import goldImg from "~/assets/gold.png";
import expImg from "~/assets/exp.png";
function RewardItem({ type, amount }) {
	return (
		<div className="d-flex flex-column align-items-center">
			{type == "gold" ? <img src={goldImg} alt="gold" width="40px" /> : <img src={expImg} alt="exp" width="40px" />}
			<h3>{amount}</h3>
		</div>
	);
}
export default RewardItem;
