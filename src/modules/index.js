import express from 'express';
import userRoutes from './users/routes/userRoutes.js';
import roleRoutes from './roles/routes/roleRoutes.js';
import logRoutes from './logs/routes/logRoute.js';

const router = express.Router();

router.use('/v1', userRoutes);
router.use('/v1', roleRoutes);
router.use('/v1', logRoutes);

export default router;