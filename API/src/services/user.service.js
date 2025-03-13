import { User } from "../models/index.js";
import xpReqs from "../data/levelRequirements.js";

class UserService {
	static getUser(id) {
		return User.findOne({ where: { id: id } });
	}

	static async completeTask(userId, xpReward, goldReward) {
		const user = await User.findOne({ where: { id: userId } });

		let currentXp = user.xp;
		let currentLevel = user.level;
		let newGold = user.gold + goldReward;

		while (xpReward + currentXp >= xpReqs[currentLevel].neededXP) {
			xpReward -= xpReqs[currentLevel].neededXP - currentXp;
			currentXp = 0;
			currentLevel += 1;
		}
		currentXp += xpReward;

		await User.update({ xp: currentXp, gold: newGold, level: currentLevel }, { where: { id: userId } });
	}
}
export default UserService;
