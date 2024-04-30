// import { MongoClient } from "mongodb";

// const uri =
//   "mongodb+srv://tourOperatorDB:mipassword1@cluster0.0fhbk3e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// //opciones de conexion
// // const options = {
// //   useNewUrlParser: true,
// //   useUnifiedTopology: true,
// // };

// //funcion para conectar a la bd
// export async function connectDatabase() {
//   try {
//     //instancia del cliente de mongodb
//     const client = new MongoClient(uri);
//     //conectar al servidor de mongodb
//     await client.connect();
//     console.log("Base de datos conectada");
//     //devolver instancia de la bd
//     return client.db('tourOperatorDB');
//   } catch (error) {
//     console.log(`Error en la base de datos ${error}`);
//     throw  error;
//   }
// }

