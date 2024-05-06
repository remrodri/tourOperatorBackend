import express from 'express';

import { requestPasswordReset, resetPassword } from '../controllers/passwordController.js';

const router = express.Router();

router.post('/password/reset-request', requestPasswordReset);
router.post('/password/reset', resetPassword);

export default router;