import express from 'express';
import userRoutes from './users/routes/userRoutes.js';
import roleRoutes from './roles/routes/roleRoutes.js';
import logRoutes from './logs/routes/logRoute.js';
import passwordRoutes from './password/routes/passwordRoutes.js';

const router = express.Router();

router.use('/v1', userRoutes);
router.use('/v1', roleRoutes);
router.use('/v1', logRoutes);
router.use('/v1', passwordRoutes);

export default router;