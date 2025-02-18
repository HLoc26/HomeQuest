import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js";

class User extends Model {}

User.init(
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			autoIncrement: true,
			primaryKey: true,
		},
		usn: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
		},
		pwd: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		xp: { type: DataTypes.INTEGER.UNSIGNED, defaultValue: 0 },
		gold: { type: DataTypes.INTEGER.UNSIGNED, defaultValue: 0 },
		level: { type: DataTypes.INTEGER.UNSIGNED, defaultValue: 1 },
		gold_multiplier: { type: DataTypes.DOUBLE, defaultValue: 1 },
	},
	{ sequelize, timestamps: false }
);

export default User;
