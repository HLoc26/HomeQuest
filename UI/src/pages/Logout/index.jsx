import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser, actions } from "~/store";

function Logout() {
	const [userState, userDispatch] = useUser();
	const navigate = useNavigate();

	console.log(userState);

	useEffect(() => {
		userDispatch(actions.logOut());
		navigate("/login");
	}, [userDispatch, navigate]);

	return null;
}

export default Logout;
