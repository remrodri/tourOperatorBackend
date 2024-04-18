import UserModel from "../models/UserModel.js";

const UserController = {
  async registerUser(req, res) {
    try {
      const newUser = new UserModel(req.body);
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
      console.log('users::: ', users);
      res.status(200).json(users);
    } catch (error) {
      console.error("Error al obtener usuario", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  },
};

export default UserController;
