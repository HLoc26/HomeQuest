import { Router } from "express";
const taskRouter = Router();
import TaskController from "../controllers/task.controller.js";

taskRouter.get("/all", TaskController.getAll);
taskRouter.get("/me", TaskController.getMe);

export default taskRouter;
