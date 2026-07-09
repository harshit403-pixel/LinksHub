import { Router } from "express";
import {
  importProject,
  getKnowledge,
  searchProjects,
  deleteProject,
} from "../controllers/knowledge.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();



// Import a GitHub project
router.post("/project/import",authMiddleware, importProject);

// Get all knowledge items of logged-in user
router.get("/",authMiddleware, getKnowledge);

// Search projects
router.post("/search", searchProjects);

// Delete a project by ID
router.delete(
  "/:id",
  authMiddleware,
  deleteProject
);

export default router;