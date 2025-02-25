import { postLogin } from "./auth/login.controller.js";
import { postRegister } from "./auth/register.controller.js";

export const auth = {
	login: postLogin,
	register: postRegister,
};
