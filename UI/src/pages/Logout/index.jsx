import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStore, actions } from "~/store";

function Logout() {
	const [state, dispatch] = useStore();
	const navigate = useNavigate();

	console.log(state);

	useEffect(() => {
		dispatch(actions.logOut());
		navigate("/login");
	}, [dispatch, navigate]);

	return null;
}

export default Logout;
