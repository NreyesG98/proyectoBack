import { Router } from 'express';
import { verifyToken, checkRole } from '../middlewares/authMiddleware.js';

const router = Router();

// Ruta accesible solo para administradores
router.get('/admin', verifyToken, checkRole(['admin']), (req, res) => {
  res.json({ message: 'Bienvenido, administrador' });
});

// Ruta accesible solo para apoderados
router.get('/apoderado', verifyToken, checkRole(['apoderado']), (req, res) => {
  res.json({ message: 'Bienvenido, apoderado' });
});

// Ruta accesible para ambos roles
router.get('/general', verifyToken, checkRole(['admin', 'apoderado']), (req, res) => {
  res.json({ message: 'Bienvenido, usuario' });
});

export default router;