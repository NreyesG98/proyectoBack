// filepath: /c:/Users/martin/Desktop/ProyectoFinal/src/models/reunion.model.js
import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../db.js'; // Asegúrate de que la ruta sea correcta

const Reunion = sequelize.define('Reunion', {
  id_reunion: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  fecha_reu: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  hora_reu: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  lugar_reu: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  tema_reu: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  id_curso: {
    type: DataTypes.STRING,
    references: {
      model: 'cursos',
      key: 'id_curso',
    },
  },
}, {
  tableName: 'reuniones',
  timestamps: false,
});

export default Reunion;