import jwt from "jsonwebtoken";
import { sendPasswordResetEmail } from "../../../config/utils/emailService.js";

const JWT_SECRET = "mipasswordsecreto1";

export const requestPasswordReset = async (req, res) => {
  try {
    console.log("req::: ", req.body);
    await sendPasswordResetEmail(req.body.email);
    if (error) {
      return res.status(400).json({error});
    }
    res
      .status(200)
      .json({
        message:
          "Correo electronico de recuperacion de contraseña enviado correctamente",
      });
    
  } catch (error) {
    console.log("Error en el servidor: ", error);
    res.status(500).json({message: "Error interno del servidor"});
  }
  // const token = jwt.sign({ userId: req.body.userId }, JWT_SECRET, {
  //   expiresIn: "1h",
  // });
  // res.status(200).json({ message: 'Correo electronico de recuperacion de contraseña enviado correctamente' });
};

export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    res.status(200).json({ message: "contraseña restablecida correctamente" });
  } catch (error) {
    console.error("Error al restablecer la contraseña: ", error);
    res.status(400).json({ message: "Token invalido o expirado" });
  }
};
