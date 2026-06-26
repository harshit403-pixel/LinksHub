import { Router } from 'express';
import authRoutes from './auth.routes.js';
import linkRoutes from './link.routes.js';
import aiRoutes from './ai.route.js'

const router = Router();

router.use('/auth', authRoutes);
router.use('/links', linkRoutes);
router.use("/ai", aiRoutes )

export default router;