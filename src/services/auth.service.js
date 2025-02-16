import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config"
import { User } from "../models/index.js";
class AuthService {
    static async register({ usn, pwd }) {
        try {

            const isInDb = await User.findOne({ where: { usn: usn } })
            if (isInDb) {
                throw new Error("Username already in use!");
            }
            const hashed = await bcrypt.hash(pwd, +process.env.HASH_ROUND)
            const user = await User.create({ usn: usn, pwd: hashed })
            return user;
        } catch (error) {
            // console.error(error);
            throw new Error(`Register failed: ${error.message}`);
        }
    }
    static async login({ usn, pwd }) {
        try {

            // Find if user exists in db
            const userInDb = await User.findOne({ where: { usn: usn } })
            if (!userInDb) {
                throw new Error("Invalid username or password");
            }

            // Compare input and db password
            if (!(await bcrypt.compare(pwd, userInDb.pwd))) {
                throw new Error("Invalid username or password");
            }

            // Create token
            const token = jwt.sign({ userId: userInDb.id, usn: userInDb.usn }, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES
            });

            return { token, user: { userId: userInDb.id, usn: userInDb.usn } }

        } catch (error) {
            // console.error(error)
            throw new Error(`Login failed: ${error}`);
        }
    }
}
export default AuthService;