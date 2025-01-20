import { Router } from 'express';
import { getRegistrosPagos, createRegistroPago, findRegistroPago, updateRegistroPago, deleteRegistroPago } from '../controllers/registroPagosReuniones.controller.js';
import auth from '../middlewares/validateToken.js';

const router = Router();

// Define las rutas para listar, crear, obtener, actualizar y eliminar registros de pagos
router.get('/registros-pagos', auth, getRegistrosPagos);
router.post('/registros-pagos', auth, createRegistroPago);
router.get('/registros-pagos/:id', auth, findRegistroPago);
router.put('/registros-pagos/:id', auth, updateRegistroPago);
router.delete('/registros-pagos/:id', auth, deleteRegistroPago);

export default router;