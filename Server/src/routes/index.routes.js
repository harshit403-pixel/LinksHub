import { Router } from 'express';
import authRoutes from '../modules/auth/auth.routes.js';
import linkRoutes from '../modules/links/links.routes.js';
import aiRoutes from '../modules/ai/ai.routes.js'
import knowledgeRoutes from '../modules/knowledge/knowledge.routes.js'
import githubRoutes from '../modules/github/github.routes.js'

const router = Router();

router.use('/auth', authRoutes);
router.use('/links', linkRoutes);
router.use("/ai", aiRoutes )
router.use("/knowledge", knowledgeRoutes)
router.use("/github", githubRoutes);

export default router;
