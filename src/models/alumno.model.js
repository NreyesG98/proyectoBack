import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Alumno = sequelize.define('Alumno', {
    id_alum: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre_alum: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellido_alum: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fecha_nacimiento_alum: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    id_curso: {
      type: DataTypes.STRING,
      references: {
        model: 'cursos',
        key: 'id_curso',
      },
    },
  }, {
    tableName: 'alumno',
    timestamps: false,
  });
  
  export default Alumno;