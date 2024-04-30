import express from "express";
import UserController from "../controllers/userController.js";
import AuthMiddleware from "../../../middlewares/AuthMiddleware.js";

const router = express.Router();

//rutas protegidas q requieren autorizacion
router.get("/users", AuthMiddleware.verifyToken, UserController.getUsers, UserController.refreshToken); // GET /api/v1/users -> [User, User]
router.get("/user/:id", AuthMiddleware.verifyToken, UserController.getUserById, UserController.refreshToken);
router.post(
  "/refresh-token",
  AuthMiddleware.verifyToken,
  UserController.refreshToken
);
router.delete('/user/:id', AuthMiddleware.verifyToken, UserController.deleteUser);
router.post('/logout', AuthMiddleware.verifyToken, UserController.logout);

//rutas publicas q no requieren autenticacion
router.post("/register", UserController.registerUser); // POST /api/v1/users -> {username: '', email:'', password:
router.post("/login", UserController.login);

export default router;
