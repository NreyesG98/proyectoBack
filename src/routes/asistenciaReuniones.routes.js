import { Router } from 'express';
import { getAsistencias, createAsistencia, findAsistencia, updateAsistencia, deleteAsistencia } from '../controllers/asistenciaReuniones.controller.js';
import auth from '../middlewares/validateToken.js';

const router = Router();

// Define las rutas para listar, crear, obtener, actualizar y eliminar asistencias
router.get('/asistencias', auth, getAsistencias);
router.post('/asistencias', auth, createAsistencia);
router.get('/asistencias/:id', auth, findAsistencia);
router.put('/asistencias/:id', auth, updateAsistencia);
router.delete('/asistencias/:id', auth, deleteAsistencia);

export default router;