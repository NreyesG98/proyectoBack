import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../db.js';

const RegistroPagosReuniones = sequelize.define('RegistroPagosReuniones', {
  id_registro: {
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
  pago_completo: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  tableName: 'registro_pagos_reuniones',
  timestamps: false,
});

export default RegistroPagosReuniones;