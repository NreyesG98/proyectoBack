// filepath: /c:/Users/martin/Desktop/ProyectoFinal/src/routes/alumno.routes.js
import { Router } from 'express';
import { getAlumnos, createAlumno, findAlumno, updateAlumno, deleteAlumno } from '../controllers/alumno.controller.js';
import auth from '../middlewares/validateToken.js';

const router = Router();

// Define las rutas para listar, crear, obtener, actualizar y eliminar alumnos
router.get('/alumnos', auth, getAlumnos);
router.post('/alumnos', auth, createAlumno);
router.get('/alumnos/:id', auth, findAlumno);
router.put('/alumnos/:id', auth, updateAlumno);
router.delete('/alumnos/:id', auth, deleteAlumno);

export default router;