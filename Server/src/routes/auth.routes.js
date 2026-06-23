import { Router } from 'express';
import { getCurrentUser, loginUser, logoutUser, registerUser, updateProfile, uploadProfilePicture } from '../controllers/auth.controller.js';
import validateRequest from '../middlewares/validateRequest.js';
import { loginValidation, registerValidation } from '../validators/auth.validators.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/upload.middleware.js';


const router = Router();

router.post('/register', registerValidation, validateRequest, registerUser);
router.post('/login', loginValidation, validateRequest, loginUser);
router.get("/me", authMiddleware, getCurrentUser);
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