import { Router } from 'express';
import authRoutes from './auth.routes.js';
import linkRoutes from './link.routes.js';
import aiRoutes from './ai.route.js'
import knowledgeRoutes from './knowledge.routes.js'

const router = Router();

router.use('/auth', authRoutes);
router.use('/links', linkRoutes);
router.use("/ai", aiRoutes )
router.use("/knowledge", knowledgeRoutes)

export default router;