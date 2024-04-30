import RoleModel from "../models/roleModel.js";
import jwt from "jsonwebtoken";

const RoleController = {
  async getRoles(req, res) {
    try {
      const roles = await RoleModel.find({}, "_id roleName");
      // console.log("roles::: ", roles);
      return res.status(200).json(roles);
    } catch (error) {
      console.error("Error al obtener roles", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  },

  async getRoleById(req, res) {
    const roleId = req.params.roleId;
    try {
      const role = await RoleModel.findById(roleId);
      if (role) {
        return res.status(200).json(role);
      } else {
        return res
          .status(404)
          .json({ message: "No se encontró el rol con ese ID" });
      }
    } catch (error) {
      console.error("Error al obtener el rol por Id:", error);
      return res.status(500).json({ message: "Error Interno del Servidor" });
    }
  },

  async getRoleName(roleId) {
    try {
      const role = await RoleModel.findById(roleId);
      if (!role) {
        return null;
      }
      return role.roleName;
    } catch (error) {
      console.error("Error al obtener el nombre del rol:", error);
      throw new Error("Error interno del servidor");
    }
  },
};
export default RoleController;
