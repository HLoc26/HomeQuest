import { postLogin } from "./auth/login.controller.js";
import { postRegister } from "./auth/register.controller.js";
import { getXpReqs } from "./utils.controller.js";
export const auth = {
	login: postLogin,
	register: postRegister,
};

export const utils = {
	getXpReqs: getXpReqs,
};
