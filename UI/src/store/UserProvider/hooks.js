import UserContext from "./UserContext";
import { useContext } from "react";

export const useUser = () => {
	const [state, dispatch] = useContext(UserContext);
	return [state, dispatch];
};
