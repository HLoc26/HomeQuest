import { useReducer } from "react";

import UserContext from "./UserContext";
import reducer, { initState } from "./reducer";

function UserProvider({ children }) {
	const [userState, userDispatch] = useReducer(reducer, initState);

	return <UserContext.Provider value={[userState, userDispatch]}>{children}</UserContext.Provider>;
}

export default UserProvider;
