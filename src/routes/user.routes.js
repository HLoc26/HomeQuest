import { Router } from "express";
import * as userController from "../controllers/user.controller.js";
const userRouter = Router();

userRouter.get("/", userController.getUser);

export default userRouter;
