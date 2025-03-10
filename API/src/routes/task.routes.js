import { Router } from "express";
const taskRouter = Router();
import TaskController from "../controllers/task.controller.js";

taskRouter.get("/all", TaskController.getAll);
taskRouter.get("/assigned", TaskController.getAssigned);
taskRouter.get("/created", TaskController.getCreated);
taskRouter.get("/completed", TaskController.getCompleted);
taskRouter.post("/assign", TaskController.assignTask);
taskRouter.post("/create", TaskController.createTask);
taskRouter.post("/complete", TaskController.completeTask);

export default taskRouter;
