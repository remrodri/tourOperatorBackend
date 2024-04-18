import express from 'express';
import userRoutes from './users/routes/userRoutes.js';

const router = express.Router();

router.use('/v1', userRoutes);

export default router;