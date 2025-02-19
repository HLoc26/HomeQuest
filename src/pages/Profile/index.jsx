import { useStore } from "../../store";

function Profile() {
	const [state] = useStore();

	const user = state.user;

	console.log("Profile:", user);

	return (
		<>
			<h1>
				{user.userId} - {user.usn}
			</h1>
		</>
	);
}

export default Profile;
