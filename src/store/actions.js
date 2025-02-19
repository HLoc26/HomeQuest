import { LOGIN, LOGOUT, SET_USER } from "./constants";

export const logIn = (payload) => ({
	type: LOGIN,
	payload,
});

export const logOut = (payload) => ({
	type: LOGOUT,
	payload,
});

export const setUser = (payload) => ({
	type: SET_USER,
	payload,
});
