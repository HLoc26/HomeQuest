import { Router } from "express";
const taskRouter = Router();
import TaskController from "../controllers/task.controller.js";

taskRouter.get("/all", TaskController.getAll);
taskRouter.get("/assigned", TaskController.getAssigned);
taskRouter.get("/created", TaskController.getCreated);
taskRouter.post("/assign", TaskController.assignTask);

export default taskRouter;
