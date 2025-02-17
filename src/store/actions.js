import { LOGIN, LOGOUT } from "./constants";

export const logIn = payload => ({
    type: LOGIN,
    payload
})

export const logOut = payload => ({
    type: LOGOUT,
    payload
})
