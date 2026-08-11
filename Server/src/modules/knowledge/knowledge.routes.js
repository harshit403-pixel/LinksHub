import { Router } from "express";
import authMiddleware from "../../middlewares/auth.middleware.js";
import {
  deleteProject,
  getKnowledge,
  importProject,
  searchProjects,
} from "./knowledge.controller.js";

const router = Router();

router.post(
  "/project/import",
  authMiddleware,
  importProject
);

router.get("/", authMiddleware, getKnowledge);

router.post("/search", searchProjects);

router.delete(
  "/:id",
  authMiddleware,
  deleteProject
);

export default router;
