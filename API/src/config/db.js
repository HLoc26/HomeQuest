import { Sequelize } from "sequelize";
import "dotenv/config";
const MYSQL_DATABASE = process.env.MYSQL_DATABASE;
const MYSQL_USER = process.env.MYSQL_USER;
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD;

const sequelize = new Sequelize(MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD, {
	host: "db",
	dialect: "mysql",
	logging: false,
});

export default sequelize;
