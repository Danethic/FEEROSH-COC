// src/routes/authRoute.ts
import { Router } from "express";
import { register, login, verify } from "../controllers/authController";
import { authenticate } from "../middlewares/authMiddleware";
import { validateSchema } from "../middlewares/validateSchema";
import { registerSchema, loginSchema } from "../schemas/authSchema";

const router = Router();

router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.get("/verify", authenticate, verify);

export default router;
