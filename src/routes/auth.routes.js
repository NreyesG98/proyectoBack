// import { Router } from 'express'
// //import { login, register, logout, profile, verifyToken } from '../controllers/auth.controller.js'
// // import { authRequired } from '../middlewares/validateToken.js'
// // import { validateSchema } from '../middlewares/validator.middleware.js'
// //import { registerSchema, loginSchema } from '../schemas/auth.schemas.js'
// import { getPagos } from '../controllers/pagos.controllers.js';
// import sequelize from '../db.js'; 

// const router = Router()



// router.get('/pagos', getPagos);

// // router.post('/register', validateSchema(registerSchema), register)
// //router.post('/login', validateSchema(loginSchema), login)
// // router.post('/logout', logout)
// // router.get('/profile', authRequired, profile)
// // router.get('/verify', verifyToken)

// // !Probar nuevo endpoint
// //router.get('/cursos', async (req, res) => {
//  // try {
//   //  const [results, metadata] = await sequelize.query('SELECT * FROM cursos');
//     console.log('Obteniendo datos de cursos: ', results);
//     res.json(results);
//   } catch (error) {
//     console.error('Error obteniendo datos de cursos: ', error);
//     res.status(500).send('Error obteniendo datos de cursos');
//   }
// });
// router.post('/cursos/:id', (req, res) => {
//   const {id} =req.params
//   res.send('obteniendo datos de cursos' + id)
// })
// export default router;
// !Probar nuevo endpoint
// router.get('/pagos', async (req, res) => {
//   try {
//     const [results, metadata] = await sequelize.query('SELECT * FROM pagos_mensualidad');
//     console.log('Obteniendo datos de cursos: ', results);
//     res.json(results);
//   } catch (error) {
//     console.error('Error obteniendo datos de cursos: ', error);
//     res.status(500).send('Error obteniendo datos de cursos');
//   }
// });


import { Router } from 'express';
import { getPagos, createPago, findPago, deletePago, updatePago , getCursos} from '../controllers/pagos.controllers.js';
import { getReuniones, createReunion, findReunion, deleteReunion, updateReunion } from '../controllers/reunion.controllers.js';
import { login, register,getUsers,updateUser,deleteUser ,createUsers} from '../controllers/auth.controller.js';
import auth from '../middlewares/validateToken.js';
import { verifyToken, checkRole } from '../middlewares/authMiddleware.js';



const router = Router();


router.post('/login', login);

// Define la ruta para el registro de usuarios
router.post('/register', register);

router.get('/protected', auth, (req, res) => {
    res.json({ message: 'Acceso concedido a la ruta protegida', user: req.user });
  });

router.get('/protected', checkRole, (req, res) => {
    res.json({ message: 'Acceso concedido a la ruta protegida', user: req.user });
  });

// Define la ruta para obtener todos los usuarios
router.get('/users', auth, getUsers);
router.post('/create-users',auth, createUsers);


// Define la ruta para actualizar un usuario específico
router.put('/users/:id', auth, updateUser);

// Define la ruta para eliminar un usuario específico
router.delete('/users/:id', auth, deleteUser);

// Define la ruta para obtener los pagos
router.get('/pagos', getPagos);

// Define la ruta para crear un nuevo pago
router.post('/pagos', createPago);

// Define la ruta para obtener un pago específico
router.get('/pagos/:id', findPago);

// Define la ruta para eliminar un pago específico
router.delete('/pagos/:id', deletePago);

// Define la ruta para actualizar un pago específico
router.put('/pagos/:id', updatePago);


router.get('/cursos', getCursos);

// Define la ruta para obtener todas las reuniones
router.get('/reuniones', getReuniones);

// Define la ruta para crear una nueva reunión
router.post('/reuniones', createReunion);

// Define la ruta para obtener una reunión específica
router.get('/reuniones/:id', findReunion);

// Define la ruta para eliminar una reunión específica
router.delete('/reuniones/:id', deleteReunion);

// Define la ruta para actualizar una reunión específica
router.put('/reuniones/:id', updateReunion);




export default router;