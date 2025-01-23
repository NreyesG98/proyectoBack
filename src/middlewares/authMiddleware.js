import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).json({ message: 'Acceso denegado. No se proporcionó un token.' });
  }

  const token = authHeader.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado. Token no válido.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expirado.' });
    } else if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Token no válido.' });
    } else {
      return res.status(500).json({ message: 'Error en la verificación del token.' });
    }
  }
};

export const checkRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.tipo_apo)) {
      return res.status(403).json({ message: 'Acceso denegado. No tienes permiso para acceder a esta ruta.' });
    }
    next();
  };
};