import { hashPassword } from "../../../config/utils/bcryptUtils.js";
import UserModel from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import RoleController from "../../roles/controllers/roleController.js";
import LogController from "../../logs/controllers/logController.js";

const UserController = {
  async registerUser(req, res) {
    // console.log("req::: ", req.body);
    try {
      //hasheo antes de guardar el password
      // const hashedPassword = await hashPassword(req.body.password);
      const hashedPassword = await hashPassword('password');

      // console.log('hashedPassword::: ', hashedPassword);

      //new user con el password hasheado
      const newUser = new UserModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
        roleId: req.body.roleId,
        phone: req.body.phone,
        // status: true,
        ci: req.body.ci,
      });
      // const newUser = new UserModel(req.body);
      await newUser.save();
      res.status(201).json({ message: "usuario registrado con exito" });
    } catch (error) {
      console.error("Error al registrar usuaio: ", error);
      res.status(500).json({ message: "error interno del servidor" });
    }
  },
  async getUsers(req, res) {
    try {
      const users = await UserModel.find();
      // console.log("users::: ", users);
      res.status(200).json(users);
    } catch (error) {
      console.error("Error al obtener usuario", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  },

  async getUserById(req, res) {
      
    try {
      const user = await UserModel.findOne({ _id: req.params.id })
      res.status(200).json(user);
    } catch (error) {
      console.error(`Error al buscar usuario por ID ${id}: `, error);
      res.status(500).json({ message: 'Error interno del servidor'});
    }
  },
    

  async login(req, res) {
    const { email, password } = req.body;
    console.log("password::: ", password);
    console.log("email::: ", email);

    try {
      const user = await UserModel.findOne({ email });
      console.log("user::: ", user);
      // console.log("user::: ", user);
      // console.log("::: ", user);
      // console.log("::: ", bcrypt.compareSync(password, user.password));
      //verificar las credenciales del user
      if (!user || !bcrypt.compareSync(password, user.password)) {
        return res
          .status(401)
          .send({ message: "Usuario o contraseña incorrecta" });
      }
      //crear y firmar el token
      const roleName = await RoleController.getRoleName(user.roleId);
      if (!roleName) {
        return res.status(404).send({ message: 'Rol de usuario no encontrado' });
      }

      const token = jwt.sign(
        {
          userId: user._id,
          // email: user.email,
          // firstName: user.firstName,
          // lastName: user.lastName,
          // roleId: user.roleId,
          status: user.status,
          roleName
        },
        "mipasswordsecreto1",
        { expiresIn: "30d" }
      );
      await LogController.logLogin(user._id);
      //enviar el token al cliente
      res.json({ token });
    } catch (error) {
      console.error("Error al iniciar sesion: ", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  },

  async logout(req, res) { 
    // console.log('req::: ', req);
    try {
      await LogController.logLogout(req.user.userId);
      res.status(200).json({ message: `Logout exitoso` });
    } catch (error) {
      console.error('Error al cerrar sesion', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  async refreshToken(req, res) {
    const refreshTokenHeader = req.headers.authorization;

    if (!refreshTokenHeader) {
      return res
        .status(401)
        .json({ message: "Token de actualizacion no proporcionado" });
    }

    const refreshToken = refreshTokenHeader.split(" ")[1];
    // const refreshToken = req.headers.authorization.split(" ")[1];
    console.log("refreshToken::: ", refreshToken);
    if (!refreshToken) {
      return res
        .status(401)
        .json({ message: "Token de actualizacion no proporcionado" });
    }
    try {
      //verificar y decodificar el token de actualizacion
      const decodedToken = jwt.verify(refreshToken, "mipasswordsecreto1");
      console.log("decodedToken::: ", decodedToken);
      //obtener la informacion del usuario asociada con este token
      const userInfo = await UserModel.findById(decodedToken.userId);
      console.log("userInfo::: ", userInfo);
      if (!userInfo) {
        return res
          .status(404)
          .json({ message: "No se encontro un usuario con ese id" });
      }
      //generar un nuevo token y enviarlo al cliente
      const newRefreshToken = jwt.sign(
        { userId: userInfo._id, email: userInfo.email },
        "mipasswordsecreto1",
        { expiresIn: "30d" }
      );
      console.log("newRefreshToken::: ", newRefreshToken);
      res.json({ newRefreshToken });
    } catch (error) {
      console.error("Error al renovar el token", error);
      res.status(401).json({ message: "No se pudo renovar el token" });
    }
  },
  async deleteUser(req, res) {
    try {
      const userID = req.params.id;
      const user = await UserModel.findByIdAndDelete(userID);
      if (!user) {
        throw new Error();
      }
      res.status(200).json({ msg: "Usuario eliminado correctamente" });
    } catch (error) {
      console.error("Error al borrar el usuario", error);
      res.status(500).json({ msg: "Error interno del servidor" });
    }
  }
};

export default UserController;
