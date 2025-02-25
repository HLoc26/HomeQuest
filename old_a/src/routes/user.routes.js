import { Router } from "express";
import * as userController from "../controllers/user.controller.js";
const userRouter = Router();

userRouter.get("/me", userController.getUser);

export default userRouter;
