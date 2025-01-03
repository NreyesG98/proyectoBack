import { Router } from 'express'
// import { login, register, logout, profile, verifyToken } from '../controllers/auth.controller.js'
// import { authRequired } from '../middlewares/validateToken.js'
// import { validateSchema } from '../middlewares/validator.middleware.js'
// import { registerSchema, loginSchema } from '../schemas/auth.schemas.js'
import { pool } from '../db.js'

const router = Router()

// router.post('/register', validateSchema(registerSchema), register)
// router.post('/login', validateSchema(loginSchema), login)
// router.post('/logout', logout)
// router.get('/profile', authRequired, profile)
// router.get('/verify', verifyToken)

// !Probar nuevo endpoint
router.get('/cursos', async (req, res) => {
  const result = await pool.query('SELECT * FROM cursos')
  console.log('Obteniendo datos de cursos: ')
  res.send(result)
})

router.post('/cursos/:id', (req, res) => {
  const {id} =req.params
  res.send('obteniendo datos de cursos' + id)
})


export default router