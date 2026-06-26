import { generateBio } from "../controllers/ai.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { Router } from "express";

const router = Router()

router.post(
  "/generate-bio",
  authMiddleware,
  generateBio
);

export default router