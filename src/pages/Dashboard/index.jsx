import { useStore } from "../../store";

function Dashboard() {
	const [state] = useStore();

	const user = state.user;

	console.log("Dashboard", user);

	return (
		<>
			<h1>Dashboard</h1>
		</>
	);
}

export default Dashboard;
