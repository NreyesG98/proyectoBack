// filepath: /c:/Users/martin/Desktop/ProyectoFinal/src/controllers/auth.controller.js
import Apoderado from '../models/apoderado.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
  const { correo_apo, contrasena_apo } = req.body;

  try {
    // Buscar al usuario por correo electrónico
    const apoderado = await Apoderado.findOne({ where: { correo_apo } });

    if (!apoderado) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Verificar la contraseña
    const isMatch = await bcrypt.compare(contrasena_apo, apoderado.contrasena_apo);

    if (!isMatch) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    // Generar el token JWT
    const token = jwt.sign(
      { id: apoderado.id_apoderado, tipo: apoderado.tipo_apo },
      'your_jwt_secret', // Reemplaza con tu clave secreta
      { expiresIn: '1h' }
    );

    res.json({ token, tipo: apoderado.tipo_apo });
  } catch (error) {
    console.error('Error en el inicio de sesión: ', error);
    res.status(500).json({ message: 'Error en el servidor 1', error:error ,
      db_credentials: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
      }
     });
  }
};

export const register = async (req, res) => {
  const { id_apoderado,nombre_apo, apellido_apo, telefono_apo, correo_apo, contrasena_apo, direccion_apo, tipo_apo } = req.body;

  try {
    // Verificar si el usuario ya existe
    const existingUser = await Apoderado.findOne({ where: { correo_apo } });

    if (existingUser) {
      return res.status(400).json({ message: 'El correo electrónico ya está en uso' });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(contrasena_apo, 10);

    // Crear el nuevo usuario
    const newUser = await Apoderado.create({
      id_apoderado,
      nombre_apo,
      apellido_apo,
      telefono_apo,
      correo_apo,
      contrasena_apo: hashedPassword,
      direccion_apo,
      tipo_apo,
    });

    res.status(201).json({ message: 'Usuario registrado exitosamente', newUser });
  } catch (error) {
    console.error('Error en el registro: ', error);
    res.status(500).json({ message: 'Error en el servidor 2', error:error ,
      db_credentials: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
      }
    });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await Apoderado.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo usuarios', error });
  }
};


export const createUsers = async (req, res) => {
  const users = req.body.users;

  try {
      const createdUsers = [];

      for (const user of users) {
          const { id_apoderado, nombre_apo, apellido_apo, telefono_apo, correo_apo, contrasena_apo, direccion_apo, tipo_apo } = user;

          // Verificar si el usuario ya existe
          const existingUser = await Apoderado.findOne({ where: { correo_apo } });

          if (existingUser) {
              return res.status(400).json({ message: `El correo electrónico ${correo_apo} ya está en uso` });
          }

          // Encriptar la contraseña
          const hashedPassword = await bcrypt.hash(contrasena_apo, 10);

          // Crear el nuevo usuario
          const newUser = await Apoderado.create({
              id_apoderado,
              nombre_apo,
              apellido_apo,
              telefono_apo,
              correo_apo,
              contrasena_apo: hashedPassword,
              direccion_apo,
              tipo_apo,
          });

          createdUsers.push(newUser);
      }

      res.status(201).json({ message: 'Usuarios registrados exitosamente', createdUsers });
  } catch (error) {
      console.error('Error en el registro de usuarios: ', error);
      res.status(500).json({ message: 'Error en el servidor 3', error:error,
        db_credentials: {
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME
        }
       });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { nombre_apo, apellido_apo, telefono_apo, correo_apo, direccion_apo, tipo_apo, estado_apo } = req.body;

  try {
    const user = await Apoderado.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    user.nombre_apo = nombre_apo;
    user.apellido_apo = apellido_apo;
    user.telefono_apo = telefono_apo;
    user.correo_apo = correo_apo;
    user.direccion_apo = direccion_apo;
    user.tipo_apo = tipo_apo;
    user.estado_apo = estado_apo;
    await user.save();
    res.json({ message: 'Usuario actualizado exitosamente', user });
  } catch (error) {
    res.status(500).json({ message: 'Error actualizando usuario', error });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Apoderado.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    await user.destroy();
    res.json({ message: 'Usuario eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error eliminando usuario', error });
  }
};

////--------------------------------////


export const verifyToken = async (req, res) => {
  const {token} = req.cookies

  if (token) return res.status(401).json({ message: "Unauthorized" })
    
  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if(err) return res.status(401).json({ message: "Unauthorized" })

    const userFound = await User.findById(user.id)
    if (!userFound) return res.status(401).json({ message: "Unauthorized" })

    return res.status(200).json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt
    })
  })
}