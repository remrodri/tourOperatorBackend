import express from 'express';
import AuthMiddleware from '../../../middlewares/AuthMiddleware.js';
import LogController from '../controllers/logController.js';

const router = express.Router();

router.get('/logs', LogController.getLogs);

export default router;