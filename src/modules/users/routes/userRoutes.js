import express from 'express';
import UserController from '../controllers/userController.js';
const router = express.Router();


router.get('/users', UserController.getUsers); // GET /api/v1/users -> [User, User]
router.post('/users', UserController.registerUser);  // POST /api/v1/users -> {username: '', email:'', password:
    
export default  router;