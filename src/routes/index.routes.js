import { Router } from "express";
import { auth } from "../controllers/index.js";
import userRoute from "./user.routes.js";

const router = Router();

router.post("/login", auth.login);
router.post("/register", auth.register);

router.use("/user", userRoute);

export default router;
