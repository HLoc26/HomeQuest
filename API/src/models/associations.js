import Achievement from "./Achievement.js";
import Attachment from "./Attachment.js";
import Task from "./Task.js";
import User from "./User.js";

// User have many Achievements
User.belongsToMany(Achievement, { through: "UserAchievement" });
Achievement.belongsToMany(User, { through: "UserAchievement" });

// User can be assigned to many Tasks
User.hasMany(Task, { foreignKey: "assigned_to", as: "assignedTask" });
Task.belongsTo(User, { foreignKey: "assigned_to", as: "assignee" });

// User can create many Tasks
User.hasMany(Task, { foreignKey: "created_by", as: "createdTasks" });
Task.belongsTo(User, { foreignKey: "created_by", as: "creator" });

// A Task can have many Attachment
Task.hasMany(Attachment, { foreignKey: "task_id", as: "proofs" });
Attachment.belongsTo(Task, { foreignKey: "task_id", as: "task" });
