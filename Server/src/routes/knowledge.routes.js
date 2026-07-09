import { Router } from "express";
import {
  importProject,
  getKnowledge,
  searchProjects,
  deleteProject,
} from "../controllers/knowledge.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

// All knowledge routes require authentication
router.use(authMiddleware);

// Import a GitHub project
router.post("/project/import", importProject);

// Get all knowledge items of logged-in user
router.get("/", getKnowledge);

// Search projects
router.post("/search", searchProjects);

// Delete a project by ID
router.delete(
  "/:id",
  authMiddleware,
  deleteProject
);

export default router;