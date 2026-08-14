import { Router } from "express";
import {
  getCurrentUser,
  googleAuth,
  googleAuthCallback,
  loginUser,
  logoutUser,
  registerUser,
  updateProfile,
  uploadProfilePicture,
} from "./auth.controller.js";
import authMiddleware from "../../middlewares/auth.middleware.js";
import { upload } from "../../middlewares/upload.middleware.js";
import validateRequest from "../../middlewares/validateRequest.js";
import {
  loginValidation,
  registerValidation,
} from "./auth.validators.js";

const router = Router();

router.post(
  "/register",
  registerValidation,
  validateRequest,
  registerUser
);

router.post(
  "/login",
  loginValidation,
  validateRequest,
  loginUser
);

router.get(
  "/google",
  googleAuth
);

router.get(
  "/google/callback",
  googleAuthCallback
);

router.get(
  "/me",
  authMiddleware,
  getCurrentUser
);

router.patch(
  "/profile",
  authMiddleware,
  updateProfile
);

router.patch(
  "/profile-picture",
  authMiddleware,
  upload.single("image"),
  uploadProfilePicture
);




router.post("/logout", logoutUser);

export default router;
