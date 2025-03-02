import { User } from "../models/index.js";
class UserService {
	static getUser(id) {
		return User.findOne({ where: { id: id } });
	}
}
export default UserService;
