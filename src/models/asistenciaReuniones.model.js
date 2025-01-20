import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../db.js';

const AsistenciaReuniones = sequelize.define('AsistenciaReuniones', {
  id_asistencia: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  id_reunion: {
    type: DataTypes.INTEGER,
    references: {
      model: 'reuniones',
      key: 'id_reunion',
    },
  },
  id_apoderado: {
    type: DataTypes.INTEGER,
    references: {
      model: 'apoderados',
      key: 'id_apoderado',
    },
  },
  asistio: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  observaciones: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'asistencia_reuniones',
  timestamps: false,
});

export default AsistenciaReuniones;