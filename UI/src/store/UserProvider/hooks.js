import UserContext from "./UserContext";
import { useContext } from "react";

export const useUser = () => {
	const [userState, userDispatch] = useContext(UserContext);
	return [userState, userDispatch];
};
