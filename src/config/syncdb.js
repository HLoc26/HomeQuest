import sequelize from "./db.js";

const syncDatabase = async () => {
    try {
        await sequelize.sync({ alter: true })
        console.log("Database synchronized successfully!");
    } catch (error) {
        console.error("Error syncing database:", error);
    }
}

export default syncDatabase;