import { useUser } from "~/store";

function Profile() {
	const [userState] = useUser();

	const user = userState.user;

	return (
		<>
			<h1>
				{user.userId} - {user.usn}
			</h1>
		</>
	);
}

export default Profile;
