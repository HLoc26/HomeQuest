import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js";

class Task extends Model {}

Task.init(
	{
		id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
		title: { type: DataTypes.STRING, allowNull: false },
		description: { type: DataTypes.STRING },
		status: {
			type: DataTypes.ENUM("DONE", "ASSIGNED", "UNASSIGNED", "PENDING_CONFIRM"),
			allowNull: false,
			defaultValue: "UNASSIGNED",
		},
		type: { type: DataTypes.ENUM("DAILY", "WEEKLY", "MONTHLY", "EPIC"), allowNull: false },
		difficulty: { type: DataTypes.ENUM("EASY", "MEDIUM", "HARD"), allowNull: false },
		assigned_to: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: true,
			validate: {
				isValidAssignment(value) {
					if (this.status !== "UNASSIGNED" && value == null) {
						throw new Error("Task đã được giao thì 'assigned_to' không thể là NULL.");
					}
					if (this.status === "UNASSIGNED" && value != null) {
						throw new Error("Task ở trạng thái 'PENDING' thì 'assigned_to' phải là NULL.");
					}
				},
			},
		},
		xp_reward: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
		gold_reward: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, defaultValue: 0 },
		proof_required: { type: DataTypes.BOOLEAN, defaultValue: false },
		created_by: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
		proof_status: {
			type: DataTypes.ENUM("PENDING", "APPROVED", "REQUIRE_MORE"),
			defaultValue: "PENDING",
		},
	},
	{
		sequelize,
		timestamps: true,
		hooks: {
			beforeValidate: (task) => {
				const xpMapping = { EASY: 60, MEDIUM: 500, HARD: 1000 };
				if (task.difficulty) {
					task.xp_reward = xpMapping[task.difficulty] || 0;
				}
			},
		},
	}
);

export default Task;
