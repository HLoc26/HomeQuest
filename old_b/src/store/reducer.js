import { LOGIN, LOGOUT, SET_THEME, SET_USER } from "./constants";
const initState = {
	user: null,
	theme: "light",
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
		case SET_USER:
			return {
				...state,
				user: action.payload,
			};
		case SET_THEME:
			return {
				...state,
				theme: action.payload,
			};

		default:
			throw new Error("Invalid action");
	}
};

export { initState };
export default reducer;
