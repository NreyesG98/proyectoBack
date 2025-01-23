import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado. No se proporcionó un token.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret'); // Reemplaza con tu clave secreta
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Token no válido.' });
  }
};


export default auth;

// import jwt from 'jsonwebtoken'
// import { TOKEN_SECRET } from '../config.js'
// export const authRequired =  (req, res, next) => {
//   const { token } = req.cookies
//   if (!token) return res.status(401).json({ message: 'Token not Found, authorization denied' })
//   jwt.verify(token, TOKEN_SECRET, (err, user) => {
//     if (err) return res.status(403).json({ message: 'Invalid Token' })
//     req.user = user
//     next()
//   })
  
// }

// export default authRequired;
