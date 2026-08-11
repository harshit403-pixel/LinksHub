import { Router } from "express";
import authMiddleware from "../../middlewares/auth.middleware.js";
import { importProject } from "../knowledge/knowledge.controller.js";
import { generateBio } from "./ai.controller.js";

const router = Router();

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

export default router;
