import sequelize from "./db.js";

const syncDatabase = async () => {
    try {
        await sequelize.sync({ alter: false, force: false })
        console.log("Database synchronized successfully!");
    } catch (error) {
        console.error("Error syncing database:", error);
    }
}

export default syncDatabase;