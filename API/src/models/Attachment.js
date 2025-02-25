import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js";

class Attachment extends Model {}

Attachment.init(
	{
		attachment_id: {
			type: DataTypes.INTEGER.UNSIGNED,
			autoIncrement: true,
			primaryKey: true,
		},
		attachment_path: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{ sequelize, timestamps: false }
);

export default Attachment;
