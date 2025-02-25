import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js";

class Achievement extends Model {}

Achievement.init(
	{
		achievement_id: {
			type: DataTypes.INTEGER.UNSIGNED,
			primaryKey: true,
			autoIncrement: true,
		},
		achievement_name: {
			type: DataTypes.STRING,
		},
		achievement_desc: {
			type: DataTypes.TEXT,
		},
	},
	{ sequelize, timestamps: false }
);

export default Achievement;
