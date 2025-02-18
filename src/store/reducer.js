import { LOGIN, LOGOUT } from "./constants";
const initState = {
	user: null,
};

const reducer = (state, action) => {
	switch (action.type) {
		case LOGIN:
			return {
				...state,
				user: action.payload,
			};
		case LOGOUT:
			break;
		default:
			throw new Error("Invalid action");
	}
};

export { initState };
export default reducer;
