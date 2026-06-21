import { Router } from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import * as linkController from '../controllers/links.controller.js';
import { clickRateLimiter } from '../middlewares/clickRateLimiter.js';


const router = Router();

router.post("/", authMiddleware, linkController.createLink)

router.patch(
  "/:id",
  authMiddleware,
  linkController.updateLink
);


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

router.patch(
  "/deleted/:id/restore",
  authMiddleware,
  linkController.restoreDeletedLink
);


router.delete(
  "/deleted/:id",
  authMiddleware,
  linkController.purgeDeletedLink
);


router.get(
  "/go/:linkId",
  clickRateLimiter,
  linkController.redirectToLink
);

router.get(
  "/analytics/:id",
  authMiddleware,
  linkController.getLinkAnalytics
);
router.get(
  "/me",
  authMiddleware,
  linkController.getMyLinks
);
router.get("/:username", linkController.getLinksByUsername)



export default router;