import { LOGIN, LOGOUT, SET_USER } from "./constants";
const initState = {
	user: null,
};

const reducer = (state, action) => {
	let newState = state;
	switch (action.type) {
		case LOGIN:
			return {
				...state,
				user: action.payload,
			};
		case LOGOUT:
			break;
		case SET_USER:
			newState = {
				...state,
				user: action.payload,
			};
			console.log("new", newState);
			return newState;
		default:
			throw new Error("Invalid action");
	}
};

export { initState };
export default reducer;
