import { Sequelize } from "sequelize";
import "dotenv/config";
const DB_NAME = process.env.DB_NAME
const DB_USER = process.env.DB_USER
const DB_PWD = process.env.DB_PWD

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PWD, {
    host: "localhost",
    dialect: "mysql",
    logging: false,
});

export default sequelize;
