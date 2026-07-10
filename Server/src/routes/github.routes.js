import express from "express";

import authMiddleware from "../middlewares/auth.middleware.js";

import {
  connectGithub,
  githubCallback,
  getGithubConnection,
  disconnectGithub,
  getGithubRepositories,
  importGithubRepositories,
} from "../controllers/github.controller.js";

const router = express.Router();

router.get(
  "/connect",
  authMiddleware,
  connectGithub
);

router.get(
  "/callback",
  authMiddleware,
  githubCallback
);

router.get(
  "/me",
  authMiddleware,
  getGithubConnection
);

router.delete(
  "/disconnect",
  authMiddleware,
  disconnectGithub
);

router.get(
  "/repositories",
  authMiddleware,
  getGithubRepositories
);

router.post(
  "/import",
  authMiddleware,
  importGithubRepositories
);

export default router;