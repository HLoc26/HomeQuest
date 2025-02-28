import { Router } from "express";
import * as userController from "../controllers/user.controller.js";
const userRouter = Router();

userRouter.get("/me", userController.getUser);
userRouter.get("/xpReqs", userController.getXpReqs);

export default userRouter;
