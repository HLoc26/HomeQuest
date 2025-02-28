import { handleRequest } from "../utils/handleRequest.js";
import xpReqs from "../data/levelRequirements.js";

export const getXpReqs = handleRequest(async () => {
	// console.log(xpReqs);
	return xpReqs;
});
