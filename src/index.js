//import app from './app.js'
//import {PORT} from './config.js'
// import { connectDB } from './db.js'
// import { pool } from './db.js'

// connectDB()
//app.listen(PORT)
//console.log("Server on port", PORT)

// filepath: /c:/Users/martin/Desktop/ProyectoFinal/src/index.js
import express from 'express';
import cookieParser from 'cookie-parser'; // Importa cookie-parser
import bodyParser from 'body-parser';
import authRoutes from './routes/auth.routes.js';
import alumnoRoutes from './routes/alumno.routes.js';
import asistenciaReunionesRoutes from './routes/asistenciaReuniones.routes.js';
import registroPagosReunionesRoutes from './routes/registroPagosReuniones.routes.js';
import protectedRoutes from './routes/protected.routes.js';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import errorHandler from './middlewares/errorHandler.js';
import cors from 'cors';



dotenv.config();

const app = express();
const port = 4000;

// Define __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



app.use(cors({
  origin: 'http://localhost:3000', // Reemplaza con el dominio de tu frontend
  credentials: true,
}));

app.use(bodyParser.json());
app.use(cookieParser()); // Añade cookie-parser
app.use('/api', authRoutes);
app.use('/api', alumnoRoutes);
app.use('/api', asistenciaReunionesRoutes);
app.use('/api', registroPagosReunionesRoutes);
app.use('/api', protectedRoutes); // Añadir rutas protegidas




// Servir archivos estáticos
app.use(express.static(path.join(__dirname, '../public')));

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});