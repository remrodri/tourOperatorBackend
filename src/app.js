import express from 'express';
import bodyParser from 'body-parser';
import apiRoutes from './modules/index.js';
import connectDB from './config/database.js';

connectDB();
const app = express();

const PORT = process.env.PORT || 3000;

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`Servidor en ejecucion en el puerto: ${PORT}`);
})
