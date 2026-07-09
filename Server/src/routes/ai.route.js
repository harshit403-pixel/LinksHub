import { generateBio } from "../controllers/ai.controller.js";
import { importProject } from "../controllers/knowledge.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { Router } from "express";

const router = Router()

router.post(
  "/generate-bio",
  authMiddleware,
  generateBio
);

router.post(
    "/project/import",
    authMiddleware,
    importProject
);

export default router