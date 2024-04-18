import mongoose from "mongoose";

const dbURI =
  "mongodb+srv://tourOperatorDB:mipassword1@cluster0.0fhbk3e.mongodb.net/tourOperatorDB";



//conexion a la bd
const connectDB = async () => {
  try {
    await mongoose.connect(dbURI);
    console.log("Base de datos conectada correctamente");
  } catch (error) {
    console.log(`Error al conectar a la base de datos ${error}`);
    process.exit(1); //finaliza el proceso en caso de error
  }
};

export default connectDB;
