import LogModel from "../models/logModel.js";

const LogController = {

  async logLogin(userId) {
    try {
      const newLog = new LogModel({
        userId: userId,
        eventType: "login",
        // date:Date.now()
      });
      await newLog.save();
    } catch (error) {
      console.error(`Error al registrar inicio de sesion: `, error);
    }
  },
  async logLogout(userId) {
    try {
      const newLog = new LogModel({
        userId: userId,
        eventType: "logout",
        // date: Date.now()
      })
      await newLog.save();
    } catch (error) {
      console.error(`Error al registrar cierre de sesion: `, error)
    }
  },
  async getLogs(req, res) {
    try {
      const logs = await LogModel.find().sort({ createAt: 'desc' });
      res.status(200).json(logs);
    } catch (error) {
      console.error("Error obteniendo los registros de Logs: ", error);
      res.status(500).json({message:'Error interno del servidor'})
      
    }
  }
};


export default LogController;