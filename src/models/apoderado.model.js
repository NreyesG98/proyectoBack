// filepath: /c:/Users/martin/Desktop/ProyectoFinal/src/models/apoderado.model.js
import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../db.js'; // Asegúrate de que la ruta sea correcta

const Apoderado = sequelize.define('Apoderado', {
  id_apoderado: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  nombre_apo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellido_apo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefono_apo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  correo_apo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  contrasena_apo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  direccion_apo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  tipo_apo: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'apoderado',
    validate: {
      isIn: [['admin', 'apoderado']],
    },
  },
  estado_apo: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'activo',
    validate: {
      isIn: [['activo', 'inactivo']],
    },
  },
}, {
  tableName: 'apoderados',
  timestamps: false,
});

export default Apoderado;