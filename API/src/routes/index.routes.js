import { Router } from "express";
import { auth, utils } from "../controllers/index.js";
import userRouter from "./user.routes.js";
import taskRouter from "./task.routes.js";
import { AuthMiddleware } from "../middlewares/auth.js";

const router = Router();

router.post("/login", auth.login);
router.post("/register", auth.register);
router.get("/xpReqs", utils.getXpReqs);

router.use("/user", AuthMiddleware.authenticate, userRouter);
router.use("/task", AuthMiddleware.authenticate, taskRouter);

export default router;
