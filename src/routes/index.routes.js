import { Router } from "express";
import { auth } from "../controllers/index.js";
import userRouter from "./user.routes.js";
import taskRouter from "./task.routes.js";

const router = Router();

router.post("/login", auth.login);
router.post("/register", auth.register);

router.use("/user", userRouter);
router.use("/task", taskRouter);

export default router;
