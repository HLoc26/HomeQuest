import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js";

class Task extends Model {}

Task.init(
	{
		id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
		title: { type: DataTypes.STRING },
		description: { type: DataTypes.STRING },
		status: { type: DataTypes.ENUM("DONE", "ASSIGNED", "PENDING") },
		type: { type: DataTypes.ENUM("DAILY", "WEEKLY", "MONTHLY", "EPIC") },
		difficulty: { type: DataTypes.ENUM("EASY", "MEDIUM", "HARD") },
		assigned_to: { type: DataTypes.INTEGER.UNSIGNED },
		xp_reward: { type: DataTypes.INTEGER.UNSIGNED },
		gold_reward: { type: DataTypes.INTEGER.UNSIGNED },
		proof_required: { type: DataTypes.BOOLEAN },
		created_by: { type: DataTypes.INTEGER.UNSIGNED },
		proof_status: { type: DataTypes.ENUM("PENDING", "APPROVED", "REQUIRE_MORE") },
	},
	{ sequelize, timestamps: true }
);

export default Task;
