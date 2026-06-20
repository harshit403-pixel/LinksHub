import { Router } from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import * as linkController from '../controllers/links.controller.js';

const router = Router();

router.post("/", authMiddleware, linkController.createLink)


router.delete(
  "/:id",
  authMiddleware,
  linkController.deleteLink
);

router.get(
  "/deleted",
  authMiddleware,
  linkController.getDeletedLinks
);

router.delete(
  "/deleted/:id",
  authMiddleware,
  linkController.purgeDeletedLink
);



router.get("/:username", linkController.getLinksByUsername)

export default router;