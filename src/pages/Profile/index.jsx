import { Navigate } from "react-router-dom";
import { useStore } from "../../store";

function Profile() {
	const [state] = useStore();

	const user = state.user;

	if (!user) return <Navigate to="/login" />;
	console.log(user);

	return (
		<>
			<h1>
				{user.userId} - {user.usn}
			</h1>
		</>
	);
}

export default Profile;
